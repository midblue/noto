import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		containers: {}
	},
	mutations: {
		naiveSet (state, payload) {
			for (let p in payload) {
				state[p] = payload[p]
			}
		},
		updatePane (state, payload) {
			state.containers[payload.id].panes[payload.index] = payload.content
			const toStore = JSON.stringify(state.containers)
			window.localStorage.setItem('containers', toStore)
		}
	}
})