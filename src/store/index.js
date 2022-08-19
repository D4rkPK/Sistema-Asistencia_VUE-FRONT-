import Vue from 'vue'
import Vuex from 'vuex'
import services from './services'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    services,
  }
},

state = getDefaultState,

getters = {
  services: state => state.services,
}

export default new Vuex.Store({
  state,
  getters,
})
