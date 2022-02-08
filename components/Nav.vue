<template>
    <nav class="sidebar">
        <header>
            <div class="image-wrapper">
                <NuxtLink to="/">
                    <div class="navLink">
                        <span class="image">
                            <img src="/assets/img/logo.png" alt="logo">
                        </span>
                        <div class="header-text" v-if="!shrink">
                            <p class="text">JDGG</p>
                        </div>
                    </div>
                </NuxtLink>
                <button class="shrink flex center" @click="ShrinkMenu">
                        <svg class="shrinkSVG flex center" width="9" height="15" viewBox="0 0 16 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.4375 2.9375L5.89583 12.5L15.4375 22.0625L12.5 25L0 12.5L12.5 9.53674e-07L15.4375 2.9375Z" fill="#fff"/>
                        </svg>
                </button>
            </div>
        </header>

        <div class="menu-wrapper flex column vertical-center">
            <div class="menu">
                <ul class="menu-links">
                    <li v-for="(link, index) in links" v-bind:key="index" class="nav-links">
                        <NuxtLink :to="link.name">
                        <div class="links flex vertical-center">
                            <img :src="link.path" alt="Chat">
                            <div class="header-text" v-if="!shrink">
                                <p class="text">{{link.name}}</p>
                            </div>
                        </div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>

            <div class="bottom-content">
                <button class="mode flex vertical-center" @click="switchTheme">
                    <div class="moon-sun flex center">
                        <img class="mode-icon" :src="dataTheme.svgPath" alt="moon icon">
                    </div>
                    <p class="text" v-if="!shrink">{{dataTheme.ThemeName}}</p>
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            links: [
                {
                    name: "home",
                    path: "assets/svg/home.svg"
                },
                {
                    name: "Profile",
                    path: "assets/svg/profil.svg"
                },
                {
                    name: "LeaderBoard",
                    path: "assets/svg/leaderboard.svg"
                },
                {
                    name: "Champions",
                    path: "assets/svg/champion.svg"
                },
                {
                    name: "Chat",
                    path: "assets/svg/chat.svg"
                }
            ],
            dataTheme: {
                ThemeName: "Light Mode",
                svgPath: "assets/svg/sun.svg"
            },
            shrink: false,
        }
    },
    methods: {
        switchTheme() {
            let body = document.body
            let theme = body.getAttribute("data-theme") 
            switch(theme) {
                    case "dark" :
                        body.setAttribute("data-theme", "blue");
                        this.dataTheme.ThemeName = "Blue Mode";
                        this.dataTheme.svgPath = "assets/svg/blue-moon.svg";
                        break
                    case "blue" :
                        body.removeAttribute("data-theme");
                        this.dataTheme.ThemeName = "Light Mode";
                        this.dataTheme.svgPath = "assets/svg/sun.svg";
                        break;
                    default: 
                        body.setAttribute("data-theme", "dark")
                        this.dataTheme.ThemeName = "Dark Mode";
                        this.dataTheme.svgPath = "assets/svg/moon.svg";
                        break;
                }
        },
        ShrinkMenu(event) {
            let navbar = document.querySelector(".navbar");
            let layout = document.querySelector(".layout");
            navbar.classList.toggle("close");
            layout.classList.toggle("shrink");
            this.shrink = !this.shrink ;
        }
    }
}
</script>
