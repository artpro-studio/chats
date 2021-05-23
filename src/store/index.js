import Vue from "vue";
import Vuex from "vuex";
import auth from './modules/auth'
import chat from './modules/chat'
import rooms from './modules/rooms'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    rooms,
    chat,
  },
});
