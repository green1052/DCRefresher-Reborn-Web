# 모듈 개발

## module 객체

모듈은 DCRefresher Reborn에서 페이지 DOM 제어 등을 담당하는 실질적인 기능 집합입니다. 모듈 파일은 `src/entrypoints/content/modules` 폴더에 위치합니다.

각 모듈 파일은 하나의 `RefresherModule` 객체를 default export 합니다. 객체에 들어가야 할 값들은 `src/@types/module.ts` 파일의 `RefresherModule` interface로 정의되어 있으니, 해당 interface를 참고하시면 도움이 됩니다.

필요한 API는 직접 import해서 사용하시면 됩니다. 예를 들어 필터 기능이 필요하다면 `import filter from "@/core/filtering"`, 이벤트 버스가 필요하다면 `import eventBus from "@/core/eventbus"`와 같이 import하여 사용할 수 있습니다.

## 모듈 개발 예시

### 1. 페이지에서 컨텐츠 변경하기

페이지의 한 요소(여기서는 갤러리 대문)를 제거한다고 가정해 봅시다.

#### module.func 작성

`filter.add`는 페이지에서 첫 번째 인자로 전달된 선택자를 가진 Element를 찾아, 두 번째 인자의 콜백 함수로 전달하는 함수입니다. 갤러리 대문의 선택자 `.issue_contentbox .bgcover`를 `filter.add`의 첫 번째 인자로 지정하고, 요소를 제어하기 위해 두 번째 인자로 콜백 함수를 작성하겠습니다.

그리고 필터를 등록했으니 나중에 모듈이 비활성화되었을 때 필터를 제거하기 위해, `filter.add`에서 반환하는 UUID 값을 `this.memory.coverFilter`에 저장해 두겠습니다.

```ts
import filter from "@/core/filtering";
import type {RefresherModule} from "@/@types/module";

const module: RefresherModule = {
    name: "대문 제거",
    description: "갤러리 대문을 제거합니다.",
    memory: {coverFilter: ""},
    func() {
        this.memory.coverFilter = filter.add(".issue_contentbox .bgcover", (element) => {
            // element: <span>...</span>

            element.parentElement!.removeChild(element); // 요소 제거
        });
    }
};

export default module;
```

이를 그대로 모듈에 작성하여 확장을 로드해 보면, 성공적으로 갤러리 대문이 제거된 것을 확인할 수 있습니다.

#### module.revoke 작성

`module.revoke`는 모듈이 비활성화되기 전, 사용했던 메모리를 정리하거나 필터 함수를 제거할 때 사용하는 함수입니다.

위에서 `this.memory.coverFilter`에 UUID를 저장해 두었으니, 이제 그 UUID를 가진 필터를 제거해 보겠습니다.

```ts
import filter from "@/core/filtering";
import type {RefresherModule} from "@/@types/module";

const module: RefresherModule = {
    // ... name, description, memory, func ...
    revoke() {
        if (this.memory.coverFilter) filter.remove(this.memory.coverFilter);
    }
};

export default module;
```

이렇게 모듈 작성은 정말 간단합니다.

### 2. 이벤트 받기

새로고침 모듈에서는 새로고침될 때마다 `refresh` 이벤트를 발생시킵니다.

```ts
import eventBus from "@/core/eventbus";
import type {RefresherModule} from "@/@types/module";

const module: RefresherModule = {
    name: "이벤트 버스 예제",
    description: "이벤트 버스의 예제입니다.",
    memory: {cleanup: null as (() => void) | null},
    func() {
        this.memory.cleanup = eventBus.on("refresh", () => {
            // 새로고침될 때 할 일을 여기서 구현합니다.

            alert("새로고침");
        });
    },
    revoke() {
        if (this.memory.cleanup) this.memory.cleanup();
    }
};

export default module;
```

이렇게 작성하면 새로고침 모듈이 새로고침할 때마다 `새로고침` 알림 창이 뜹니다.

`eventBus.on`은 클린업 함수를 반환하므로, `revoke`에서 해당 함수를 호출하여 이벤트 리스너를 제거할 수 있습니다.