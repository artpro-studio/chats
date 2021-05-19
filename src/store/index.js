import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
  },
  mutations: {
    setUser(state, username){
      state.username = username
    },
    cleaUser(state){
      state.username = ''
    }
  },
  actions: {
    addUser({commit}, username){
      commit('setUser', username)
    },
    clearUser({commit}){
      commit('cleaUser')
    }
  },
  getters:{
    isAuth(state){
      return state.username
    }
  },
  modules: {},
});
