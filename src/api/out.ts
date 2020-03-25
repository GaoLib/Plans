import request from '@/utils/request'

export function getOutList() {
	return request({
		url: '/out_list',
		method: 'get',
	});
}
