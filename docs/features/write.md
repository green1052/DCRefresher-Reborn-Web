---
description: DCRefresher Reborn의 글쓰기 기능을 설명합니다.
---

# 글쓰기

글쓰기 모듈은 디시인사이드의 글 작성 페이지에 다양한 편의 기능을 추가합니다.

## 기능

이 모듈은 글 작성 시 자동으로 머리말과 꼬리말을 추가하거나, 자짤을 첨부하는 기능을 제공합니다. 또한 제목의 글자수 제한을 우회하고, 작성 중인 글이 실수로 닫히는 것을 방지하는 기능도 포함되어 있습니다.

## 설정 옵션

| 옵션           | 설명                  | 기본값  |
|--------------|---------------------|------|
| 제목 글자수 제한 우회 | 제목 글자수 제한을 우회합니다.   | 꺼짐   |
| 머리말          | 머리말을 설정합니다. (HTML)  | (없음) |
| 꼬리말          | 꼬리말을 설정합니다. (HTML)  | (없음) |
| 자짤           | 자짤을 설정합니다. (이미지 주소) | (없음) |
| 나가기 방지       | 글 작성 중 나가기를 방지합니다.  | 꺼짐   |

## 사용 방법

### 머리말/꼬리말 설정
1. '머리말' 또는 '꼬리말' 설정 옵션에 원하는 HTML 코드를 입력합니다.
2. 글 작성 시 '글쓰기' 버튼을 클릭하면 자동으로 설정된 머리말/꼬리말이 본문에 추가됩니다.

### 자짤 설정
1. '자짤' 설정 옵션에 사용할 이미지의 URL을 입력합니다.
2. 글 작성 시 '글쓰기' 버튼을 클릭하면 자동으로 설정된 이미지가 본문 맨 앞에 추가됩니다.

### 제목 글자수 제한 우회
1. '제목 글자수 제한 우회' 옵션을 활성화합니다.
2. 글 작성 시 제목이 디시인사이드의 글자수 제한을 초과하더라도 게시가 가능합니다.

### 나가기 방지
1. '나가기 방지' 옵션을 활성화합니다.
2. 글 작성 중 실수로 페이지를 닫거나 뒤로 가기를 누를 경우, 경고 메시지가 표시되어 의도치 않은 내용 손실을 방지합니다.

## 주의사항

- 머리말과 꼬리말에는 HTML 코드를 사용할 수 있으므로, 디시인사이드에서 지원하는 HTML 태그를 활용하여 다양한 형태로 꾸밀 수 있습니다.
