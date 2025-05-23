---
description: DCRefresher Reborn의 차단 기능을 설명합니다.
---

# 컨텐츠 차단

컨텐츠 차단 모듈은 사용자가 보고 싶지 않은 콘텐츠를 필터링하는 기능을 제공합니다.

특정 사용자, 글 내용, 댓글 또는 디시콘을 차단할 수 있습니다.

## 기능

이 모듈은 갤러리 글 목록 및 글 보기 페이지에서 작동하며, 차단된 콘텐츠를 자동으로 필터링합니다.

우클릭을 통해 빠르게 차단할 수 있는 메뉴를 제공합니다.

## 설정 옵션

| 옵션     | 설명                     | 기본값 |
|--------|------------------------|-----|
| 대댓글 삭제 | 차단된 댓글의 대댓글을 함께 삭제합니다. | 꺼짐  |
| 블러 처리  | 차단된 내용을 블러 처리합니다.      | 꺼짐  |

## 사용 방법

1. 갤러리에서 차단하고 싶은 게시물이나 댓글의 사용자 정보 영역에서 우클릭합니다. 
2. 차단 옵션을 선택합니다.
3. 차단된 콘텐츠는 설정에 따라 숨겨지거나 블러 처리됩니다.

디시콘 차단:
1. 차단하고 싶은 디시콘을 우클릭합니다.
2. 메뉴에서 디시콘 차단 옵션을 선택합니다.
3. 디시콘 전체 묶음을 차단할지 여부를 선택할 수 있습니다.

## 차단 모드

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
