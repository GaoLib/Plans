import request from '@/utils/request'

//使用
export function getTripList() {
	return request({
		url: '/trip_list',
		method: 'get',
	});
}
