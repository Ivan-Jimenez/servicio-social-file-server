<template>
  <div class="container">
    <v-text-field
      prepend-icon="attach_file"
      label= "Archivo 1"
      @click="pickFile"
      v-model="FILE_NAME[0]"/>
      <input
        type="file"
        style="display: none"
        ref="image"
        accept=".pdf"
        @change="onFilePicked">
      <!-- FILE TWO -->
      <v-text-field
        prepend-icon="attach_file"
        label="Archivo 2"
        v-on:click="$emit('click', $refs.image1.click())"
        @click="pickFile"
        v-model="FILE_NAME[1]"/>
        <input
          type="file"
          style="display: none"
          ref="image1"
          accept=".pdf"
          @change="onFilePicked">
      <v-btn @click="submitFile">
        Aceptar
      </v-btn>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'
// const axios = require('axios')
export default {
  data () {
    return {
      FILE_NAME: [
        'Archivo 1->fucker',
        'Archivo 2->fucker'
      ],
      FILE: []
    }
  },
  methods: {
    pickFile (e) {
      // e.target.id.click()
      console.log(e.target.ref)
    },
    onFilePicked (e) {
      console.log('dsadasdsa')
      const files = e.target.files
      if (files[0] !== undefined) {
        this.FILE_NAME = files[0].name
        if (this.FILE_NAME.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.FILE = files[0]
          console.log(this.FILE)
        })
      } else {
        this.FILE_NAME = ''
        this.FILE = ''
      }
    },
    handleFileUpload () {
      // this.file = file.$refs.file.files[0]
      this.file = this.$refs.FILE.files[0]
      // this.file[1] = this.$refs.file2.files[0]
    },
    submitFile () {
      console.log(this.FILE.name)
      const formData = new FormData()
      formData.append('FILE', this.FILE)
      formData.append('FILE_NAME', this.FILE_NAME)
      try {
        AuthenticationService.servicio(
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        // console.log(response.data.message)
      } catch (err) {
        console.log(err.message)
      }
    }
  }
}
</script>
