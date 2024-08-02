---
description: DCRefresher Reborn 개발 문서
---

# 개발

```
git clone https://github.com/green1052/DCRefresher-Reborn.git
```

우선 위 명령어로 저장소를 복제 해주세요.

```
pnpm install
```

`pnpm install` 명령어를 활용해 의존성 라이브러리들을 다운받아주세요.

pnpm이 설치되어 있지 않다면 [설치 방법](https://pnpm.io/installation)을 참고하여 설치해주세요.

```
pnpm dev:mv2
pnpm dev:mv3
```

그 후, 위 명령어를 입력하여 파일 변경 사항이 있을 때마다 빌드하는 개발 모드를 실행할 수 있습니다.

번들링 라이브러리로 webpack을 사용하고 있습니다.

빌드 결과물은 `dist` 폴더에 저장되니 크롬에서 `chrome://extensions` 로 이동하여 `압축해제된 확장 프로그램을 로드합니다.` 를 클릭하신 후 `dist` 폴더를 선택하시면 빌드된 확장 프로그램을
로드할 수 있습니다.

단, 크롬에서 변경 사항을 자동으로 감지하지 않으니 새로 고친 사항이 있을 때마다 `chrome://extensions`에서 확장의 새로고침 버튼을 눌러 주셔야 합니다.

```
pnpm build:mv2
pnpm build:mv3
```

명령어를 통해 production 모드 빌드를 할 수 있습니다.