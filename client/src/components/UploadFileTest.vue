<template>
  <div
    class="container"
  >
    <div
      class="large-12 medium-12 small-12 cell"
    >
      <label>
        File
        <input
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload()"
        />
        <button
          v-on:click="submitFile()"
        >
          Submit
        </button>
      </label>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      file: ''
    }
  },
  methods: {
    handleFileUpload () {
      // this.file = file.$refs.file.files[0]
      this.file = this.$el.querySelector('input[type=file]').$refs.file.files[0]
    },
    submitFile () {
      let formData = new FormData()
      formData.append('file', this.file)
      axios.post('http://localhost:3000/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
        .then(function () {
          console.log('success!!')
        })
        .catch(function () {
          console.log('failure!!')
        })
    }
  }
}
</script>
