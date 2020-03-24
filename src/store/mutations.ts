import { MutationTree  } from 'vuex'
import { RootStateTypes } from './types'

const mutations: MutationTree<RootStateTypes> = {
	EDIT_DETAILS(state: any, name: boolean) {
		state.editStatus = name;
	},
	SAVE(state: any, name: boolean) {
		state.editStatus = name
	}
}

export default mutations