import { MutationTree  } from 'vuex'
import { RootStateTypes } from './types'

const mutations: MutationTree<RootStateTypes> = {
	change_edit_state(state: any) {
		state.editStatus = !state.editStatus
	},
	set_token(state: any, token: string) {
		state.token = token
		sessionStorage.setItem('token',token)
	}
}

export default mutations