<template>
  <v-layout column>
    <v-flex>
      <v-flex xs6 offset-xs3>
        <div class="elevation-2">
          <v-toolbar
            class="cyan darken-2"
            flat
            dense
            dark>
            <v-toolbar-title>
              Agregar Servicio Social
            </v-toolbar-title>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation>
              <v-container>
                <v-layout>
                  <!-- Control -->
                  <v-flex xs12 md6>
                    <v-text-field
                      v-model="control"
                      :rules="controlRules"
                      label="N° Control"
                      requiered/>
                  </v-flex>

                  <!-- Career -->
                  <v-flex xs12md6>
                    <v-select
                      v-model="career"
                      :rules="careerRules"
                      :items="dropdownCareer"
                      label="Carrera"
                      requiered/>
                  </v-flex>
                </v-layout>
                <v-layout>

                  <!-- Name -->
                  <v-flex xs12 md6>
                    <v-text-field
                      label="Nombre(s)"
                      v-model="name"
                      :rules="nameRules"
                      required/>
                  </v-flex>

                  <!-- Last name -->
                  <v-flex xs12 md6>
                    <v-text-field
                      label="Apellido"
                      v-model="lastName"
                      :rules="nameRules"
                      required/>
                    </v-flex>
                  </v-layout>

                  <!-- Program -->
                  <v-text-field
                    label="Nombre del Programa"
                    v-model="programName"
                    :rules="nameRules"
                    required/>
                  <v-layout>
                  <!-- Start date -->
                  <v-flex xs12 md6>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="startDate"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px">
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="startDate"
                          label="Fecha de Inicio"
                          prepend-icon="event"
                          readonly
                          v-on="on"/>
                      </template>
                      <v-date-picker
                        v-model="startDate"
                        no-title
                        scrollable>
                        <v-spacer/>
                        <v-btn
                          flat
                          color="primary"
                          @click="menu = false">
                          Cancelar
                        </v-btn>
                        <v-btn
                          flat
                          color="primary"
                          @click="$refs.menu.save(startDate)">
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex> <!-- end start date -->
                  <!-- Start end date -->
                  <v-flex xs12 md6>
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="endDate"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px">
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="endDate"
                          label="Fecha de Termino"
                          prepend-icon="event"
                          readonly
                          v-on="on"/>
                      </template>
                      <v-date-picker
                        v-model="endDate"
                        no-title
                        scrollable>
                        <v-spacer/>
                        <v-btn
                          flat
                          color="primary"
                          @click="menu2 = false">
                          Cancelar
                        </v-btn>
                        <v-btn
                          flat
                          color="primary"
                          @click="$refs.menu2.save(endDate)">
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex><!-- End end date  -->
                </v-layout>

                <label> Solicitud:</label>
                <input
                  type="file"
                  name="solicitud"
                  id="solicitud"
                  v-on:change="handleFileUpload()">
                <br>
                <label>Plan de Trabajo:</label>
                <input
                  type="file"
                  id="planTrabajo"
                  name="planTrabajo"
                  ref="planTrabajo"
                  v-on:change="handleFileUpload()"/>
                  <br>

                <label>Carta Compromiso:</label>
                <input
                  type="file"
                  id="cartaCompromiso"
                  name="cartaCompromiso"
                  ref="cartaCompromiso"
                  v-on:change="handleFileUpload()"/>
                  <br>

                <label>Carta Asignación:</label>
                <input
                  type="file"
                  id="carataAsignacion"
                  name="carataAsignacion"
                  ref="aplication"
                  v-on:change="handleFileUpload()"/>
                  <br>
                <!-- <div
                  class="error"
                  v-html="error"/>
                <br> -->
                <v-btn
                  v-on:click="submitFiles()">
                  Aceptar
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

// FIXME: The file system its working but throws an error. Something about the
// the index value. I think?

// TODO: Find out how to get the file path.

const axios = require('axios')
export default {
  methods: {
    handleFileUpload () {
      // FIXME: Find a better for doing this
      this.files.push(this.$refs.solicitud.files[0])
      this.files.push(this.$refs.planTrabajo.files[0])
      this.files.push(this.$refs.cartaCompromiso.files[0])
      this.files.push(this.$refs.cartaAsignacion.files[0])
    },
    submitFiles () {
      let formData = new FormData()
      formData.append('file', this.files)
      axios.post('http://localhost:3000/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          console.log('success!!')
        })
        .catch(() => {
          console.log('failure!!')
        })
    }
  },
  data () {
    return {
      // Fields validation
      valid: false,
      invalid: true,
      control: '',
      controlRules: [
        v => !!v || 'Este campo es obligatorio.',
        v => v.length === 8 || 'El número de control debe ser de ocho caracteres.'
      ],
      career: '',
      careerRules: [ v => !!v || 'Debe seleccionar una carrera.' ],
      name: '',
      lastName: '',
      nameRules: [ v => 'Este compo no puede estar vacío.' ],
      programName: '',
      startDate: new Date().toISOString().substring(0, 10),
      endDate: new Date().toISOString().substring(0, 10),
      menu: false,
      menu2: false,
      dropdownCareer: [
        'Ing. en Sistemas Computacionales',
        'Ing. Industrial',
        'Ing. en Diseño Industrial',
        'Ing. en Gestión Empresarial',
        'Lic. en Administración',
        'Arquitectura',
        'Ing. Informática'
      ],
      // Files stuff
      files: [],
      input: null
    }
  }
}
</script>

<style scoped>

</style>
