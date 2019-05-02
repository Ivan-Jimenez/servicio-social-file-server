<template>
  <v-layout column>
    <v-flex>
      <v-flex xs6 offset-xs3>
        <div class="elevation-2">
          <v-toolbar class="cyan darken-2" flat dense dark>
            <v-toolbar-title>Agregar Servicio Social</v-toolbar-title>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field
              label="N° Control"
              v-model="textFields.control"/>
            <br>
            <v-overflow-btn
              :items="dropdownCareer"
              label="Carrera"
              v-model="textFields.career"
            ></v-overflow-btn>
            <br>
            <v-text-field
              label="nombre"
              v-model="textFields.name"/>
            <br>
            <v-text-field
              label="Nombre del Programa"
              v-model="textFields.programName"/>
            <br>
            <v-overflow-btn
              :items="dropdownStatus"
              label="Estado"
            ></v-overflow-btn>
            <br>

          <div class="upload">
            <slot><input type="file"/></slot>
            <v-btn small flat color="info" class="custom-upload" @click="showUpload">Agregar Archivos</v-btn>
            <small :class="{ invalid: !invalid }">
              {{ files.length }} / {{ max }} Archivos Seleccionados.
            </small>
            <ul class="files">
              <li v-for="(file, index) in files" :key="file">
                <v-btn small flat color="error" @click="removeFile(index)">
                  <v-icon center dark>delete</v-icon>
                </v-btn>
                {{ file.name }}
              </li>
            </ul>
          </div>

            <!-- <div
              class="error"
              v-html="error"/>
            <br> -->
            <v-btn>
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
  props: {
    max: {
      type: Number,
      default: 5
    },
    value: Array
  },
  methods: {
    /**
     * Executed, when the user selects a (or multiple) new file(s)
     * @return {void}
     */
    onFileSelection () {
      // add all selected files
      for (let file of this.input.files) {
        this.files.push({ name: file.name })
      }

      // reset file input
      this.input.value = null
    },
    /**
     * Removes the file with the given index
     * @param {number} index
     * @returns {void}
     */
    removeFile (index) {
      this.files.splice(index)
    },
    showUpload () {
      const event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      })
      console.log(event)
      this.input.dispatchEvent(event)
    }
  },
  computed: {
    valid () {
      return this.files.length <= this.max
    }
  },
  watch: {
    files (files) {
      this.$emit('input', files)
    }
  },
  data () {
    return {
      dropdownCareer: [
        'Ing. en Sistemas Computacionales',
        'Ing. Industrial',
        'Ing. en Diseño Industrial',
        'Ing. en Gestión Empresarial',
        'Lic. en Administración',
        'Arquitectura',
        'Ing. Informática'
      ],
      dropdownStatus: [
        'Activo',
        'Cancelado',
        'Terminado'
      ],
      textFields: {
        control: '',
        career: '',
        name: '',
        programName: '',
        status: '',
        error: null
      },
      // Files stuff
      files: [],
      input: null
    }
  },
  mounted () {
    // Find input
    this.input = this.$el.querySelector('input[type=file]')
    this.input.addEventListener('change', () => this.onFileSelection())
    this.input.style.display = 'none'

    // Select multiple attribute on input, if max is more than one.
    if (this.max > 1) {
      this.input.setAttribute('multiple', 'multiple')
    } else {
      this.input.removeAttribute('multiple')
    }

    // Populate internal value, if external value is given,
    // attempt to populate external value by firing event if not
    if (this.value) {
      this.files = this.value
    } else {
      this.$emit('input', [])
    }
  }
}
</script>

<style scoped>
.files {
  list-style: none;
  text-align: left;
}
</style>
