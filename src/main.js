import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
Vue.config.productionTip = false;




const options = { path: '/' }; //Options object to pass into SocketIO

Vue.use(new VueSocketIO({
      debug: true,
      connection: SocketIO('wss://nane.tada.team/ws?username=test2', options), //options object is Optional
      vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_"
      }
    })
);


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
