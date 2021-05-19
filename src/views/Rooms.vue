<template>
    <v-main>
        <v-container>
            <h1>Список комнат</h1>
            <itemRoom :dataRooms="rooms" @clickRoom="clickRoom" />
        </v-container>

    </v-main>
</template>

<script>
    import itemRoom  from "../components/itemRoom";
    const axios = require('axios').default;

    export default {
        name: "rooms.vue",
        components:{
            itemRoom
        },
        data(){
            return{
                rooms: [],
            }
        },
        async created() {
            try {
                let request = await axios.get('https://nane.tada.team/api/rooms')
                this.rooms = request.data.result
                console.log(this.rooms)

            } catch (e) {
                console.log(e)
            }
        },
        methods:{
            clickRoom(userName){
                if(!userName){
                    return;
                }

                this.$router.push({
                    path: '/chat',
                    query: { username: userName }
                })
            }
        }
    }
</script>

<style scoped>

</style>