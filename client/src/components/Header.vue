<template>
  <v-toolbar fixed class="cyan darken-2" dark>
    <v-toolbar-title
      class="mr-4">
      <span
        class="home"
        @click="navigateTo({name: 'home'})">
        Posgrado
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>M.C. Arturo Legarda</v-btn>
      <v-btn flat>Salir</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
</style>
