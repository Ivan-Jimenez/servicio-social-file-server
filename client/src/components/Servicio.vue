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
                <!-- FILES
                  -> Solicitud
                  -> Plan de trabajo
                  -> Carta compromiso
                  -> Carta asignación
                 -->
                <v-text-field
                  prepend-icon="attach_file"
                  label= "Archivos"
                  v-on:click="$emit('click', $refs.files.click())"
                  v-model="fileName"/>
                  <input
                    multiple
                    type="file"
                    style="display: none"
                    ref="files"
                    accept=".pdf"
                    @change="onFilesPicked">
                <!-- Submit button -->
                <v-btn
                  v-on:click="submitFiles">
                  Aceptar
                  <v-icon right>check_circle</v-icon>
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

import AuthenticationService from '../services/AuthenticationService'
export default {
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
      fileName: '',
      FILE: []
    }
  },
  methods: {
    onFilesPicked (e) {
      console.log('fuck!!!!')
      const files = e.target.files
      if (files[0] !== undefined) {
        console.log(files[0].name)
        this.fileName = files[0].name
        if (this.fileName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.FILE = files
        })
      } else {
        this.fileName = ''
        this.FIlE = ''
      }
    },
    async submitFiles () {
      const formData = new FormData()
      formData.append('file1', this.FILE[0])
      formData.append('file2', this.FILE[1])
      try {
        await AuthenticationService.servicio(
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
      } catch (err) {
        console.log(err.message)
      }
    }
  }
}
</script>

<style scoped>

</style>
