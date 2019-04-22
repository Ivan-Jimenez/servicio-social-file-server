<template>
  <v-layout column>
    <v-flex>
      <v-flex xs6 offset-xs3>
        <div class="elevation-2">
          <v-toolbar flat dense>
            <v-toolbar-title>Nuevo Usuario</v-toolbar-title>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field
              label="Nombre(s)"
              v-model="name"/>
            <br>
            <v-text-field
              label="Apellido"
              v-model="lastName"/>
            <br>
            <v-text-field
              label="Correo Electrónico"
              v-model="email"/>
            <br>
            <v-text-field
              type="password"
              label="Contraseña"
              v-model="password"/>
            <br>
            <v-text-field
              type="password"
              label="Confirmar Contraseña"
              v-model="confirmPassword"/>
            <br>
            <div
              class="error"
              v-html="error"/>
            <br>
            <v-btn
              @click="register">
              Aceptar
            </v-btn>
          </div>
        </div>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: null
    }
  },
  methods: {
    async register () {

    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
