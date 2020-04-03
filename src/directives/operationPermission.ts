
import { DirectiveOptions } from 'vue'
import store from '@/store'

export const permission: DirectiveOptions =  {
    bind(el: any, operation: any) {
        let adminFlag = store.getters.roles.split(',').find((role: string) => { return role === 'admin'})
        let opeFlag = store.getters.operationList.split(',').find((item: string) => { return item === operation.value})
        if(!opeFlag && !adminFlag){
            el.style.display = 'none'
        }
    },
    update(el: any, operation: any){
        let adminFlag = store.getters.roles.split(',').find((role: string) => { return role === 'admin'})
        let opeFlag = store.getters.operationList.split(',').find((item: string) => { return item === operation.value})
        if(!opeFlag && !adminFlag){
            el.style.display = 'none'
        } else {
            el.style.display = 'block'
        }
    }
}