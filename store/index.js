/*
*
* 根数据状态 存放全局数据和异步方法
*
*/

import * as types from './mutation-types'
import Service from '~/plugins/axios'

// global actions
export const actions = {
  getData({ commit }) {
    commit(`userinfo/${types.TEST}`)
  }
}
