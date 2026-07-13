# API

여기에 없는 API는 문서로 정리되지 않았거나 잘 사용되지 않는 API입니다.

필요한 API는 직접 import하여 사용할 수 있습니다. 예를 들어 `import filter from "@/core/filtering"`, `import eventBus from "@/core/eventbus"`, `import * as http from "@/http/http"`와 같이 import하여 사용하시면 됩니다.

## filter

MutationObserver를 활용한 필터링 API입니다. `filter.add`로 필터를 등록하면, DOM에서 해당 선택자에 맞는 HTMLElement를 찾아 콜백 함수로 전달합니다.

### filter.add()

> (선택자: string, 콜백 함수\<요소\>: Function, 옵션?: RefresherFilteringOptions): string

선택자를 가진 요소가 감지되면 콜백 함수의 인자로 요소를 전달하여 호출합니다. 요소가 없으면 콜백은 실행되지 않습니다. UUID 문자열을 반환합니다.

옵션에 설정할 수 있는 값:

- `neverExpire: boolean` — 필터가 만료되지 않도록 설정합니다. 페이지 로드 후에도 유지되며, 공유 MutationObserver로 감시합니다.
- `skipIfNotExists: boolean` — 선택자에 해당하는 요소가 존재하지 않을 경우 에러를 발생시키지 않고 건너뜁니다.

### filter.remove()

> (UUID: string, skip?: boolean)

UUID를 가진 필터를 제거합니다.

### filter.run()

> (): Promise\<void\>

등록된 모든 one-shot 필터를 병렬로 실행합니다. `neverExpire` 필터는 공유 MutationObserver와 함께 설정됩니다.

::: warning
모듈에서 직접 `run`을 호출하는 것은 권장되지 않습니다. 대신 `runSpecific`를 사용하세요.
:::

`run`은 페이지 로드 중 및 로드 후에 자동으로 실행됩니다.

### filter.runSpecific()

> (UUID: string): Promise\<void\>

UUID를 가진 필터만 실행합니다. 다크모드처럼 반응성이 중요한 경우, 다른 모듈의 처리를 기다리지 않고 빠르게 실행할 수 있습니다.

### filter.ids()

> (): string[]

등록된 모든 필터의 UUID 목록을 반환합니다.

## Frame

프레임을 생성하는 API입니다. 미리보기 창에서 사용하는 프레임과 같습니다. 현재는 미리보기 모듈 전용으로 구현되어 있어 사용을 권장하지 않습니다. 모듈의 `func` 내에서 `document.createElement`를 사용하여 창을 만들어 주세요.

## eventBus

이벤트 버스 API입니다. 이벤트를 발생시켜 다른 모듈이나 코어와 통신할 수 있습니다.

### eventBus.on()

> (이벤트 이름: string, 콜백 함수\<...any\>: Function, 옵션?: RefresherEventBusOption): () => void

이벤트가 `emit`되면 콜백 함수를 실행합니다. 클린업 함수를 반환하며, 이 함수를 호출하면 이벤트 리스너가 제거됩니다.

옵션:
- `once: boolean` — 한 번 호출된 후 자동으로 제거됩니다.

### eventBus.emit()

> (이벤트 이름: string, ...넘길 인자들: any)

이벤트를 발생시킵니다. 등록된 모든 콜백 함수가 인자들과 함께 호출됩니다.

### eventBus.emitNextTick()

> (이벤트 이름: string, ...넘길 인자들: any)

이벤트를 다음 틱에 발생시킵니다.

## http

fetch API 기반의 네트워킹 API입니다. `src/http/http.ts`에 정의되어 있습니다.

### http.urls{}

페이지 기본 URL을 담은 객체입니다. 자세한 내용은 `src/http/http.ts`를 참고하세요.

### http.client

ky 인스턴스입니다. fetch API 기반의 HTTP 클라이언트로, 재시도, 타임아웃 등의 기능을 제공합니다.

### http.contentFetch

콘텐츠 스크립트 컨텍스트에서 실행되는 바인딩된 fetch 함수입니다.

### http.view()

> (URL: string): string

게시글 보기 URL(`/board/view`)을 게시글 목록 URL로 변환하여 반환합니다.

### http.checkMini()

> (URL: string): boolean

URL이 미니 갤러리 링크인지 확인합니다.

### http.checkMinor()

> (URL: string): boolean

URL이 마이너 갤러리 링크인지 확인합니다.

### http.checkPerson()

> (URL: string): boolean

URL이 개인 갤러리 링크인지 확인합니다.

### http.galleryType()

> (URL: string, extra?: string): string

URL에서 갤러리 타입을 확인하여 도메인 뒤에 붙는 경로를 반환합니다. 메이저 갤러리는 `''`, 마이너 갤러리는 `'mgallery'`, 미니 갤러리는 `'mini'`를 반환합니다.

### http.galleryTypeName()

> (URL: string): string

URL에서 갤러리 타입을 확인하여 디시 내부 API에서 사용하는 갤러리 이름을 반환합니다. 메이저 갤러리는 `'G'`, 마이너 갤러리는 `'M'`, 미니 갤러리는 `'MI'`를 반환합니다.

### http.mergeParamURL()

> (origin: string, getFrom: string): string

`origin` URL의 쿼리 파라미터를 `getFrom` URL에서 가져온 파라미터와 병합합니다.

### http.queryString()

> (name: string): string | null

현재 페이지 URL에서 지정된 쿼리 파라미터 값을 가져옵니다.

## ip

`src/utils/ip.ts`에 정의되어 있습니다.

### ip.format()

> (IP: string): string | null

IP 값을 읽고 통신사/회사 정보를 IP와 함께 문자열로 반환합니다.

### ip.ISPData()

> (IP: string): { name: string, color: string }

IP에 대한 통신사/회사 이름과 색상을 반환합니다.

### ip.ensureIpDataReady()

> (): Promise\<void\>

IP 데이터가 로드되어 있지 않은 경우, 로드가 완료될 때까지 대기합니다.