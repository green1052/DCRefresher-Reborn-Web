# 구조

## 기술 스택

- **프레임워크:** WXT (Vite 기반 브라우저 확장 프레임워크)
- **언어:** TypeScript
- **뷰:** Vue 3 (Composition API)
- **패키지 매니저:** Bun
- **스타일링:** SCSS

## 디렉토리 구조

```
src/
├── @types/         # 전역 타입 선언 (import 불필요)
├── assets/         # 아이콘, 스타일
├── components/     # 공유 Vue SFC (countdown, dccon, loader, previewButton, timestamp, toast, user)
├── composables/    # useRelativeTime.ts (공유)
├── core/           # 공유 인프라 (.vue 없음): block, communicate, eventbus, filtering, memo, modules, settings
├── entrypoints/    # WXT 엔트리포인트
│   ├── background.ts          # 서비스 워커: 컨텍스트 메뉴, 명령, 주기적 DB 페치
│   ├── grecaptcha.content.ts  # 별도 콘텐츠 스크립트
│   ├── popup/                 # 팝업 Vue 앱
│   ├── options/               # 옵션 페이지 Vue 앱
│   └── content/               # 콘텐츠 스크립트 + 모든 콘텐츠 관련 코드
│       ├── index.ts           # 콘텐츠 스크립트 진입점
│       ├── composables/       # useDcconPopup, useMeDetection
│       └── modules/           # 자동 로드 모듈 (flat *.ts 또는 {name}/index.ts)
│           ├── block/         # index.ts + request.ts
│           ├── manage/        # index.ts + helpers.ts
│           ├── refresh/       # index.ts + load.ts + controller.ts
│           ├── preview/       # 미리보기 모듈 + components/
│           └── *.ts           # 단순 모듈 (fonts, imagesearch, layout, stealth, userinfo, write)
├── http/           # http.ts (URL), httpClient.ts (ky), messaging.ts (@webext-core/messaging)
├── storage/        # wxtStorage.ts (WXT storage.defineItem), migration.ts
└── utils/          # 일반 유틸: observe, toast, comment, memoAsk, user, ip, ban, types
```

## 엔트리포인트

- **`background.ts`** — 서비스 워커. 컨텍스트 메뉴, 단축키 명령, 주기적 데이터베이스 페치, 스토리지 마이그레이션을 담당합니다.
- **`content/index.ts`** — `https://*.dcinside.com/*`에서 실행되는 콘텐츠 스크립트 (`document_start`). `import.meta.glob`으로 모듈을 자동 로드하고 `modules.register()`로 등록한 후 `filter.run()`을 호출합니다.
- **`popup/`** — 팝업 Vue 앱 (별도 `App.vue`, `main.ts`, `index.html`).
- **`options/`** — 옵션 페이지 Vue 앱.

## 모듈 시스템

`content/index.ts`는 `import.meta.glob`으로 `./modules/*/index.ts` (폴더 형식)와 `./modules/*.ts` (단일 파일 형식)을 모두 매칭하여 로드합니다. 각 모듈의 **default export**가 `RefresherModule`로 `modules.register()`에 등록됩니다.

새 기능을 추가하려면:

- `src/entrypoints/content/modules/`에 `*.ts` 파일을 추가하거나
- `src/entrypoints/content/modules/{name}/index.ts` 폴더 형식으로 추가 (co-located helper가 필요한 경우)

## 스토리지

WXT `storage.defineItem`을 사용하여 `src/storage/wxtStorage.ts`에 타입이 지정된 스토리지 아이템을 정의합니다.

- **개별 모듈:** `moduleEnableStorage(name)`, `moduleDataStorage(name)`, `moduleSettingStorage(name, key)`
- **차단:** `blockStorage`, `blockModeStorage`
- **메모:** `memoStorage`
- **데이터베이스:** `databaseStorage` (ip, ban, version, lastUpdate)

## 메시징 / 이벤트

3가지 메커니즘이 있으며, 용도에 맞게 사용해야 합니다:

- **`src/http/messaging.ts`** — `@webext-core/messaging` 타입 지정 프로토콜. background ↔ content 크로스 컨텍스트 호출 (`sendMessage`/`onMessage`, `ProtocolMap`).
- **`src/core/communicate.ts`** — 콘텐츠 내 `runtime.onMessage` 훅 레지스트리 (`addHook`/`clearHook`). background가 모든 탭에 `{type, data}`를 브로드캐스트하면 content 훅이 `type`으로 응답합니다.
- **`src/core/eventbus.ts`** — 콘텐츠 내 pub/sub (`eventBus.on`/`emit`/`emitNextTick`).