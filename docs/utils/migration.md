---
description: DCRefresher의 설정을 DCRefresher Reborn으로 이전하는 방법을 설명합니다.
---

# 설정 마이그레이션

DCRefresher의 설정을 DCRefresher Reborn으로 이전하는 방법을 설명합니다.

## Chrome

1. ```chrome://extensions``` 접속
2. 개발자 모드 활성화
3. 서비스 워커 클릭
4. 콘솔 탭으로 이동

## Firefox

1. ```about:debugging#/runtime/this-firefox``` 접속
2. 검사 버튼 클릭
3. 콘솔 탭으로 이동

## 절차

1. DCRefresher에서 아래의 코드를 실행하고 나온 내용을 복사하세요.

```javascript
chrome.storage.sync.get(null, (settings) => {
    const result = {};

    for (const [key, value] of Object.entries(settings)) {
        if (["refresher.lastVersion"].includes(key)) continue;

        if (key === "refresher.module:유저 정보") {
            const {memos} = JSON.parse(value);

            for (const [key, value] of Object.entries(memos)) {
                const [type, id] = key.split("@");

                result[`__REFRESHER_MEMO:${type}`] ??= {};
                result[`__REFRESHER_MEMO:${type}`][id] = value;
            }

            continue;
        }

        result[key] = value;
    }

    console.log(JSON.stringify(result));
});
````

2. DCRefresher Reborn의 설정 페이지에서 고급 > 데이터 관리 > 데이터 가져오기를 클릭하여 내보낸 내용을 붙여넣기하세요.