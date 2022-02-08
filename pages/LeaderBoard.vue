<template>
<div class="leaderboard-wrapper flex column center">
    <div class="Top-wrapper flex">
        <div v-for="(profil, index) in SlicedLeaderBoard(this.leaderboard, 0, 3)" :key="index" class="profil-card-TopServeur" v-bind:class="{ 'First-Serveur': index == 0 }">
          <ProfilTopMondial :profil=profil :rank="parseInt(index)"  />
        </div>
    </div>
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
    <div v-for="(profil, index) in SlicedLeaderBoard(this.leaderboard, 3, 20)" :key="index" class="profil-card">
        <ProfilLeaderBoard :profil=profil :rank="parseInt(index)" />
    </div>
</div>
</template>

<script>
import ProfilTopMondial from '../components/ProfilTopMondial.vue';
export default {
  components: { ProfilTopMondial },
  name: 'LeaderBoard',
  data() {
    return {
      isFetching: true,
      leaderboard: {}
    }
  },
  methods: {
    getrank(rank) {
      return 'rank-' + rank
    },
    SlicedLeaderBoard(obj, min, max) {
          let slice = Object.keys(obj).slice(min, max).reduce((result, key) => {
              result[key] = obj[key];

              return result
          }, {});

          return slice
      }
  },
  async fetch () {
      let apikey = "&api_key=RGAPI-de9ee293-0da0-4de9-9448-1d1756f008d4"
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