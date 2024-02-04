import React, {useCallback, useState} from "react";

type RefresherMemoType = "UID" | "NICK" | "IP";

interface RefresherMemoValue {
    text: string;
    color: string;
    gallery?: string;
}


function App() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const generateColor = useCallback(() => {
        return `#${(Math.trunc((1 << 24) * Math.random()).toString(16).padStart(6, "0"))}`;
    }, []);

    const convert = useCallback(() => {
        const lines = input.split("\n");

        const result: Record<RefresherMemoType, Record<string, RefresherMemoValue>> = {
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
                }

                continue;
            }

            result["UID"][id] = {
                text: memo,
                color: generateColor()
            };
        }

        setOutput(JSON.stringify(result, null, 4));
    }, [input, generateColor]);

    return (
        <>
            <div style={{textAlign: "center"}}>
                <h1>DCRefresher Reborn</h1>
                <h3 style={{marginLeft: 200}}>By green1052</h3>
            </div>

            <div style={{marginTop: 50, textAlign: "center"}}>
                <h3>
                    <a target="_blank" rel="noopener noreferrer"
                       href="https://github.com/green1052/DCRefresher-Reborn">GitHub</a>,&nbsp;
                    <a target="_blank" rel="noopener noreferrer"
                       href="https://chrome.google.com/webstore/detail/dcrefresher-reborn/pmfifcbendahnkeojgpfppklgioemgon">Chrome
                        Web Store</a>,&nbsp;
                    <a target="_blank" rel="noopener noreferrer"
                       href="https://addons.mozilla.org/ko/firefox/addon/dcrefresher-reborn">Firefox Add-ons</a>
                </h3>
            </div>

            <div style={{marginTop: 100, textAlign: "center"}}>
                <h1>1. 디시인사이드 앱 메모 변환</h1>

                <h2>입력</h2>
                <textarea onChange={(e) => setInput(e.target.value)}/>

                <h2>출력</h2>
                <textarea value={output}/>

                <br/>
                <br/>

                <button onClick={convert}>변환</button>
            </div>
        </>
    );
}

export default App;
