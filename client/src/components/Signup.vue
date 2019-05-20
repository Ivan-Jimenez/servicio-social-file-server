<template>
  <v-layout
    column>
    <v-flex>
      <v-flex
        xs6
        offset-xs3>
        <div
          class="elevation-2">
          <v-toolbar
            class="cyan darken-2"
            flat
            dense
            dark>
            <v-toolbar-title>
              Nuevo Usuario
            </v-toolbar-title>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation>
              <v-container>
                <v-layout>
                  <v-flex
                    xs12
                    md6>
                    <v-text-field
                      v-model="name"
                      :rules="nameRules"
                      label="Nombre(s)"
                      required/>
                  </v-flex>
                  <v-flex
                    xs12
                    md6>
                    <v-text-field
                      v-model="lastName"
                      :rules="nameRules"
                      label="Apellido"
                      required/>
                  </v-flex>
                </v-layout>
                <v-text-field
                  label="Correo Electrónico"
                  v-model="email"
                  :rules="emailRules"
                  required/>
                <br>
                <v-text-field
                  type="password"
                  label="Contraseña"
                  v-model="password"
                  required/>
                <br>
                <v-text-field
                  type="password"
                  label="Confirmar Contraseña"
                  v-model="confirmPassword"
                  :rules="confirmPasswordRules"
                  required/>
                <br>
                <v-alert
                  outline
                  :value="error"
                  type="warning">
                  {{ error }}
                </v-alert>
                <v-btn
                  @click="register">
                  Aceptar
                  <v-icon right>
                    check_circle
                  </v-icon>
                </v-btn>
              </v-container>
            </v-form>
          </div>
        </div>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      valid: false,
      name: '',
      lastName: '',
      nameRules: [
        v => !!v || 'Este campo es obligatorio'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Ingrese una cuenta de E-mail',
        v => /.+@.+/.test(v) || 'El E-mail debe ser valido'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Ingrese una contraseña',
        v => (/^[a-zA-Z0-9]{8,32}$/.test(v) && v.length >= 8) ||
              'La contraseña debe ser mayor a 8 caracteres, letras y numeros'
      ],
      confirmPassword: '',
      confirmPasswordRules: [
        v => v === this.password || 'Las contraseñas no coinciden'
      ],
      error: null
    }
  },
  methods: {
    async register () {
      this.validate()
      try {
        const response = await AuthenticationService.register({
          name: this.name,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        })
        this.$router.push('/login')
        console.log(response.data.message)
      } catch (err) {
        this.success = false
        this.error = err.response.data.error
      }
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    }
  }
}
</script>
