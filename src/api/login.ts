import request from '@/utils/request'

export function login(data: any) {
	return request({
		url: '/login',
        method: 'post',
        data
	});
}

export function userInfoAdmin() {
	return request({
		url: '/user_info_admin',
        method: 'get'
	});
}

export function userInfoUser() {
	return request({
		url: '/user_info_user',
        method: 'get'
	});
}