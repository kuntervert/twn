<template>
  <div v-if="listContent">
    <h2 class="listHeader">NIMEKIRI</h2>
    <table style="width:100%">
  <tr>
    <th>EESNIMI</th>
    <th>PEREKONNANIMI</th> 
    <th>SUGU</th>
    <th>SÜNNIKUUPÄEV</th>
    <th>TELEFON</th>
  </tr>
  <tr class="rows" v-for="(person, index) in paginatedList" :key="index">
    <td>{{person.firstname}}</td>
    <td>{{person.surname}}</td>
    <td v-if="person.sex === 'f'">Naine</td>
    <td v-if="person.sex === 'm'">Mees</td>
    <td>{{person.personal_code}}</td>
    <td>{{person.phone}}</td>
  </tr>
</table>
<v-pagination :total-visible="7" circle v-model="page" :length="listContent.list.length / 10"></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "List",

  data: () => ({
    loaded: false,
    page: 1,
  }),
  computed: {
    ...mapGetters(['listContent']),
    paginatedList: function(){
        return this.listContent.list.slice(this.pageStart, this.pageEnd)
    },
    pageStart: function() {
      if(this.page === 1) {
        return 0
      } else {
        return (this.page-1)*10
      }
    },
    pageEnd: function() {
      return this.pageStart+10;
    }
  },
  
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.listHeader {
  font-weight: 700;
    font-size: 45px;
    color: #14cc76;
    text-align: center;
    font-family: Booster;
    text-transform: uppercase;
    margin-bottom: 60px;
}
th {
  padding-right: 10px;
  text-align: left;
  color: #ff57a2;
  cursor: pointer;
}
td {
  padding:10px 0 10px;
  border-top: 1px solid black;
}
table {
  border-spacing: 0;
}
tr:hover {
  color: #ff57a2;
  cursor: pointer;
}
</style>
