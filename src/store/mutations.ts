import { MutationTree  } from 'vuex'
import { RootStateTypes } from './types'
import { constantRouterMap } from '@/router/router'

const mutations: MutationTree<RootStateTypes> = {
	change_edit_state(state: any) {
		state.editStatus = !state.editStatus
	},
	set_token(state: any, token: string) {
		state.token = token
		sessionStorage.setItem('token',token)
	},
	get_token(state: any){
		state.token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''
	},
	set_routes(state: any, addRoutes: any[]){
		state.routes = constantRouterMap.concat(addRoutes)
	},
	set_route_list(state: any, routes: string){
		state.routeList = routes 
	},
	set_roles(state: any, roles: string){
		state.roles = roles
	}
}

export default mutations