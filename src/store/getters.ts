const getters = {
	editStatus: (state: any) => state.common.editStatus,
    page: (state: any) => state.common.page,
    token: (state: any) => state.user.token,
	routeList: (state: any) => state.user.routeList,
	roles: (state: any) => state.user.roles,
	routes: (state: any) => state.user.routes,
	operationList: (state: any) => state.user.operationList
}

export default getters