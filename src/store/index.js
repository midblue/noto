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
			saveToStorage(state.containers)
		},
		updateContainerCoords (state, payload) {
			state.containers[payload.id].x = payload.x
			state.containers[payload.id].y = payload.y
			saveToStorage(state.containers)
		},
		movePane (state, payload) {
			console.log(payload)
		}
	}
})

function saveToStorage (object) {
	const toStore = JSON.stringify(object)
	window.localStorage.setItem('containers', toStore)
}