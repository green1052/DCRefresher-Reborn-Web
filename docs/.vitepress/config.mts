import {defineConfig} from "vitepress";

export default defineConfig({
    lang: "ko-KR",
    title: "DCRefresher Reborn",
    description: "디시인사이드 개선 확장 프로그램",
    cleanUrls: true,
    metaChunk: true,
    themeConfig: {
        logo: "/logo.webp",
        sidebar: [
            {
                text: "시작하기",
                collapsed: false,
                link: "/getting-started",
                items: [
                    {text: "설치", link: "/install"}
                ]
            },
            {
                text: "기능",
                collapsed: false,
                link: "/features",
                items: []
            },
            {
                text: "유틸",
                collapsed: false,
                link: "/utils",
                items: [
                    {text: "데이터 이전", link: "/utils/migration"},
                    {text: "공앱 메모 변환", link: "/utils/convert-memo"}
                ]
            },
            {
                text: "개발 문서",
                collapsed: false,
                link: "/development/getting-started.md",
                items: [
                    {text: "API", link: "/development/api"},
                    {text: "모듈", link: "/development/module"},
                    {text: "구조", link: "/development/structure"}
                ]
            }
        ],
        socialLinks: [
            {icon: "github", link: "https://github.com/green1052/DCRefresher-Reborn"},
            {icon: "discord", link: "https://discord.gg/SSW6Zuyjz6"}
        ]
    }
});