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
                 <!-- Solicitud -->
                <v-text-field
                  prepend-icon="attach_file"
                  label= "Solicitud"
                  v-on:click="$emit('click', $refs.solicitud.click())"
                  v-model="fileName.solicitud"
                  value="fileName.solicitud"
                  :rules="fileRules"
                  required/>
                  <input
                    type="file"
                    style="display: none"
                    ref="solicitud"
                    accept=".pdf"
                    @change="onSolicitudFilePicked">
                  <!-- Plan de Trabajo -->
                  <v-text-field
                    prepend-icon="attach_file"
                    label= "Plan de Trabajo"
                    v-on:click="$emit('click', $refs.planTrabajo.click())"
                    v-model="fileName.planTrabajo"
                    :rules="fileRules"
                    required/>
                    <input
                      type="file"
                      style="display: none"
                      ref="planTrabajo"
                      accept=".pdf"
                      @change="onPlanTrabajoFilePicked">
                  <!-- Carta Compromiso -->
                  <v-text-field
                    prepend-icon="attach_file"
                    label= "Carta Compromiso"
                    v-on:click="$emit('click', $refs.cartaCompromiso.click())"
                    v-model="fileName.cartaCompromiso"
                    :rules="fileRules"
                    required/>
                    <input
                      type="file"
                      style="display: none"
                      ref="cartaCompromiso"
                      accept=".pdf"
                      @change="onCartaCompromisoFilePicked">
                  <!-- Carta Asignación -->
                  <v-text-field
                    prepend-icon="attach_file"
                    label= "Carta Asignación"
                    v-on:click="$emit('click', $refs.cartaAsignacion.click())"
                    v-model="fileName.cartaAsignacion"
                    :rules="fileRules"
                    required/>
                    <input
                      type="file"
                      style="display: none"
                      ref="cartaAsignacion"
                      accept=".pdf"
                      @change="onCartaAsignacionFilePicked">
                <!-- Validation alert -->
                <v-alert
                  outline
                  :value="error"
                  type="warning">
                  {{ error }}
                </v-alert>
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
import AuthenticationService from '../../services/AuthenticationService'
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
      nameRules: [ v => !!v || 'Este campo no puede estar vacío.' ],
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
      fileRules: [ v => !!v || 'Seleccione un archivo.' ],
      fileName: {
        solicitud: '',
        planTrabajo: '',
        cartaCompromiso: '',
        cartaAsignacion: ''

      },
      FILE: [],
      fileIndex: {
        solicitud: 0,
        planTrabajo: 1,
        cartaCompromiso: 2,
        cartaAsignacion: 3
      },
      error: null
    }
  },
  methods: {
    async submitFiles () {
      if (!this.validate()) {
        this.error = 'Proporcione la información solicitada!'
      }
      const formData = new FormData()
      // Fields
      formData.append('control', this.control)
      formData.append('career', this.career)
      formData.append('name', this.name)
      formData.append('lastName', this.lastName)
      formData.append('programName', this.programName)
      formData.append('startDate', this.startDate)
      formData.append('endDate', this.endDate)
      // Files
      formData.append('solicitud', this.FILE[0])
      formData.append('planTrabajo', this.FILE[this.fileIndex.planTrabajo])
      formData.append('cartaCompromiso', this.FILE[this.fileIndex.cartaCompromiso])
      formData.append('cartaAsignacion', this.FILE[this.fileIndex.cartaAsignacion])
      try {
        const response = await AuthenticationService.servicio(
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        this.$router.push('/home')
        console.log(response.data.message)
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    // TODO: Find a better way to manage the file pick.
    onSolicitudFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.fileName.solicitud = files[0].name
        if (this.fileName.solicitud.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.FILE[this.fileIndex.solicitud] = files[0]
        })
      } else {
        this.fileName.solicitud = ''
        this.FIlE[this.fileIndex.solicitud] = ''
      }
    },
    onPlanTrabajoFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.fileName.planTrabajo = files[0].name
        if (this.fileName.planTrabajo.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.FILE[this.fileIndex.planTrabajo] = files[0]
        })
      } else {
        this.fileName.planTrabajo = ''
        this.FIlE[this.fileIndex.planTrabajo] = ''
      }
    },
    onCartaCompromisoFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.fileName.cartaCompromiso = files[0].name
        if (this.fileName.cartaCompromiso.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.FILE[this.fileIndex.cartaCompromiso] = files[0]
        })
      } else {
        this.fileName.cartaCompromiso = ''
        this.FIlE[this.fileIndex.cartaCompromiso] = ''
      }
    },
    onCartaAsignacionFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.fileName.cartaAsignacion = files[0].name
        if (this.fileName.cartaAsignacion.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.FILE[this.fileIndex.cartaAsignacion] = files[0]
        })
      } else {
        this.fileName.cartaAsignacion = ''
        this.FIlE[this.fileIndex.cartaAsignacion] = ''
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

<style scoped>

</style>
