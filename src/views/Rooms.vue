<template>
    <v-main class="rooms">
        <v-container>
            <v-row>
                <v-col cols="12" sm="6">
                    <h1>Список комнат</h1>
                </v-col>
                <v-col cols="12" sm="6" class="text-end">
                    <v-btn
                            color="success"
                            class="sm_100 ml-auto mr-0"
                            @click="dialog = true"
                    >
                        Создать чат
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <itemRoom @clickRoom="clickRoom" />
                </v-col>
            </v-row>
        </v-container>
        <v-dialog
                v-model="dialog"
                class="create_room"
                width="500"
        >
            <v-card>
                <v-card-title class="headline lighten-2">
                    Создание чата
                </v-card-title>

                <v-form ref="form" v-model="valid" lazy-validation class="pa-3">
                    <v-text-field v-model="create.name" :counter="255" :rules="textRules" label="Название чата" required></v-text-field>
                    <v-text-field v-model="create.text" :counter="255" :rules="textRules" label="Первое сообщение" required></v-text-field>

                    <v-btn class="btn_full mt-5 sm-100" :disabled="!valid" color="success"  @click="createRoom">Создать</v-btn>
                </v-form>
            </v-card>
        </v-dialog>
    </v-main>
</template>

<script>
    import itemRoom  from "../components/itemRoom";

    export default {
        name: "rooms.vue",
        components:{
            itemRoom
        },
        data(){
            return{
                dialog:false,
                valid: true,
                create:{
                    name: '',
                    text: '',
                },
                rooms: [],
                textRules: [
                    v => !!v || 'Это поле должно быть заполнено',
                    v => (v && v.length <= 255 && v.length > 3) || 'Сообщение должно быть не меньше 3 и не больше 30 символов',
                ],
            }
        },
        async created() {
            try {
                this.$store.dispatch('exitChat')
                await this.$store.dispatch('Rooms')

            } catch (e) {
                console.log(e)
            }
        },
        methods:{
            clickRoom(name){
                if(!name){
                    return;
                }

                this.$router.push({
                    path: '/chat',
                    query: { room: name }
                })
            },
            createRoom(){
                const form = {
                    room: this.create.name,
                    text: this.create.text
                }
                this.$store.dispatch('createRoom', form)
                this.$router.push({
                    path: '/chat',
                    query: { room: this.create.name}
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @media screen and (max-width: 650px){
        .rooms{
            padding: 20px 0 0 0 !important;

        }
        .sm_100{
            width: 100% !important;
        }
    }
</style>