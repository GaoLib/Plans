import request from '@/utils/request'

export function getFoodList() {
	return request({
		url: '/food_list',
		method: 'get',
	});
}
