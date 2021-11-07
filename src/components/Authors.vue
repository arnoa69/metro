<template>
  <div class="card" id="cardId">
    <div class="card-body">
        <div class="type">{{ metropolis.type }}</div>

        <div class="title-metro">{{ metropolis.title }}</div>

        <div class="authors">Authors
          <span v-for="(authors, index) in onlyAuthors" :key="authors.id"> 
            <span @mouseover="showPopup(index)" @mouseout="hidePopup(index)" class="single_author">{{ authors.fullName }}</span>

              <sup
                v-for="(supIndex) in authors.affiliations"
                :key="supIndex.id"
                class="sup">{{supIndex.order}}
              </sup>
            <span v-if="index+1 < metropolis.authors.length">, </span> 
            <span class="sup" v-if="index+1 == metropolis.authors.length-2">and </span>
            <!-- <pop-up v-show="show" ref="card" :author-details="authors" /> -->
            <div style="display:none;" class="popup" ref="card">
              {{ authors.fullName }}<br>
              <span class="card-affiliations">{{ authors.affiliations[0].name }}, <br>
              {{ authors.affiliations[0].city }}, {{ authors.affiliations[0].country }}</span> <br>
              <span class="card-facts">
                <span class="card-numbers">{{ authors.publications }}</span> Publications 
                <span class="card-numbers ml20">{{ authors.views }}</span> Views
                <span class="card-numbers ml20">{{ authors.followers }}</span> Followers</span>
            </div>
          </span>
        </div>       

        <div class="editor">
          Editor <span class="single_author">{{ metropolis.editor.fullName }}</span>
            <sup
              v-for="supIdx in metropolis.editor.affiliations"
              :key="supIdx.id"
              class="sup">{{supIdx.order}}
            </sup>
            <br />
          Yourself <span class="single_author">{{ metropolis.yourself.fullName }}</span><sup class="sup">{{ metropolis.yourself.affiliations.order }}</sup>
        </div> 

        <div class="affiliations">
          <a class="toggle-link" @click="openAffiliations">
             Affiliations <font-awesome-icon  :icon="show ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'" /> 
          </a>
          <transition name="fade">
            <p class="list-block" v-if="show">
              <ul class="list-items">
                <li v-for="affil in affiliations" :key="affil.id">
                  <sup>{{affil.order}}</sup> {{affil.name}}, {{affil.city}}, {{affil.country}}
                </li>
              </ul>                 
            </p>
          </transition>
        </div>    
        <div class="journal">{{ metropolis.journal }} | {{ metropolis.section }}</div>            
    </div><!-- card-body -->
  </div><!-- card -->   


</template>

<script>
import PopUp from './shared/Popup.vue'
export default {
  data() {
    return {
      show: true,
      pHeight: '',
      cHeight: '',
      totalHeight: '',
      hover: false
    }
  },
  components: {
    PopUp
  },
  created() {
    this.$store.dispatch('fetchData')   
  },
  mounted() {
    let cardHeight = document.querySelector('.card');
    this.cHeight = cardHeight.offsetHeight;

    let pElement = document.querySelector('.list-block')
    this.pHeight = pElement.offsetHeight;

    this.totalHeight = this.cHeight  + this.pHeight;

    document.getElementById("cardId").style.height = this.totalHeight + "px";       
  },
  methods: {
    showPopup(index) {    
      let $ref = this.$refs.card[index];
      $ref.style.display = 'block'
    },
    hidePopup(index) {
      let $ref = this.$refs.card[index];
      $ref.style.display = 'none'
    },
    openAffiliations() {
      if(this.show) {
        let newCardHeight = this.totalHeight - this.pHeight;
        document.getElementById("cardId").style.height = newCardHeight + "px";          
      } else {
        let newCardHeight = this.cHeight + this.pHeight;
        document.getElementById("cardId").style.height = newCardHeight + "px";           
      }
        this.show = !this.show;      
    }
  },
  computed: {
    metropolis() {
      return this.$store.getters.getMetropolisData
    },
    affiliations() {
      let authors;
      authors = this.$store.getters.getMetropolisData.authors;
      let arrAuthors = [];
      let otherArray = [];
      let uniqueAffil = [];

      //add also the editor so we have full list of possible affiliations
      arrAuthors.push(this.$store.getters.getMetropolisData.editor.affiliations);

      for (let author of authors) {
        if (author.affiliations) {
          arrAuthors.push(author.affiliations)
        }
      }
      
      for(let affil of arrAuthors) {
        otherArray.push(...affil)
      }

      let y = 1;      
      for(let unique of otherArray) {
        unique["order"] = y
        y++
      }

      uniqueAffil = otherArray.filter( (val,i,a) => a.findIndex(t => (t.id === val.id))===i)

      return uniqueAffil;
    },
    onlyAuthors() {
      let arr = this.metropolis.authors;
      let myself = this.metropolis.yourself;
      let authors = arr.filter((a) => {if(a.id!=myself.id){return a}});
      return authors;

    }
  }  
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 32px;
  position: static;
  width: 659px;
  height: 299px;
  left: 0px;
  top: 131px;
  background: #FFFFFF;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.card-body {
  position: static;
  width: 595px;
  height: 22px;
  left: 0px;
  top: 0px;  
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 21px;  
  color: #555555;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 0px 0px;
}

.type {
  position: static;
  color: #555555;
  text-align: left;
}  

.title-metro {
  text-align: left;
  height: 48px;
  left: 0%;
  right: 0%;
  top: 28.21%;
  bottom: 10.26%;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
  color: #020202;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
}

.authors {
  position: static;
  left: 4.86%;
  right: 4.86%;
  top: 36.79%;
  bottom: 46.82%;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #020202;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 8px 0px;  
  text-align: left;
}

.single_author {
  font-weight: 300;
  text-decoration: underline;
}
.sup {
  font-weight: 300;
}

.editor {
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #020202;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  margin: 8px 0px; 
}

.affiliations {
  text-align: left;
  position: static;
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  color: #020202;
}

/* START Accordion */
.list-items {
  list-style-type: none;
  display: inline-block;
}  

.list-block {
    position: absolute;
    left: -10px;
    top: 320px;
    cursor: pointer;
}

#wrapper ul {
    list-style-type: none;
    list-style-position: outside;
}
.toggle-link {
  color: #0084AD;
  font-size: 13px;
  line-height: 22px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* END Accordion */

.journal {
    font-size: 15px !important;
    line-height: 21px;
    color: #020202;
    position: absolute;
    bottom: 5px;
}

.popup {
  width: 385px;
  height: 162px;
  background-color: #FFFFFF;
  z-index: 99;
  position: fixed;
  padding:16px;
  box-shadow:  0px -2px 10px rgba(0, 0, 0, 0.08), 0px 14px 28px rgba(0, 0, 0, 0.1);
}
.card-affiliations {
  font-weight: 300;
  font-size: 13px;
  line-height: 20px;
  color: #555555;
}
.card-facts {
  font-weight: 300;
  font-size: 13px;
  line-height: 20px;
  color: #020202;  
}
.card-numbers {
  color: #00A0D2;
}
.ml20 {
  margin-left: 20px;
}
</style>