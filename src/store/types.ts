export interface UserState {
    token: string | null,
    routeList: string
    roles: string
    routes: any[],
    operationList: string
}

export interface CommonState {
    editStatus: boolean;
    page: string
}