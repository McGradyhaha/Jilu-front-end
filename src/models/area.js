/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import * as areaService from 'services/area'
import { pageModel } from './common'

const { query } = areaService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'area',

  state: {
    currentItem: {},
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/area') {
          const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.list,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },
  },

  reducers: {

    // showModal (state, { payload }) {
    //   return { ...state, ...payload, modalVisible: true }
    // },
    //
    // hideModal (state) {
    //   return { ...state, modalVisible: false }
    // },
  },
})
