<template>
  <div style="max-width: 100%;" v-if="mainArticle">
    <v-col>
      <v-row>
        <h2 class="articleHeader">
          {{ mainArticle.title }}
        </h2>
      </v-row>
      <v-row>
        <p class="intro" v-html="mainArticle.intro"></p>
      </v-row>
      <v-row>
        <v-img
          :src="mainArticle.images[0].medium"
          :alt="mainArticle.images[0].alt"
        />
      </v-row>
      <v-row>
        <p v-html="mainArticle.body"></p>
      </v-row>
      <v-row>
        <v-chip
          color="#ff57a2"
          text-color="white"
          v-for="(tag, index) in mainArticle.tags"
          :key="index"
          >{{ tag }}</v-chip
        >
      </v-row>
    </v-col>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Article",
  computed: {
    ...mapGetters(["mainArticle"])
  }
};
</script>

<style lang="scss" scoped>
@import url(//db.onlinewebfonts.com/c/d4d77772c32c53cda6724c33cca67436?family=Booster+Next+FY);
.articleHeader {
  font-weight: 700;
  font-size: 45px;
  color: #14cc76;
  text-align: center;
  font-family: Booster;
  text-transform: uppercase;
}
.intro {
  font-weight: 900;
}
p {
  margin: 40px 0 !important;
  line-height: 150%;
  font-size: 24px;
}
.v-chip {
  margin-right: 10px !important;
}
</style>
