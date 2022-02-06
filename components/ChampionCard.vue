<!-- Please remove this file from your project -->
<template>
      <nuxt-link to="/">
        <img :src="link" :alt="index">
        <h2 class="Champion-name">{{ championFiltered.name }}</h2>
      </nuxt-link>
</template>

<script>
export default {
  name: 'ChampionCard',
  props: {
    to: String,
    championFiltered: Object,
    link: String
  }
}
</script>