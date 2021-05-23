<template>
    <v-main>
        <v-card max-width="374" class="pa-6 ml-auto mr-auto" v-if="$store.state.auth.username === null">
            <v-card-title>Авторизация</v-card-title>
            <v-card-subtitle>Чтобы авторизоватся введите ваше Login</v-card-subtitle>
            <v-form ref="form" v-model="valid" lazy-validation class="pa-3" @submit.prevent="validate">
                <v-text-field v-model="name" :counter="30" :rules="nameRules" label="Логин" required></v-text-field>

                <v-btn class="btn_full mt-5" :disabled="!valid" color="success" @click="validate">Войти</v-btn>
            </v-form>
        </v-card>
        <v-card max-width="374" class="pa-6 ml-auto mr-auto" v-else>
            <v-card-title>Вы уже авторизованы</v-card-title>
            <v-form ref="form" v-model="valid" lazy-validation class="pa-3">
                <v-btn class="btn_full mt-5" :disabled="!valid" color="success"  @click="toRooms">Войти</v-btn>
            </v-form>
        </v-card>
    </v-main>

</template>

<script>
    export default {
        name: "auth.vue",
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Это поле должно быть заполнено',
                v => (v && v.length <= 30 && v.length > 5) || 'Login должно быть не меньше 5 и не больше 30 символов',
            ],
        }),

        methods: {
            async validate () {
                const isforms = this.$refs.form.validate()
                if(!isforms){
                    return;
                }

                await this.$store.dispatch('addUser', this.name)
                this.$router.push({
                    path: 'rooms',
                })
            },
            toRooms(){
                this.$router.push({
                    path: 'rooms',
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .btn_full{
        width: 100%;
    }
</style>