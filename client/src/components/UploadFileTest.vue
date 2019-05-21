<template>
  <div class="container">
    <v-text-field
      prepend-icon="attach_file"
      label= "Archivo 1"
      v-on:click="$emit('click', $refs.image1.click())"
      v-model="fileName"/>
      <input
        type="file"
        multiple
        style="display: none"
        ref="image1"
        accept=".pdf"
        @change="onFilePicked">
      <!-- FILE TWO -->
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
      fileName: '',
      fileName2: '',
      fileFile: ''
    }
  },
  methods: {
    pickFile (e) {
      // e.target.id.click()
      // console.log(e.target.ref)
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.fileName = files[0].name
        if (this.fileName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.fileFile = files
        })
      } else {
        this.fileName = ''
        this.fileFile[0] = ''
      }
    },
    async submitFile () {
      const formData = new FormData()
      formData.append('FILE', this.fileFile[0])
      formData.append('FILE2', this.fileFile[1])
      formData.append('archivo1', 'ARCHIVO1')
      try {
        await AuthenticationService.servicio(
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
