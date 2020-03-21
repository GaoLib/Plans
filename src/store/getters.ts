import { GetterTree } from 'vuex'
import { RootStateTypes } from './types'

const getters: GetterTree<RootStateTypes, any> = {
    editStatus: (state: any) => state.editStatus
}

export default getters