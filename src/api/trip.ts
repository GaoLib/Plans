import request from '@/utils/request'

export function getTripList() {
	return request({
		url: '/trip_list',
		method: 'get',
	});
}
