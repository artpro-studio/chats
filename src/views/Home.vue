<template>
  <v-app>
    <v-main>
      <AuthForm/>
    </v-main>
  </v-app>
</template>

<script>
import AuthForm from '../components/auth'
export default {
  name: "Home",
  components:{
    AuthForm
  }
};
</script>
