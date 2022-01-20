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
                    <button class="shrink flex center" @click="ShrinkMenu">
                        <svg class="shrinkSVG flex center" width="9" height="15" viewBox="0 0 16 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.4375 2.9375L5.89583 12.5L15.4375 22.0625L12.5 25L0 12.5L12.5 9.53674e-07L15.4375 2.9375Z" fill="#fff"/>
                        </svg>
                    </button>

                </NuxtLink>
            </div>
        </header>

        <div class="menu-wrapper flex column vertical-center">
            <div class="menu">
                <ul class="menu-links">
                    <li v-for="(link, index) in links" v-bind:key="index" class="nav-links">
                        <NuxtLink to="/">
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

                    <div class="toggle-switch flex center" v-if="!shrink">
                        <div class="toggle-wrapper">
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="1.69482" y="46.7797" width="56.6102" height="8.47458" rx="4.23729" fill="#383838"/>
                                <rect x="31.7461" y="3.38983" width="56.6102" height="8.47458" rx="4.23729" transform="rotate(60 31.7461 3.38983)" fill="#383838"/>
                                <rect y="52.4157" width="56.6102" height="8.47458" rx="4.23729" transform="rotate(-60 0 52.4157)" fill="#383838"/>
                                <circle class="svgCircle" cx="5.9685" cy="51.0531" r="3.55933" fill="white"/>
                            </svg>
                        </div>
                    </div>
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
            if(!this.shrink) {
                let circle = document.querySelector(".svgCircle")
                switch(theme) {
                    case "dark" :
                        circle.setAttribute('cx', '30.0774');
                        circle.setAttribute('cy', '10.23');
                        break
                    case "blue" :
                        circle.setAttribute('cx', '5.9685');
                        circle.setAttribute('cy', '51.0531');
                        break;
                    default: 
                        circle.setAttribute('cx', '54.1038');
                        circle.setAttribute('cy', '51.0531');
                        break;
                }
            }
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
