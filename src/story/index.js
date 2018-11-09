import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)
window.Promise = Promise;

const state = {
  history:[],
  startHash:-1,
  moveItem:{},
  selectHash:-1,
  deleteHash:-1,
  activeHash:-1,
  activeDirection:'top',
};
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
