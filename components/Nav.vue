<template>
    <nav class="sidebar">
        <header>
            <div class="image-wrapper">
                <NuxtLink to="/">
                    <div class="navLink">
                        <span class="image">
                            <img src="/assets/img/logo.png" alt="logo">
                        </span>
                        <div class="header-text">
                            <p class="text">JDGG</p>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </header>

        <div class="menu-wrapper flex column">
            <div class="menu">
                <ul class="menu-links">
                    <li v-for="(link, index) in links" v-bind:key="index" class="nav-links">
                        <NuxtLink to="/">
                        <div class="links flex vertical-center">
                            <img :src="link.path" alt="Chat">
                            <div class="header-text">
                                <p class="text">{{link.name}}</p>
                            </div>
                        </div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>

            <div class="bottom-content">
                <button class="mode flex vertical-center" @click="switchTheme">
                    <div class="moon-sun flex vertical-center">
                        <img class="light" src="/assets/svg/sun.svg" alt="sun icon">
                        <img class="dark" src="/assets/svg/moon.svg" alt="moon icon">
                        <img class="blue" src="/assets/svg/blue-moon.svg" alt="cloudy moon icon">
                    </div>
                    <p class="text">Dark Mode</p>

                    <div class="toggle-switch flex center">
                        <span class="switch"></span>
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
            ]
        }
    },
    methods: {
        switchTheme() {
            let body = document.body
            let theme = body.getAttribute("data-theme") 
            switch(theme) {
                case "dark" :
                    body.setAttribute("data-theme", "blue");
                    break
                case "blue" :
                    body.removeAttribute("data-theme");
                    break;
                default: 
                    body.setAttribute("data-theme", "dark")
            }
        }
    }
}
</script>
