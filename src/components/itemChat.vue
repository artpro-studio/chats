<template>
    <div class="chats__content" id="chats__content">
        <v-list-item v-for="(item, index) in messages" :key="index" class="message" :class="{main: $store.state.username === item.room}">
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
        mounted() {
            this.scrollChat();
        },
        methods:{
          scrollChat(){
              let block = document.querySelector(".chats__content");
              block.scrollTop = block.scrollHeight;
          }
        },
        watch:{
            dataMessages: async function (e) {
                this.messages = await e;
                this.scrollChat();
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