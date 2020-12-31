import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		mainArticle: null,
		tablePeople: null
	},
	mutations: {
		SET_ARTICLE(state, article) {
			state.mainArticle = article;
		}
	},
	actions: {
		async fetchArticle({ commit }) {
			let article = null;
			await axios.get('http://proovitoo.twn.ee/api/article.json').then((response) => {
				article = response.data;
			});
			commit('SET_ARTICLE', article);
		}
	},
	getters: {
		mainArticle(state) {
			return state.mainArticle;
		}
	}
});
