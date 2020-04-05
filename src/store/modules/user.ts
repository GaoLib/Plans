import { UserState } from '../types'
import { MutationTree, ActionTree  } from 'vuex'
import { constantRouterMap } from '@/router/router'
import { login, userInfoAdmin, userInfoUser, logout } from '@/api/login'
import { asyncRouterMap } from '@/router/router'
import store from '..'

const state: UserState = {
    token: '', 
    routeList: '',
    roles: '',
    routes: [],
    operationList: ''
}

const mutations: MutationTree<UserState> = {
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
	},
	set_operation_list(state: any, operationList: string){
		state.operationList = operationList
    },
    reset_user(state: any){
        state.token = ''
        state.routes = []
        state.routeList = ''
        state.roles = ''
        state.operationList = ''
        sessionStorage.removeItem('token')
    }
}

function filterAsyncRouter(asyncRouters: any, routeNames: any) {
	return asyncRouters.reduce((prevArr: any[], curVal: any) => {  
		let obj: any = {}
		let findFlag = routeNames.find((name: any) => {
			return name === curVal.name || curVal.path === '*'
		})
		if (!!findFlag) {
			obj = curVal
			if (obj.children) {
				obj.children = filterAsyncRouter(curVal.children, routeNames)
			}
		}
		
		return findFlag ? prevArr.concat(obj) : prevArr
	}, [])
}

const actions: ActionTree<UserState, any> = {
    LoginByUsername({ commit }, userInfo) {
        const username = userInfo.username.trim()
        const param = {
            username,
            password: userInfo.password
        }
        return new Promise((resolve, reject) => {
            login(param).then((response: any) => {
                commit('set_token', response.token)
                resolve()
            }).catch((error: string) => {
                reject(error)
            });
        });
    },
    GetUserInfo({ commit }) {
        return new Promise((resolve, reject) => {
            userInfoUser().then((res: any) => {
                let routeList = '', roles = '', operationList = ''
                res.data.map((item: any, index: number) => {
                    roles += index === res.data.length - 1 ? item.role : item.role + ','
                    routeList += index === res.data.length - 1 ? item.routeList : item.routeList + ','
                    operationList += index === res.data.length - 1 ? item.operationList : item.operationList + ','
                })
                commit('set_route_list', routeList)
                commit('set_roles', roles)
                commit('set_operation_list', operationList)
                resolve(res.data)
            }).catch((error: string) => {
                reject(error)
            });
        });
    },
    GenerateRoutes({ commit }, permission: any){
        return new Promise((resolve, reject) => {
            let accessedRouters, menus
            let isAdmin = permission.find((item: any) => item.role === 'admin')
            if(!!isAdmin){
                accessedRouters = asyncRouterMap
            } else {
                menus = store.getters.routeList.split(',')
                accessedRouters = filterAsyncRouter(asyncRouterMap, Array.from(new Set(menus)))
            }
            commit('set_routes', accessedRouters.push({ path: '*', redirect: '/404' })) // 一定要最后加载
			resolve(accessedRouters)
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                commit('reset_user')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
}

export default {
    state,
    mutations,
    actions
}