<template>
    <div class="chats__content" id="chats__content">
        <v-list-item
                v-for="(item, index) in $store.state.chat.messages"
                :key="index"
                class="message"
                :class="$store.state.auth.username === item.sender.username ?['primary', 'main'] : []">
            <v-list-item-content>
                <v-list-item-title>{{item.text}}</v-list-item-title>
                <v-list-item-subtitle>
                    {{item.sender.username}}
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>

<script>
    export default {
        name: "itemChat",
        props:['dataMessages'],
        data(){
            return{
                messages: [],
            }
        },
        methods:{
          scrollChat(){
              let block = document.querySelector(".chats__content");
              block.scrollTop = block.scrollHeight;
          }
        },
        watch:{
            '$store.state.chat.messages': async function (e) {
                this.messages = await e;
                setTimeout(() => {
                    this.scrollChat();
                }, 0)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .message{
        max-width: 600px;
        background-color: #e3e3e3;
        margin-bottom: 10px;
        border-radius: 5px;
        font-size: .9em;
        &.main{
            margin-right: 0;
            margin-left: auto;
            color: #fff !important;
            &.theme--light.v-list-item{
                color: #fff !important;
            }
            .v-list-item__subtitle{
                color: #fff !important;
            }
        }
        .v-list-item__title{
            font-size: 1em;
            white-space: inherit;
        }
        .v-list-item__subtitle{
            font-size: .8em;
            margin-top: 7px;
        }
    }
</style>