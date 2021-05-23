<template>
    <v-container style="height: 100%">
        <div class="chats">
            <itemChat />
            <div class="chats__form">
                <v-form class="d-flex" @submit.prevent="sendMessage">
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

    import itemChat from '../components/itemChat'
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
              roomID: this.$route.query.room,
              oldMessags:[],
          }
        },
        async created() {
           try {
               if(this.$route.query.room){
                   this.$store.dispatch('allMessages', this.roomID)
                   this.$store.dispatch('resetCount', this.roomID)
               }

           } catch (e) {
                console.log(e)
           }
        },
        methods:{
            sendMessage(){
                if(!this.form.text){
                    return;
                }
                let data = {
                    "room": this.roomID, // название комнаты. Если такой комнаты нет, она будет создана
                    "text": this.form.text, // текст сообщения
                    "id": this.$store.state.auth.username
                }

                this.$store.dispatch('sendMessage', data)

                this.form.text = ''
                console.log('Отправили')
            },
            exitChat(){
                this.$store.dispatch('exitChat')
                this.$router.push({
                    path: '/rooms',
                })

            },
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
    @media screen and (max-width: 650px){
        .chats{
            &__form{
                form{
                    flex-wrap: wrap;
                }
            }
        }
    }
</style>