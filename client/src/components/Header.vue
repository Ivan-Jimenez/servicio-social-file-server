<template>
  <v-toolbar fixed class="deep-purple darken-3" dark>
    <v-toolbar-title
      class="mr-4">
      <span
        class="home"
        @click="navigateTo({name: 'home'})">
        Posgrado
      </span>
    </v-toolbar-title>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn to="/" flat>
        <v-icon left>home</v-icon>
        Home</v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat v-on="on">
            Servicio
          </v-btn>
        </template>
        <v-list>
          <v-list-tile
            v-for="(item, index) in servicioItems"
            :key="index"
            @click="openForm(item.title)">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>
        <v-icon left>account_circle</v-icon>
        M.C. Arturo Legarda</v-btn>
      <v-btn flat>
        <v-icon left>logout</v-icon>
        Salir
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      servicioItems: [
        { title: 'Nuevo' },
        { title: 'Bimestre 1' },
        { title: 'Bimestre 2' },
        { title: 'Final' }
      ]
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    openForm (form) {
      switch (form) {
        case 'Nuevo':
          this.$router.push('/servicio')
          break
        case 'Bimestre 1':
          this.$router.push('/report/' + form)
          break
        case 'Bimestre 2':
          this.$router.push('/report/' + form)
          break
        case 'Final':
          this.$router.push('/final')
      }
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
</style>
