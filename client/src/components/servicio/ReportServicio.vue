<template>
  <v-layout column>
    <v-flex>
      <v-flex xs6 offset-xs3>
        <div class="elevation-2">
          <v-toolbar
            dark
            class="indigo">
            <v-toolbar-title>
              Reporte {{ form }}
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
                  -> Reporte Bimestral
                  -> Evaluación Cualitativa Institución
                  -> Autoevaluación Cualitativa Estudiante
                -->
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
                <!-- Evaluación Cualitativa Institución -->
                <v-text-field
                  prepend-icon="attach_file"
                  label="Formato de Evalución Cualitativa LLenado por la Institución"
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
                <!-- Autoevaluación Cualitativa Estudiante -->
                <v-text-field
                  prepend-icon="attach_file"
                  label="Formato de Evalución Cualitativa LLenado por la Institución"
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
                <!-- Validation Alert -->
                <v-alert
                  outline
                  :value="error"
                  type="warning">
                  {{ error }}
                </v-alert>
                <!-- Submit button -->
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
  props: ['form'],
  data () {
    return {
      // Fields validation
      valid: false,
      invalid: true,
      control: '',
      controlRules: [
        v => !!v || 'Este campo es obligatorio.',
        v => v.length === 8 || 'El núemero de control debe ser de ocho dígitos.'
      ],
      // Files stuff
      fileRules: [ v => !!v || 'Selecione un archivo.' ],
      fileName: {
        reporte: '',
        evaluacion: '',
        autoevaluacion: ''
      },
      FILE: [],
      fileIndex: {
        reporte: 0,
        evaluacion: 1,
        autoevaluacion: 2
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
      formData.append('documents', this.form)
      // Files
      formData.append('reporte', this.FILE[this.fileIndex.reporte])
      formData.append('evaluacion', this.FILE[this.fileIndex.evaluacion])
      formData.append('autoevaluacion', this.FILE[this.fileIndex.autoevaluacion])

      try {
        const response = await AuthenticationService.reporte(
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
        this.error = err.response.data.error
      }
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
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
    }
  }
}
</script>
