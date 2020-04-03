import router from '../router'
import store from '../store'

const whiteList: string[] = ['/login'] // no redirect 的白名单

export const permission = async () => {
    router.beforeEach(async (to: any, from: any, next: any) => {
        store.commit('get_token')
        if (store.getters.token) { 
            if (to.path === '/login') {
                next({
                    path: '/'
                });
            } else {
                if (store.getters.roles.length === 0) { 
                    const data = await store.dispatch('GetUserInfo')
                    const accessedRouters = await store.dispatch('GenerateRoutes', data)
                    router.addRoutes(accessedRouters)
                    next({ ...to, replace: true }) //set the replace: true so the navigation will not leave a history record
                } else {
                    next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
                }
            }
        } else {
            if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
                next();
            } else {
                next('/login'); // 否则全部重定向到登录页
            }
        }
    })
}