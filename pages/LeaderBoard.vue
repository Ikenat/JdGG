<template>
<div class="leaderboard-wrapper">
    <div class="thead flex">
        <p class="flex center">
            Summoner
        </p>
        <p class="flex center">
            League Points
        </p>
        <p class="flex center">
            Winrate
        </p>
    </div>
    <div v-for="(profil, index) in this.leaderboard" :key="index" class="profil-card">
        <ProfilLeaderBoard :profil=profil :rank="index + 1" v-if="index < 20" />
    </div>
</div>
</template>

<script>
export default {
  name: 'LeaderBoard',
  data() {
    return {
      isFetching: true,
      leaderboard: {}
    }
  },
  methods: {
      SlicedLeaderBoard(obj) {
          let slice = Object.keys(obj).slice(0, 20).reduce((result, key) => {
              result[key] = obj[key];

              return result
          }, {});

          return slice
      }
  },
  async fetch () {
      let apikey = "&api_key=RGAPI-3bdb54f7-4597-45e2-838b-b9b787ce73fd"
    let url = 'league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1';
    return this.$axios.$get( '/api-dynamic/' + url + apikey ).then((result) => {
      this.leaderboard = result;
      this.isFetching = false;
      console.log(this.SlicedLeaderBoard(this.leaderboard));
    }).catch((err) => {
      console.log(err)
    });
  }
}
</script>