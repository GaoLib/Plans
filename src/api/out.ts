import request from '@/utils/request'

//使用
export function getOutList() {
	return request({
		url: '/out_list',
		method: 'get',
	});
}
