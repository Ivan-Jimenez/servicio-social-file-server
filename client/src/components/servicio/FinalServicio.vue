<template>
  <v-layout column>
    <v-flex>
      <v-flex xs6 offset-xs3>
        <div class="elevation-2">
          <v-toolbar
            class="indigo"
            dark>
            <v-toolbar-title>
              Reporte Final
            </v-toolbar-title>
            <v-spacer/>
            <v-btn
              to="/home"
              color="error">Cancelar
              <!-- <v-icon>close</v-icon> -->
            </v-btn>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation>
              <v-container>
                <!-- Control -->
                <v-text-field
                  v-model="control"
                  :rules="controlRules"
                  label="N° Control"/>
                <!-- FILES
                  -> Evaluación cualitativa
                  -> Evaluacion cualitativa final
                  -> Autoevaluacion cualitativa
                  -> Autoevaluación  cualitativa final
                  -> Reporte
                  -> Reporte final
                  -> Evaluación de las actividades
                  -> Carta de terminación
                -->
                <!-- Evaluacion cualitativa -->
                <v-text-field
                  prepend-icon="attach_file"
                  label="Evaluación Cualitativa por la Institución."
                  v-on:click="$emit('click', $refs.evaluacion.click())"
                  v-model="fileName.evaluacion"
                  value="fileName.evaluacion"
                  :rules="fileRules"
                  required/>
                  <input
                    type="file"
                    style="display: none"
                    ref="evaluacion"
                    accept=".pdf"
                    @change="onEvaluacionFilePicked">
                <!-- Evaluación cualitativa final -->
                <v-text-field
                  prepend-icon="attach_file"
                  label="Evaluación Cualitativa por la Institución Final."
                  v-on:click="$emit('click', $refs.evaluacionFinal.click())"
                  v-model="fileName.evaluacionFinal"
                  value="fileName.evaluacionFinal"
                  :rules="fileRules"
                  required/>
                  <input
                    type="file"
                    style="display: none"
                    ref="evaluacionFinal"
                    accept=".pdf"
                    @change="onEvaluacionFinalFilePicked">
                <!-- Autoevaluación cualitativa -->
                <v-text-field
                  prepend-icon="attach_file"
                  label="Autoevaluación Cualitativa por el Estudiante."
                  v-on:click="$emit('click', $refs.autoevaluacion.click())"
                  v-model="fileName.autoevaluacion"
                  value="fileName.autoevaluacion"
                  :rules="fileRules"
                  required/>
                  <input
                    type="file"
                    style="display: none"
                    ref="autoevaluacion"
                    accept=".pdf"
                    @change="onAutoevaluacionFilePicked">
                <!-- Autoevaluación cualitativa final -->
                <v-text-field
                  prepend-icon="attach_file"
                  label="Autoevaluación Cualitativa por el Estudiante Final."
                  v-on:click="$emit('click', $refs.autoevaluacionFinal.click())"
                  v-model="fileName.autoevaluacionFinal"
                  value="fileName.autoevaluacionFinal"
                  :rules="fileRules"
                  required/>
                  <input
                    type="file"
                    style="display: none"
                    ref="autoevaluacionFinal"
                    accept=".pdf"
                    @change="onAutoevaluacionFinalFilePicked">
                <!-- Reporte Bimestral -->
                <v-text-field
                  prepend-icon="attach_file"
                  label="Reporte Bimestral"
                  v-on:click="$emit('click', $refs.reporte.click())"
                  v-model="fileName.reporte"
                  value="fileName.reporte"
                  :rules="fileRules"
                  required/>
                  <input
                    type="file"
                    style="display: none"
                    ref="reporte"
                    accept=".pdf"
                    @change="onReporteFilePicked">
                <!-- Reporte Bimestral Final -->
                <v-text-field
                  prepend-icon="attach_file"
                  label="Reporte de Actividades Final"
                  v-on:click="$emit('click', $refs.reporteFinal.click())"
                  v-model="fileName.reporteFinal"
                  value="fileName.reporteFinal"
                  :rules="fileRules"
                  required/>
                  <input
                    type="file"
                    style="display: none"
                    ref="reporteFinal"
                    accept=".pdf"
                    @change="onReporteFinalFilePicked">
                <!-- Evaluación de las actividades -->
                <v-text-field
                  prepend-icon="attach_file"
                  label="Evaluación de las Actividades."
                  v-on:click="$emit('click', $refs.evaluacionActividades.click())"
                  v-model="fileName.evaluacionActividades"
                  value="fileName.evaluacionActividades"
                  :rules="fileRules"
                  required/>
                  <input
                    type="file"
                    style="display: none"
                    ref="evaluacionActividades"
                    accept=".pdf"
                    @change="onEvaluacionActividadesFilePicked">
                <!-- Evaluación Carta de Terminación -->
                <v-text-field
                  prepend-icon="attach_file"
                  label="Carta de Terminación."
                  v-on:click="$emit('click', $refs.cartaTerminacion.click())"
                  v-model="fileName.cartaTerminacion"
                  value="fileName.cartaTerminacion"
                  :rules="fileRules"
                  required/>
                  <input
                    type="file"
                    style="display: none"
                    ref="cartaTerminacion"
                    accept=".pdf"
                    @change="onCartaTerminacionFilePicked">
                <!-- Validatión Alert -->
                <v-alert
                  outline
                  :value="error"
                  type="warning">
                  {{ error }}
                </v-alert>
                <!-- Submit Button -->
                <v-btn
                  dark
                  color="pink"
                  v-on:click="submitFiles">
                  Aceptar
                  <!-- <v-icon right>check_circle</v-icon> -->
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
        v => v.length === 8 || 'El número de control debe de ser de ocho dígitos.'
      ],
      // Files stuff
      fileRules: [ v => !!v || 'Seleccione un archivo.' ],
      fileName: {
        evaluacion: '',
        evaluacionFinal: '',
        autoevaluacion: '',
        autoevaluacionFinal: '',
        reporte: '',
        reporteFinal: '',
        evaluacionActividades: '',
        cartaTerminacion: ''
      },
      FILE: [],
      fileIndex: {
        evaluacion: 0,
        evaluacionFinal: 1,
        autoevaluacion: 2,
        autoevaluacionFinal: 3,
        reporte: 4,
        reporteFinal: 5,
        evaluacionActividades: 6,
        cartaTerminacion: 7
      },
      error: null
    }
  },
  methods: {
    async submitFiles () {
      if (!this.validate()) {
        this.error = 'Proporcione la información solicitada.'
      }

      const formData = new FormData()
      formData.append('control', this.control)
      formData.append('documents', 'Finales')
      // Files
      formData.append('evaluacion', this.FILE[this.fileIndex.evaluacion])
      formData.append('evaluacionFinal', this.FILE[this.fileIndex.evaluacionFinal])
      formData.append('autoevaluacion', this.FILE[this.fileIndex.autoevaluacion])
      formData.append('autoevaluacionFinal', this.FILE[this.fileIndex.autoevaluacionFinal])
      formData.append('reporte', this.FILE[this.fileIndex.reporte])
      formData.append('reporteFinal', this.FILE[this.fileIndex.reporteFinal])
      formData.append('evaluacionActividades', this.FILE[this.fileIndex.evaluacionActividades])
      formData.append('cartaTerminacion', this.FILE[this.fileIndex.cartaTerminacion])

      try {
        const response = await AuthenticationService.final(
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        // this.$router.push('/home')
        console.log(response.data.message)
      } catch (err) {
        this.err = err.response.data.error
      }
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    onEvaluacionFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.fileName.evaluacion = files[0].name
        if (this.fileName.evaluacion.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.FILE[this.fileIndex.evaluacion] = files[0]
        })
      } else {
        this.fileName.evaluacion = ''
        this.FILE[this.fileIndex.evaluacion] = ''
      }
    },
    onEvaluacionFinalFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.fileName.evaluacionFinal = files[0].name
        if (this.fileName.evaluacionFinal.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.FILE[this.fileIndex.evaluacionFinal] = files[0]
        })
      } else {
        this.fileName.evaluacionFinal = ''
        this.FILE[this.fileIndex.evaluacionFinal] = ''
      }
    },
    onAutoevaluacionFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.fileName.autoevaluacion = files[0].name
        if (this.fileName.autoevaluacion.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.FILE[this.fileIndex.autoevaluacion] = files[0]
        })
      } else {
        this.fileName.autoevaluacion = ''
        this.FILE[this.fileIndex.autoevaluacion] = ''
      }
    },
    onAutoevaluacionFinalFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.fileName.autoevaluacionFinal = files[0].name
        if (this.fileName.autoevaluacionFinal.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.FILE[this.fileIndex.autoevaluacionFinal] = files[0]
        })
      } else {
        this.fileName.autoevaluacionFinal = ''
        this.FILE[this.fileIndex.autoevaluacionFinal] = ''
      }
    },
    onReporteFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.fileName.reporte = files[0].name
        if (this.fileName.reporte.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.FILE[this.fileIndex.reporte] = files[0]
        })
      } else {
        this.fileName.reporte = ''
        this.FILE[this.fileIndex.reporte] = ''
      }
    },
    onReporteFinalFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.fileName.reporteFinal = files[0].name
        if (this.fileName.reporteFinal.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.FILE[this.fileIndex.reporteFinal] = files[0]
        })
      } else {
        this.fileName.reporteFinal = ''
        this.FILE[this.fileIndex.reporteFinal] = ''
      }
    },
    onEvaluacionActividadesFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.fileName.evaluacionActividades = files[0].name
        if (this.fileName.evaluacionActividades.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.FILE[this.fileIndex.evaluacionActividades] = files[0]
        })
      } else {
        this.fileName.evaluacionActividades = ''
        this.FILE[this.fileIndex.evaluacionActividades] = ''
      }
    },
    onCartaTerminacionFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.fileName.cartaTerminacion = files[0].name
        if (this.fileName.cartaTerminacion.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.FILE[this.fileIndex.cartaTerminacion] = files[0]
        })
      } else {
        this.fileName.cartaTerminacion = ''
        this.FILE[this.fileIndex.cartaTerminacion] = ''
      }
    }
  }
}
</script>
