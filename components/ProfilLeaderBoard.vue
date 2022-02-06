<template>
    <nuxt-link to="/" class="card flex vertical-center" v-if="!isFetching">
        <div class="header-card flex vertical-center">
            <div class="rank flex center">
                <p>{{rank}}</p>
            </div>
            <div class="summoner-info flex center">
                <img :src="IconLink(this.profilSummoner.profileIconId)" alt="img">
                <p class="summonerName"> {{profil.summonerName}} </p>
            </div>
        </div>
        
        <div class="body-card flex center">
            <div class="leaguepoint flex center">
                <img src="/assets/img/rank/challenger.png" alt="" class="tier">
                <p>{{profil.leaguePoints}} LP</p>
            </div>
        </div>
        <div class="footer-card winrate flex">
            <p>{{ this.winrate }}%</p>
            <div class="graph flex">
                <div class="winrate-bar" :style="{width: this.winrate + '%'}"></div>
                <div class="losserate-bar" :style="{width: 100 - this.winrate + '%'}"></div>
            </div>
            <p> {{ this.profil.wins + this.profil.losses }} Games</p>
        </div>
    </nuxt-link>
</template>

<script>
export default {
  name: 'Profil',
  data() {
      return {
          profilSummoner: {},
          isFetching: true,
          winrate: 0
      }
  },
  props: {
    profil: Object,
    rank: Number
  },
  methods: {
    IconLink(iconId) {
        return "https://ddragon.leagueoflegends.com/cdn/12.3.1/img/profileicon/" + iconId + ".png"
    },
    GetWinrate() {
        let wins = this.profil.wins;
        let losses = this.profil.losses;
        let totalGame = wins + losses;
        return Math.trunc(wins / totalGame * 100);
    }
  },
  async fetch () {
    let apikey = "?api_key=RGAPI-3bdb54f7-4597-45e2-838b-b9b787ce73fd"
    let url = 'summoner/v4/summoners/by-name/' + this.profil.summonerName;
    return this.$axios.$get( '/api-dynamic/' + url + apikey ).then((result) => {
      this.profilSummoner = result;
      this.winrate = this.GetWinrate();
      this.isFetching = false;
    }).catch((err) => {
      console.log(err)
    });
  }
}
</script>