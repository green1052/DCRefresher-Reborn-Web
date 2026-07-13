---
description: 디시인사이드 공앱 메모를 DCRefresher Reborn 메모로 변환합니다.
---

<script setup>
const input = defineModel("input");
const output = defineModel("output");

const generateColor = () => {
    return `#${(Math.trunc((1 << 24) * Math.random()).toString(16).padStart(6, "0"))}`;
};

const convert = () => {
    const lines = input.value.split("\n");

    const result = {
        UID: {},
        NICK: {},
        IP: {}
    };

    for (const line of lines) {
        let [id, memo] = line.split("-");

        id = id.trim();
        memo = memo.trim();

        if (/^\d*\.\d*$/.test(id)) {
            result["IP"][id] = {
                text: memo,
                color: generateColor()
            };

            continue;
        }

        result["UID"][id] = {
            text: memo,
            color: generateColor()
        };
    }

    output.value = JSON.stringify(result, null, 4);
};
</script>

# 공앱 메모 변환

디시인사이드 공앱(모바일 앱)에서 사용하던 메모 데이터를 DCRefresher Reborn 메모 형식으로 변환합니다.

## 입력

공앱 메모 데이터를 아래 텍스트 영역에 붙여넣으세요. (형식: `아이디-메모`)

<textarea v-model="input" placeholder="메모를 입력하세요"></textarea>

## 출력

변환된 메모 JSON 데이터가 여기에 표시됩니다.

<textarea v-model="output" placeholder="변환된 메모가 여기에 표시됩니다"></textarea>

<button @click="convert">변환 버튼</button>