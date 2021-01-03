<template>
  <div v-if="listContent">
    <h2 class="listHeader">NIMEKIRI</h2>
    <table id="table" style="width:100%">
  <tr>
    <th @click="sortBy('firstname')">EESNIMI <v-icon class="sortIcon">mdi-sort-alphabetical-variant</v-icon></th> 
    <th @click="sortBy('surname')">PEREKONNANIMI<v-icon class="sortIcon">mdi-sort-alphabetical-variant</v-icon></th> 
    <th @click="sortBy('sex')">SUGU<v-icon class="sortIcon">mdi-sort-alphabetical-variant</v-icon></th>
    <th @click="sortBy('personal_code')">SÜNNIKUUPÄEV<v-icon class="sortIcon">mdi-sort-alphabetical-variant</v-icon></th>
    <th @click="sortBy('phone')">TELEFON<v-icon class="sortIcon">mdi-sort-alphabetical-variant</v-icon></th>
  </tr>
  <tr :id="index" @click="openDetails(index, person.id)" class="rows" v-for="(person, index) in paginatedList" :key="index">
    <td>{{person.firstname}}</td>
    <td>{{person.surname}}</td>
    <td v-if="person.sex === 'f'">Naine</td>
    <td v-if="person.sex === 'm'">Mees</td>
    <td>{{person.personal_code}}</td>
    <td>{{person.phone}}</td>
  </tr>
    
</table>
<v-pagination @input="selected = null; closeDetails()" :total-visible="7" circle v-model="page" :length="listContent.list.length / 10"></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "List",

  data: () => ({
    page: 1,
    detailOpen: false,
    lastOpenedDetail: null,
    sortOrder: 0,
    sortCount: 0,
    chosenSort: null,
  }),
  computed: {
    ...mapGetters(['listContent', 'backupList']),
    paginatedList: function(){
        return this.listContent.list.slice(this.pageStart, this.pageEnd)
    },
    pageStart: function() {
      return (this.page-1)*10;
    },
    pageEnd: function() {
      return this.pageStart+10;
    },

  },
  
  methods: {
    sortBy(sortedColumn) {
      this.sortCount++
      if(this.chosenSort !== sortedColumn) {
        this.sortOrder = 0
      }
      if(this.sortOrder === 0) {
        this.listContent.list.sort((a, b) => parseFloat(a[sortedColumn]) - parseFloat(b[sortedColumn])); 
        this.sortOrder = 1
        this.chosenSort = sortedColumn
      } else if (this.sortOrder === 1) {
        this.listContent.list.sort((a, b) => parseFloat(b[sortedColumn]) - parseFloat(a[sortedColumn]));
        this.sortOrder = -1 
        this.chosenSort = sortedColumn

      } else {
        this.listContent = this.backupList
        this.chosenSort = sortedColumn
        console.log('tere')

      }
    },
    openDetails(x, id) {
      let ind = document.getElementById(x).rowIndex
      let table = document.getElementById("table");
      // Open detail view
      if(this.detailOpen === false) {
        let detailContent = this.listContent.list.filter(x => x.id === id);
        let introText = detailContent[0].intro
        let introTruncated = this.truncate(introText)

        let row = table.insertRow(ind+1);
        row.className = 'detailRow'
        row.innerHTML = "<td colspan='10'> <div id='detailWrapper' style='display: flex; width: 100% !important; height: 165px !important; padding-top: 10px;'> " +
        ` <img style="max-width: 35%; padding-bottom: 30px; margin-right: 25px;" src='${detailContent[0].images[0].medium}'/>`+ "<div style='max-height: 150px !important;'>" + `${introTruncated}` + "</div>" + "</div>"
        
        this.detailOpen = true;
        this.lastOpenedDetail = ind+1
      // Open another detail view when there's one open already
      } else if(this.lastOpenedDetail !== ind+1) {
        this.closeDetails()
        this.openDetails(x, id)

      // close the view
      } else {
        this.closeDetails()
      }
    },
    closeDetails() {
      if(this.lastOpenedDetail !== null) {
        document.getElementById("table").deleteRow(this.lastOpenedDetail);
        this.detailOpen = false
        this.lastOpenedDetail = null
      } else {
        return
      }
      
    },
    truncate(input) {
      if (input.length > 200) {
        return input.substring(0, 200) + '...';
      }
      return input;
    }
  }
}
</script>

<style lang="scss" scoped>
.listHeader {
  font-weight: 700;
    font-size: 45px;
    color: #14cc76;
    text-align: center;
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
  padding:5px 0 5px;
  border-top: 1px solid black;

}
table {
  border-spacing: 0;
}
tr:hover {
  color: #ff57a2;
  cursor: pointer;

}
.detailRow {
    min-height: 165px !important;
    max-width: 615px !important;
}
.sortIcon {
color: #ff57a2;
padding-bottom: 5px;
}
</style>
