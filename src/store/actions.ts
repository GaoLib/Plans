import { ActionTree } from 'vuex'
import { RootStateTypes } from './types'

const actions: ActionTree<RootStateTypes, any> = {
	edit_detail({ commit }, name: boolean) {
	  	commit('EDIT_DETAILS', name);
	},
	save({commit}, name: boolean) {
		commit('SAVE',name)
	}
}

export default actions
