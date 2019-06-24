<template>
  <v-layout column>
    <v-flex>
      <v-flex xs6 offset-xs3>
        <div class="elevation-2">
          <v-toolbar class="indigo" dark>
            <v-toolbar-title>
              Entrar
            </v-toolbar-title>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field
              label="Correo Electrónico"
              v-model="email"/>
            <br>
            <v-text-field
              type="password"
              label="Contraseña"
              v-model="password"/>
            <br>
            <v-alert
              outline
              :value="error"
              type="warning">
              {{ error }}
            </v-alert>
            <v-btn
              dark
              color="pink"
              @click="login">
              Aceptar
              <!-- <v-icon right>
                check_circle
              </v-icon> -->
            </v-btn>
          </div>
        </div>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      let email = this.email
      let password = this.password
      this.$store.dispatch('login', { email, password })
        .then(() => this.$router.push('/'))
        .catch(err => {
          console.log(err)
          this.error = err
        })
    }
  }
}
</script>
