import request from '@/utils/request'

//使用
export function getFoodList() {
	return request({
		url: '/food_list',
		method: 'get',
	});
}
