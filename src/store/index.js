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
			list.list.forEach((e) => {
				e.personal_code = getDateFromSSN(e.personal_code);
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

function getDateFromSSN(code) {
	let formattedCode = null;
	let firstNumber = String(code).charAt(0);
	if (firstNumber == 5 || firstNumber == 6) {
		formattedCode =
			'20' +
			String(code).charAt(1) +
			String(code).charAt(2) +
			'.' +
			String(code).charAt(3) +
			String(code).charAt(4) +
			'.' +
			String(code).charAt(5) +
			String(code).charAt(6);
	} else if (firstNumber == 3 || firstNumber == 4) {
		formattedCode =
			'19' +
			String(code).charAt(1) +
			String(code).charAt(2) +
			'.' +
			String(code).charAt(3) +
			String(code).charAt(4) +
			'.' +
			String(code).charAt(5) +
			String(code).charAt(6);
	}
	return formattedCode;
}
