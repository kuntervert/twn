import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/artikkel',
		name: 'Artikkel',

		component: () => import('../components/Article.vue')
	},
	{
		path: '/list/',
		name: 'List',

		component: () => import('../components/List.vue')
	},
	{
		path: '/',
		redirect: '/list/'
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
