# API

여기에 없는 API는 문서로 정리되지 않았거나 잘 사용되지 않는 API입니다.
 

추가로 "직접 import해서 사용하면 안되는가?"라는 의문점이 드실 수도 있습니다.

그러실 수 있고요. 자유롭게 core를 import 해서 사용해주시면 됩니다.


단, 이는 `src/modules` 폴더에 들어갔을 때만 해당하며 외부 스크립트 로드 방식은 module.require을 작성하여 사용해주셔야 합니다.


### filter

MutationObserver를 활용한 API로, `filter.add` 함수로 필터에 등록시켜두면 DOM에서 해당 선택자에 맞는 HTMLElement을 찾아 반환합니다.

#### filter.add()

> (선택자: string, 콜백 함수<요소>: Function, 옵션: RefresherFilteringOptions): UUID

`선택자`를 가진 요소가 필터에 감지될 경우 `콜백 함수`의 인자로 요소를 담아 함수를 호출합니다. 선택자를 가진 요소가 없으면 콜백 함수는 실행되지 않습니다.

결과 값으로 UUID를 반환합니다.

#### filter.remove()

> (UUID: string, UUID를 가진 필터가 없을 경우 건너뛸지에 대한 여부: boolean)

`UUID`를 가진 필터를 제거합니다.

#### filter.run()

> (비동기 방식으로 실행할지에 대한 여부: boolean)

필터에 등록된 모든 함수들을 실행합니다.
<b>모듈에서 직접 run 함수를 호출하는 것은 권장되지 않습니다. 대신 runSpecific 사용을 고려하세요.</b>

run 함수는 기본적으로 페이지 로드 중, 페이지 로드 후에 자동으로 실행됩니다.

#### runSpecific()

> (UUID: string)

`UUID`를 가진 필터를 실행합니다. 다크모드와 같이 반응성이 중요한 경우 runSpecific을 모듈에서 직접 사용하여 다른 모듈에서 처리하는 것에 비해 빠르게 호출할 수 있습니다.

### Frame

프레임을 생성하는 API입니다. 미리보기 창에서 보는 그 프레임입니다. 아직은 미리보기 모듈용으로 구현되어 있어 사용을 권장하지 않습니다. 지금은 모듈의 `func` 함수
내에서 `document.createElement`를 사용하여 창을 만들어 사용해주세요.

### eventBus

EventBus 모델을 구현한 API입니다. 이벤트를 발생시켜 다른 모듈이나 코어와 통신할 수 있습니다.

#### eventBus.on()

> (이벤트 이름: string, 콜백 함수<...any>: Function, 옵션: RefresherEventBusOption): UUID

`이벤트 이름`을 가진 이벤트가 `emit`될 경우 콜백 함수를 실행합니다. 결과 값으로 UUID를 반환합니다.

현재 옵션에는 `once: boolean` (한번 호출된 후에 삭제) 한 가지 값만 넣을 수 있습니다.

#### eventBus.emit()

> (이벤트 이름: string, ...넘길 인자들: any)

`이벤트 이름`을 가진 이벤트를 `...넘길 인자들`을 담아 호출합니다.

#### eventBus.remove()

> (이벤트 이름: string, UUID: string, UUID를 가진 필터가 없을 경우 건너뛸지에 대한 여부: boolean)

`이벤트 이름`을 가진 이벤트 함수 목록 중에서 `UUID`를 가진 함수를 제거합니다.

### http

브라우저 fetch API를 사용한 네트워킹 API입니다. 다른 페이지를 가져와 처리할 수 있습니다.

#### http.urls{}

페이지 기본 URL을 담은 객체입니다. 내용은 `src/utils/http.ts`를 참고하세요.

#### http.make()

> == fetch API: Promise

기능은 fetch API와 다를 것이 없으나 결과 값으로 실패시 `HTTP 코드, 상태 메세지`를 담안 reject가 오며, 성공시 결과 값의 텍스트를 담은 resolve가 옵니다.

#### http.view()

> (URL: string): string

`URL`이 게시글 보기 창일 때 (/board/view) 게시글 목록 URL로 바꾸어 반환합니다.

#### http.checkMini()

> (URL: string): boolean

`URL`이 미니 갤러리 링크인지 확인합니다.

#### http.checkMinor()

> (URL: string): boolean

`URL`이 마이너 갤러리 링크인지 확인합니다.

#### http.galleryType()

> (URL: string): string

`URL`에서 갤러리 타입을 확인하여 도메인 뒤에 붙는 URL 값을 반환합니다. 메이저 갤러리인 경우 ``, 마이너 갤러리인 경우 `mgallery`, 미니 갤러리인 경우 `mini` 가 반환됩니다.

#### http.galleryTypeName()

> (URL: string): string

`URL`에서 갤러리 타입을 확인하여 디시 내부 API에서 사용하는 갤러리 이름 값을 반환합니다.

메이저 갤러리인 경우 `G`, 마이너 갤러리인 경우 `M`', 미니 갤러리인 경우 `MI` 가 반환됩니다.

### ip

#### ip.format()

> (IP: string): string

IP 값을 읽고 통신사나 회사 정보를 IP와 함께 적어 반환합니다.