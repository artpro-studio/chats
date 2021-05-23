<template>
    <div class="d-flex flex-wrap" >
        <v-list-item class="rooms__items" v-for="(item, index) in $store.state.rooms.roomsState" :key="index" color="itemChat" @click="clickRooms(item.name)">
            <v-list-item-content>
                <v-list-item-title class="title_room">{{item.name}} <span class="primary d-flex justify-center align-center">{{item.newCount}}</span></v-list-item-title>
                <v-list-item-subtitle>@{{item.last_message.sender.username}}: {{item.last_message.text | maxLength30}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>

<script>
    export default {
        name: "itemRoom.vue",
        props:['dataRooms'],
        data(){
            return{
                rooms: this.dataRooms || [],
            }
        },
        filters:{
            maxLength30(e){
                return e.substr(0, 30) + '...'
            }
        },
        watch:{
            dataRooms: function (e) {
                this.rooms = e;
            }
        },
        methods:{
            clickRooms(nameUser){
                this.$emit('clickRoom', nameUser);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .itemChat{
        flex: 1 1 25%;
    }
    .title_room{
        position: relative;
        padding-left: 25px;
        span{
            border-radius: 50%;
            color: #fff;
            width: 15px;
            height: 15px;
            position: absolute;
            top: 2px;
            left: 0px;
            font-size: 11px;
        }
    }
    @media screen and (max-width: 650px){
        .rooms{
            &__items{
                width: 100%;
            }
        }
    }
</style>