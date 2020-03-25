import { ActionTree } from 'vuex'
import { RootStateTypes } from './types'
import { login } from '@/api/login'

const actions: ActionTree<RootStateTypes, any> = {
    LoginByUsername({ commit }, userInfo) {
        const username = userInfo.username.trim()
        const param = {
            username,
            password: userInfo.password
        }
        return new Promise((resolve, reject) => {
            login(param).then((response: any) => {
                console.log(response)
                commit('set_token', response.token)
                resolve()
            }).catch((error: string) => {
                reject(error)
            });
        });
    }
      
}

export default actions
