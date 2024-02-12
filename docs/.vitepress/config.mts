import {defineConfig} from "vitepress";

export default defineConfig({
    lang: "ko-KR",
    title: "DCRefresher Reborn",
    description: "디시인사이드 개선 확장 프로그램",
    themeConfig: {
        logo: "/logo.webp",
        sidebar: [
            {
                text: "시작하기",
                collapsed: false,
                link: "/getting-started",
                items: [
                    {text: "설치", link: "/install"},
                ]
            },
            {
                text: "기능",
                collapsed: false,
                link: "/features",
                items: []
            },
            {
                text: "데이터 이전",
                collapsed: false,
                link: "/migration",
                items: [
                    {text: "DCRefresher", link: "/migration#dcrefresher를-백업"},
                    {text: "DCRefresher Reborn", link: "/migration#dcrefresher-reborn을-백업-복원-deprecated"}
                ]
            },
            {
                text: "유틸",
                collapsed: false,
                link: "/utils",
                items: [
                    {text: "공앱 메모 변환", link: "/utils/convert-memo"},
                ]
            },
            {
                text: "개발 문서",
                collapsed: false,
                link: "/development/getting-started.md",
                items: [
                    {text: "개발", link: "/development/development"},
                ]
            }
        ],
        socialLinks: [
            {icon: "github", link: "https://github.com/green1052/DCRefresher-Reborn"},
            {icon: "discord", link: "https://discord.gg/SSW6Zuyjz6"},
            {icon: {svg: `<svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M9.197 0l-1.619 3.735h-2.407v3.359h0.921l0.943 5.975h-1.473l1.948 10.973 1.249-0.015 1.256 7.973h11.891l0.083-0.531 1.172-7.443 1.188 0.015 1.943-10.973h-1.407l0.937-5.975h1.011v-3.359h-2.557l-1.625-3.735zM9.901 1.073h12.057l1.025 2.375h-14.115zM6.235 4.803h19.525v1.228h-19.525zM6.839 14.136h18.183l-1.568 8.823-7.536-0.079-7.511 0.079z"/></svg>`}, link: "https://www.buymeacoffee.com/green1052"}
        ]
    }
});