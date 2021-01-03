<template>
  <v-app>
    <v-row style="justify-content: center;">
      <v-col cols="10">
        <div class="backgroundColor"></div>
        <v-main class="mainWrapper">

          <div style="display: flex;">

            <!-- Left menu column -->
            <v-col class="menuColumn">
              <v-row>
                <router-link class="logoWrapper" to="/">
                  <v-img class="logo" src="./assets/logo.svg">
                  </v-img>
                </router-link>
              </v-row>
              <v-row class="listRow">
                <router-link class="navButton" to="/list">Nimekiri</router-link>
              </v-row>
              <v-row class="articleRow">
                <router-link class="navButton" to="/artikkel">Artikkel</router-link>
              </v-row>
            </v-col>

            <!-- Components column -->
            <v-col class="rightColumn">
            <router-view style="padding: 0 60px;"></router-view>
          </v-col>
          </div>
        </v-main>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: "App",

  components: {
  },

  data: () => ({
  }),
  created() {
    this.fetchArticle()
    this.fetchList()
  },
  methods: {
    ...mapActions(['fetchList', 'fetchArticle'])
  }
};
</script>

<style lang="scss" scoped>
.menuColumn {
  flex: 0 0 300px !important;
  background: #efefef;
  min-width: 300px !important;
}
.rightColumn {
  position: relative; 
  width: 50%;
  flex-grow: 1;
}
.logoWrapper {
  position: absolute;
  margin: 0 auto 20px;
    padding: 0 35px;
}
.logo {
  width: 90%;
  transition: 0.25s ;
    -moz-transition: width 0.25s ; /* Firefox 4 */
    -webkit-transition: width 0.25s ; /* Safari and Chrome */
    -o-transition: 0.25s ; /* Opera */
    -ms-transition: 0.25s ; /* Explorer 10 */
}
.logo:hover {
  width: 98% !important;
}
.listRow {
  margin-top: 150px;
  justify-content: flex-end;
}
.articleRow {
  justify-content: flex-end;
}
.navButton{
      display: block;
    text-decoration: none;
    line-height: 120%;
    color: #333;
    position: relative;
    text-align: right;
    overflow: hidden;
    font-size: 24px;
    padding: 15px 35px;
    text-transform: uppercase;
}
.navButton:hover {
  font-weight: 600;
  color: #14cc76;
}
.router-link-active {
  color: #14cc76;
}
.backgroundColor {
  background: #efefef; 
  min-width: 1200px !important;
  height: 100%; 
  position: absolute;
}
.mainWrapper {
  background: #efefef; 
  padding-top: 50px; 
  padding-bottom: 50px;
}
</style>
