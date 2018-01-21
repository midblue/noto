import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		containers: load('containers'),
		panes: load(),
		textChangeFlag: false,
	},
	mutations: {
		naiveSet (state, payload) {
			for (let p in payload) {
				state[p] = payload[p]
			}
			save(state.containers, 'containers')
			save(state.panes)
		},
		newContainer (state) {
			const id = 'c' + Date.now()
			Vue.set(state.containers, id, { x: 100, y: 20, panes:[] })
      save(state.containers, 'containers')
		},
		updateContainer (state, payload) {
			for (let p in payload) {
				state.containers[payload.containerID][p] = payload[p]
			}
			save(state.containers, 'containers')
		},
		deleteContainer (state, containerID) {
			const newContainers = Object.assign({}, state.containers)
			delete newContainers[containerID]
			state.containers = newContainers
			save(state.containers)
		},
		newPane (state, containerID) {
			const id = 'p' + Date.now()
			Vue.set(state.panes, id, {
		    paneID: id,
		    content: 'new',
		    containerID: containerID,
		  })
		  save(state.panes)
		},
		updatePane (state, payload) {
			for (let p in payload) {
				state.textChangeFlag = (p === 'contents' || p === 'title')
				state.panes[payload.paneID][p] = payload[p]
			}
			save(state.panes)
		},
		movePane (state, payload) {
			state.panes[payload.paneID].container = payload.containerID
			save(state.panes)
		},
		deletePane (state, paneID) {
			const newPanes = Object.assign({}, state.panes)
			delete newPanes[paneID]
			state.panes = newPanes
			save(state.panes)
		},
	}
})

function save (object, type = 'panes') {
	const toStore = JSON.stringify(object)
	window.localStorage.setItem(type, toStore)
}

function load (type = 'panes') {
	let stored = window.localStorage.getItem(type)
	if (stored === 'undefined' || !stored) return {}
	return JSON.parse(stored)
}

