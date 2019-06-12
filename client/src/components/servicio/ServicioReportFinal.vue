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
              Reporte Final
            </v-toolbar-title>
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
              </v-container>
            </v-form>
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
        this.fileName
      }
    }
  }
}
</script>
