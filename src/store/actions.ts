import { ActionTree } from 'vuex'
import { RootStateTypes } from './types'

const actions: ActionTree<RootStateTypes, any> = {
	EDIT_DETAILS({ commit }, name: string) {
	  	commit('Edit_Details', name);
	},
	save({commit}, name: string) {
		commit('Save',name)
	}
}

export default actions
