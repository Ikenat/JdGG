<template>
    <nuxt-link to="/" class="cardTopServeur flex column horizontal-center vertical-center" v-if="!isFetching">
        <div class="header-cardTopServeur flex column vertical-center horizontal-center">
            <div class="Summoner-icon flex center">
                <img :src="IconLink(this.profilSummoner.profileIconId)" alt="img">
                <p class="flex center summonerLevel"> {{ this.profilSummoner.summonerLevel }} </p>
            </div>
            <div class="summoner-info-TopServeur flex column center">
                <img :src="getlinkCrown()" alt="crown for top1">
                <p class="summonerName"> {{profil.summonerName}} </p>
            </div>
        </div>
        
        <div class="body-card-TopServeur flex center">
            <div class="leaguepoint flex center">
                <img src="/assets/img/rank/challenger.png" alt="" class="tier">
                <p>{{profil.leaguePoints}} <span>LP</span></p>
            </div>
        </div>
        <div class="footer-card-TopServeur winrate flex center" v-if="this.rank === 0">
            <p>{{ this.winrate }}% winrate</p>
            <div class="graph TopServeur flex">
                <div class="winrate-bar" :style="{width: this.winrate + '%'}"></div>
                <div class="losserate-bar" :style="{width: 100 - this.winrate + '%'}"></div>
            </div>
            <p class="games"> {{ this.profil.wins + this.profil.losses }} Games</p>
        </div>
    </nuxt-link>
</template>

<script>
export default {
  name: 'ProfilTopMondial',
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
    getlinkCrown() {
        switch(this.rank) {
            case 0: 
                return '/assets/svg/crown-lvl-3.svg';
                break;
            case 1:
                return '/assets/svg/crown-lvl-2.svg';
                break;
            case 2:
                return '/assets/svg/crown-lvl-1.svg';
                break;

        }
    },
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
    let apikey = "?api_key=RGAPI-de9ee293-0da0-4de9-9448-1d1756f008d4"
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