<template>
    <div class="d-flex flex-wrap">
        <v-list-item v-for="(item, index) in rooms" :key="index" color="itemChat" @click="clickRooms(item.name)">
            <v-list-item-content>
                <v-list-item-title>{{item.name}}</v-list-item-title>
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
</style>