/*
*
* 个人中心数据状态
*
*/
import Service from '~/plugins/axios';
import * as types from './mutation-types'

export const state = () => {
  username: '用户名'
}

export const mutations = {
  [types.TEST](state, mail = '') {
    Service.get('/', {
      params: {
        param: 1
      }
    }).then(res => {
      console.log(res.data.name)
      state.username = res.data.name
    })
  }
}