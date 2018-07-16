import { request, config } from 'utils'

const { api } = config
const { area } = api

export function query (params) {
  return request({
    url: area,
    method: 'get',
    data: params,
  })
}
