# 모듈 개발

## module 객체

모듈은 DCRefresher Reborn에서 페이지 DOM 제어 등을 담당하는 실질적인 기능 집합입니다. 모듈 파일은 `src/modules` 폴더에 모여 있습니다.

추후에는 외부에서 스크립트를 불러와 따로 빌드 없이 모듈을 사용할 수 있도록 할 예정입니다.

모듈 파일은 오직 하나의 `RefresherModule` 형식의 객체를 가집니다.

객체에 들어가야할 값들은 `src/@types/module.ts` 파일에 `RefresherModule`라는

이름의 interface로 정의되어 있으며, 해당 interface를 참고하시며 개발하시면 도움이 되실겁니다.

`RefresherModule`의 구조는 업데이트되면서 변경될 수 있으며, 추가되었으면 하는 API가 있으시면 언제든지 이슈나 Pull Request 남겨주시면 감사하겠습니다.

API들은 `module.require` 에서 배열의 형태로 이름들을 넣어 불러올 수 있으며 적은 순서대로 `module.func` 과 `module.revoke` 에 인자로 넣어 호출하게 됩니다.

## 모듈 개발 예시

### 1. 페이지에서 컨텐츠 변경하기

페이지의 한 요소 (여기서는 갤러리 대문)를 제거한다고 가정해봅시다.

![image](/c.webp)

#### module.func 작성

페이지에서 1번째 인자의 선택자를 가진 Element를 찾아 2번째 인자의 함수로 전달하는 함수는 `filter.add` 입니다. 갤러리 대문의 선택자 `.issue_contentbox .bgcover`
를 `filter.add` 함수의 1번째 인자로 지정하고, 그 요소를 제어하기 위해 2번째 인자로 함수를 하나 작성하겠습니다. 그리고 필터를 등록했으니 나중에 모듈이 비활성화되었을 때 필터를 제거하기
위해 `filter.add` 함수에서 반환하는 UUID 값을 `this.memory.coverFilter` 에 넣겠습니다.

```js
export.module = {
    name: "대문 제거",
    desc: "갤러리 대문을 제거합니다.",
    memory: {coverFilter: ""},
    require: ["filter"],
    func(filter) {
        this.memory.coverFilter = filter.add(".issue_contentbox .bgcover", (element) => {
            // element: <span>...</span>

            element.parentElement.removeChild(element); // 요소 제거
        });
    }
};
```

이 얼마나 간단한 스크립트인가요. 이를 그대로 모듈에 작성하여 확장을 로드해볼까요?

![image](https://user-images.githubusercontent.com/32066651/103630839-98ef5b00-4f85-11eb-9f74-058b9103c1ec.png)

잔짜잔! 성공적으로 갤러리 대문이 제거된 것을 확인하실 수 있습니다.

#### module.revoke 작성

`module.revoke`는 모듈이 비활성화되기 전 사용했던 메모리를 정리하거나 필터 함수를 제거할 때 사용하는 함수입니다. `module.func` 에서 받는 인자들을 그대로 받습니다.

위에서 `this.memory.coverFilter`에 UUID를 넣었었죠. 이제 필터 함수에서 이 UUID를 가진 필터를 제거해보도록 하겠습니다.

```js
export default {
    ... // func, name, memory...
    revoke(filter) {
        if (this.memory.coverFilter) filter.remove(this.memory.coverFilter);
    }
}
```

놀랍게도 한국 개발자들이 보여주다-사실 모듈 작성이 정말 쉽다는 것

### 2. 이벤트 받기

새로고침 모듈에서는 `refresh` 이벤트를 새로고침될 때마다 반환합니다.

```js
export default {
    name: "이벤트 버스 예제",
    desc: "이벤트 버스의 예제입니다.",
    memory: {event: ""},
    require: ["eventBus"],
    func(eventBus) {
        this.memory.event = eventBus.add("refresh", () => {
            // 새로고침될 때 할 일을 여기서 구현합니다.

            alert("새로고침");
        });
    },
    revoke(eventBus) {
        if (this.memory.event) eventBus.remove("refresh", this.memory.event);
    }
};
```

이렇게 작성하면 새로고침 모듈이 새로고칠 때마다 `새로고침`을 팝업 창으로 띄우게 됩니다.
