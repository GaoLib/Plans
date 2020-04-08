import { CommonState } from '../types'
import { MutationTree  } from 'vuex'

const state: CommonState = {
    editStatus: false,
    page: ''
}

const mutations: MutationTree<CommonState> = {
	change_edit_state(state: CommonState, editStatus: boolean) {
		state.editStatus = editStatus
	},
	set_page(state: CommonState, page: string){
		state.page = page
	}
}

export default {
    state,
    mutations
}