<template>
  <v-layout
    column
  >
    <v-flex>
      <v-flex
        xs6
        offset-xs3
      >
        <div
          class="elevation-2"
        >
          <v-toolbar
            class="cyan darken-2"
            flat
            dense
            dark
          >
            <v-toolbar-title>
              Agregar Servicio Social
            </v-toolbar-title>
          </v-toolbar>
          <div
            class="pl-4 pr-4 pt-2 pb-2"
          >
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-container>
                <v-layout>
                  <v-flex
                    xs12
                    md6
                  >
                    <v-text-field
                      v-model="control"
                      :rules="controlRules"
                      label="N° Control"
                      requiered
                    />
                  </v-flex>
                  <v-flex
                    xs12
                    md6
                  >
                    <v-select
                      v-model="career"
                      :rules="careerRules"
                      :items="dropdownCareer"
                      label="Carrera"
                      requiered
                    />
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex
                    xs12
                    md6
                  >
                    <v-text-field
                      label="Nombre(s)"
                      v-model="name"
                      :rules="nameRules"
                      required
                    />
                  </v-flex>
                  <v-flex
                    xs12
                    md6
                  >
                    <v-text-field
                      label="Apellido"
                      v-model="lastName"
                      :rules="nameRules"
                      required
                    />
                    </v-flex>
                  </v-layout>
                  <v-text-field
                    label="Nombre del Programa"
                    v-model="programName"
                    :rules="nameRules"
                    required
                    />
                  <v-layout>
                  <v-flex
                    xs12
                    md6
                  >
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
                      min-width="290px"
                    >
                      <template
                        v-slot:activator="{ on }"
                      >
                        <v-text-field
                          v-model="startDate"
                          label="Fecha de Inicio"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="startDate"
                        no-title
                        scrollable
                      >
                        <v-spacer/>
                        <v-btn flat
                          color="primary"
                          @click="menu = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-btn
                          flat
                          color="primary"
                          @click="$refs.menu.save(startDate)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex
                    xs12
                    md6
                  >
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
                      min-width="290px"
                    >
                      <template
                        v-slot:activator="{ on }"
                      >
                        <v-text-field
                          v-model="endDate"
                          label="Fecha de Inicio"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="endDate"
                        no-title
                        scrollable
                      >
                        <v-spacer/>
                        <v-btn
                          flat
                          color="primary"
                          @click="menu2 = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-btn
                          flat
                          color="primary"
                          @click="$refs.menu2.save(endDate)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
                <div
                  class="upload"
                >
                  <slot>
                    <input
                      type="file"
                    />
                  </slot>
                  <v-btn
                    class="custom-upload"
                    @click="showUpload"
                    small
                    flat
                    color="info"
                  >
                    Agregar Archivos
                  </v-btn>
                  <small
                    :class="{ invalid: !invalid }"
                  >
                    {{ files.length }} / {{ max }} Archivos Seleccionados.
                  </small>
                  <ul
                    class="files"
                  >
                    <li
                      v-for="(file, index) in files"
                      :key="file"
                    >
                      <v-btn
                        @click="removeFile(index)"
                        small
                        flat
                        color="error"
                      >
                        <v-icon
                          center
                          dark
                        >
                          delete
                        </v-icon>
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
              </v-container>
            </v-form>
          </div>
        </div>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>

// FIXME: The file system its wroking but throws an error. Something about the
// the index value. I think?

// TODO: Find out how to get the file path.
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
      this.files.splice(index, 1)
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
    validateFiles () {
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
  },
  mounted () {
    // Find input
    this.input = this.$el.$refs.querySelector('input[type=file]')
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
