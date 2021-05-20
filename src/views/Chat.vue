<template>
    <v-container style="height: 100%">
        <div class="chats">
            <itemChat :data-messages="messages" />
            <div class="chats__form">
                <v-form class="d-flex ">
                    <v-text-field v-model="form.text" placeholder="Ваше сообщение"></v-text-field>
                    <v-btn
                            color="success"
                            class="mr-4"
                            @click="sendMessage"
                    >
                        Отправить
                    </v-btn>
                    <v-btn
                            color="error"
                            class="mr-4"
                            @click="exitChat"
                    >
                        Выйти
                    </v-btn>
                </v-form>
            </div>
        </div>
    </v-container>
</template>

<script>
    // import SocketIO from "socket.io-client"
    // import VueSocketIO from 'vue-socket.io'

    const axios = require('axios').default;

    import itemChat from '../components/itemChat'
    import store from "../store";
    export default {
        socket:{},
        name: "Chat",
        components:{
            itemChat
        },
        data(){
          return{
              form:{
                  text: ''
              },
              chatId: '',
              messages: [],
              socket:{},
          }
        },
        async created() {
           try { if(this.$route.query.username){
               this.chatId = this.$route.query.username
               const request = await axios.get(`https://nane.tada.team/api/rooms/${this.chatId}/history`);
               if(request.data){
                   this.messages = request.data.result;
                   console.log('this.messages', request)
               }
           }

           } catch (e) {
               console.log(e)
           }
        },
        // mounted() {
        //     try {
        //         const options = { path: '/' };
        //         this.socket = new VueSocketIO({
        //             debug: true,
        //             connection: SocketIO('wss://nane.tada.team/ws?username=kozma', options), //options object is Optional
        //             vuex: {
        //                 store,
        //                 actionPrefix: "SOCKET_",
        //                 mutationPrefix: "SOCKET_"
        //             }
        //         })
        //         console.log(this.socket)
        //     } catch (e) {
        //         console.log(e)
        //     }
        // },
        methods:{
            sendMessage(){
                if(!this.form.text){
                    return;
                }
                let data = {
                    "room": 'test2', // название комнаты. Если такой комнаты нет, она будет создана
                    "text":'Привет мир', // текст сообщения
                    "id": 2 // необязательный идентификатор, можно назначить на клиенте, чтобы получить подтверждение получения сообщения сервером
                }
                this.socket.send(data)
                console.log('Отправили')
            },
            exitChat(){
                console.log('Выйти')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .chats{
        height: 100%;
        position: relative;
        &__content{
            max-height: calc(100vh - 220px);
            height: calc(100vh - 220px);
            overflow: auto;
        }
        &__form{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
        }
    }
</style>