import { CommonState } from '../types'
import { MutationTree  } from 'vuex'

const state: CommonState = {
    editStatus: false,
    page: ''
}

const mutations: MutationTree<CommonState> = {
	change_edit_state(state: any, editStatus: boolean) {
		state.editStatus = editStatus
	},
	set_page(state: any, page: string){
		state.page = page
	}
}

export default {
    state,
    mutations
}