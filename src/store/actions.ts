import { ActionTree } from 'vuex'
import { RootStateTypes } from './types'
import { login, userInfoAdmin, userInfoUser } from '@/api/login'
import { asyncRouterMap } from '@/router/router'
import store from '.'

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

const actions: ActionTree<RootStateTypes, any> = {
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
            userInfoAdmin().then((res: any) => {
                let routeList = '', roles = ''
                res.data.map((item: any, index: number) => {
                    roles += index === res.data.length - 1 ? item.role : item.role + ','
                    routeList += index === res.data.length - 1 ? item.routeList : item.routeList + ','
                })
                commit('set_route_list', routeList)
                commit('set_roles', roles)
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
                menus = store.state.routeList.split(',')
                accessedRouters = filterAsyncRouter(asyncRouterMap, Array.from(new Set(menus)))
            }
            commit('set_routes', accessedRouters.push({ path: '*', redirect: '/404' })) // 一定要最后加载
			resolve(accessedRouters)
        })
    }  
}

export default actions
