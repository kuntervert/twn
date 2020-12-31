import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		mainArticle: null,
		listContent: null
	},
	mutations: {
		SET_ARTICLE(state, article) {
			state.mainArticle = article;
		},
		SET_LIST(state, list) {
			state.listContent = list;
		}
	},
	actions: {
		async fetchArticle({ commit }) {
			let article = null;
			await axios.get('http://proovitoo.twn.ee/api/article.json').then((response) => {
				article = response.data;
			});
			commit('SET_ARTICLE', article);
		},
		async fetchList({ commit }) {
			let list = null;
			await axios.get('http://proovitoo.twn.ee/api/list.json').then((response) => {
				list = response.data;
			});
			commit('SET_LIST', list);
		}
	},
	getters: {
		mainArticle(state) {
			return state.mainArticle;
		},
		listContent(state) {
			return state.listContent;
		}
	}
});
