<!-- Please remove this file from your project -->
<template>
  <div class="champions">
    <div class="entete flex center column">
      <h1 class="title">Champions</h1>
      <p>
        nec ullamcorper enim eu, nibh risus. Pretium malesuada aliquam sem felis. Sed sit tincidunt rhoncus, nunc, suspendisse lacus justo. Nisl venenatis facilisis vitae tristique sem nibh. Facilisis tincidunt lacus nulla eget. Nibh dignissim diam hendrerit felis, feugiat nunc lectus bibendum. Neque ullamcorper faucibus gravida eget ipsum. Vestibulum feugiat ultrices adipiscing quisque elementum varius. Nullam tellus cursus dui euismod sed rutrum arcu. Aliquam aenean neque nisi, adipiscing. Mauris enim praesent molestie amet
      </p>
    </div>
    <div class="sort-bar flex">
      <div class="search-bar flex center" @click="Focus('searchbar')">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28.5878 25.1572H26.781L26.1407 24.5397C28.3819 21.9325 29.7313 18.5477 29.7313 14.8656C29.7313 6.65523 23.076 0 14.8656 0C6.65523 0 0 6.65523 0 14.8656C0 23.076 6.65523 29.7313 14.8656 29.7313C18.5477 29.7313 21.9325 28.3819 24.5397 26.1407L25.1572 26.781V28.5878L36.5923 40L40 36.5923L28.5878 25.1572ZM14.8656 25.1572C9.17096 25.1572 4.57404 20.5603 4.57404 14.8656C4.57404 9.17096 9.17096 4.57404 14.8656 4.57404C20.5603 4.57404 25.1572 9.17096 25.1572 14.8656C25.1572 20.5603 20.5603 25.1572 14.8656 25.1572Z" fill="#8d9ec7"/>
        </svg>
        <input ref="searchbar" type="text" placeholder="Search..." v-model="NameSearch" @change="filterChampion">
      </div>
      <div class="sort-by-role">
        <button v-for="(role, index) in roles" :key=index class="role" :class="role.name"  @click="SelectRole($event, role)" v-bind:id="role.name">
          <svg v-if="index === 0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="all-icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512">
            <path d="M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718L77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256L33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z" fill="#8d9ec7">
            </path>
          </svg>
          <img :src="role.path" alt="" v-if="role.path !== undefined">
          <p>{{role.name}}</p>
        </button>
      </div>
      <div class="sort-by-dropdown flex center" @click="Focus('SortBy')">
        <select ref="SortBy" name="sort" id="Sort-select" @change="filterChampion" v-model="SortBy">
          <option value="" selected disabled hidden>Trié Par</option>
          <option value="NameUp">Name &#8595 </option>
          <option value="NameDown">Name &#8593</option>
          <option value="DifficultyUp">Difficulty &#8595</option>
          <option value="DifficultyDown">Difficulty &#8593</option>
        </select>
        <svg class="custom-arrow" width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 23L0.00961876 0.5L25.9904 0.5L13 23Z" fill="#8d9ec7"/>
        </svg>

      </div>
    </div>
    <div class="champions-layout" v-if="!isFetching">
      <ChampionCard :championFiltered="champion" :link="championLink(index)" class="champion-card" v-for="(champion, index) in filterChampion()" v-bind:key="index" v-show="champion.tags.includes(roleSelected) || roleSelected === 'all' || NameSearch === index "/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuxtTutorial',
  data() {
    return {
      NameSearch: "",
      roleSelected: "all",
      SortBy:"",
      champions: {},
      isFetching: true,
      roles: [
        {
          name: "Tous",
          isActive: true
        },
        {
          name: "Assassin",
          path: "assets/img/roles/Support.png"
        },
        {
          name: "Fighter",
          path: "assets/img/roles/Fighter.png"
        },
        {
          name: "Mage",
          path: "assets/img/roles/Mage.png"
        },
        {
          name: "Marksman",
          path: "assets/img/roles/Marksman.png"
        },
        {
          name: "Support",
          path: "assets/img/roles/Support.png"
        },
        {
          name: "Tank",
          path: "assets/img/roles/Tank.png"
        }
      ]
    }
  },
  mounted() {
    let ButtonAll = document.getElementById('Tous')
    ButtonAll.classList.add('active')
  },
  methods: {
    Focus(elementToFocus) {
      this.$nextTick(() => {
        switch (elementToFocus) {
        case 'searchbar' : 
          this.$refs.searchbar.focus();
          break;
        case 'SortBy' : 
          break;
        default :
          break;
        }
      }
      )
    },
    SortChampions(toFilter) {
      Object.filterReverse = (obj) => 
      Object.keys(obj)
            .reverse()
            .reduce( (result, index) => (result[index] = obj[index], result), {})

      Object.filter = (obj) => 
      Object.keys(obj)
            .sort()
            .reduce( (result, index) => (result[index] = obj[index], result), {})

      Object.difficulty = (obj) => {
        Object.entries(obj).forEach(element => {
        })
      }
      

      if(this.$refs.SortBy.value === "NameDown") {
        var filtered = Object.filterReverse(toFilter)
      } else {
        var filtered = Object.filter(toFilter)
      }

      return filtered;
    },
     SearchByName(toFilter) {
      Object.filter = (obj) => 
      Object.keys(obj)
            .filter(index => obj[index].name.toLowerCase().includes(this.NameSearch.toLowerCase()))
            .reduce( (result, index) => (result[index] = obj[index], result), {})

      var filtered = Object.filter(toFilter); 
      return filtered
    },
    filterChampion() {
      var toFilter = this.champions.data

      toFilter = this.SearchByName(toFilter)
      toFilter = this.SortChampions(toFilter)
      return toFilter
    },
    championLink(name) {
      return "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + name + "_0.jpg"
    },
    SelectRole(e) {
      let buttons = document.getElementsByClassName('role')
      Object.keys(buttons).forEach(element => {
        if(buttons[element].classList.contains('active')) {
          buttons[element].classList.remove('active')
        }
      });
      let buttonClicked =  e.currentTarget
      buttonClicked.classList.add('active')

      this.roleSelected = buttonClicked.classList.contains('Tous') ? 'all' : buttonClicked.classList[1];
    }
  },
  async fetch () {
    let url = 'champion.json';
    return this.$axios.$get( '/api-static/' + url ).then((result) => {
      this.champions = result;
      this.isFetching = false;
    }).catch((err) => {
      console.log(err)
    });
  }
}
</script>