---
description: DCRefresher Reborn의 차단 기능을 설명합니다.
---

# 차단 모드

- 일치 (SAME): 일치하는 경우 차단합니다.
- 포함 (CONTAIN): 포함되어 있는 경우 차단합니다.
- 불일치 (NOT_SAME): 불일치 하는 경우 차단합니다.
- 불포함 (NOT_CONTAIN): 포함되어 있지 않은 경우 차단합니다.

## 차단 목록

- `+` 버튼을 눌러 차단을 할 수 있습니다.
- `X` 버튼을 눌러 차단 목록을 초기화할 수 있습니다.

## 고급 차단 설정

**설명 안보고 써놓고서 차단 안된다고 찡찡거리면 죽여버림**

`type: RefresherBlockType content: string gallery?: string`

형식의 인수가 주어지며, 다음과 같이 입력하면 됩니다.

```javascript
return content === "개블빙" && gallery === "bser";
```

## 정규 표현식 (정규식)

[정규식](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_expressions)을 사용하여 차단할 수 있습니다.

## 특정 갤러리에서만 차단

갤러리 URL에 있는 ?id= 뒤의 값을 이용해 특정 갤러리에서만 차단할 수 있습니다.

예를 들어 이터널 리턴 갤러리의 ID는 `bser`입니다.