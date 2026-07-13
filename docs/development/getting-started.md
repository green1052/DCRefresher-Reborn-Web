---
description: DCRefresher Reborn 개발 문서
---

# 개발

```
git clone https://github.com/green1052/DCRefresher-Reborn.git
```

위 명령어로 저장소를 복제합니다.

```
bun install
```

`bun install` 명령어로 의존성 라이브러리를 설치합니다. Bun이 설치되어 있지 않다면 [설치 가이드](https://bun.sh/docs/installation)를 참고하여 먼저 설치해 주세요.

```
bun dev
bun dev:firefox
```

위 명령어로 파일 변경 사항을 실시간으로 반영하는 개발 모드를 실행할 수 있습니다. 프레임워크로 WXT(Vite 기반)를 사용하고 있습니다.

빌드 결과물은 `.output` 폴더에 저장됩니다. 크롬에서 `chrome://extensions`로 이동하여 '압축해제된 확장 프로그램을 로드합니다'를 클릭한 후 `.output/chrome-mv3` 폴더를 선택하면 개발 모드 확장 프로그램을 로드할 수 있습니다. (Firefox의 경우 `.output/firefox-mv2`)

::: tip
개발 모드에서는 파일 변경 시 자동으로 새로고침됩니다.
:::

```
bun build
```

production 모드 빌드를 실행합니다. Chrome과 Firefox 모두 `.output/` 폴더에 빌드됩니다.

```
bun zip
```

배포용 zip 파일을 생성합니다. (Chrome용 `*-chrome.zip`, Firefox용 `*-firefox.zip`)