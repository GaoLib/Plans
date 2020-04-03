export interface UserState {
    token: string,
    routeList: string
    roles: string
    routes: any[],
    operationList: string
}

export interface CommonState {
    editStatus: boolean;
    page: string
}