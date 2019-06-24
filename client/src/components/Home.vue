<template>
  <v-card>
    <v-card-title>
      <v-select
          :items="dropdownCategory"
          label="Mostrar"/>
      <v-spacer/>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Buscar"
        single-line
        hide-details/>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="students"
      :search="search">
      <template
        v-slot:items="props">
        <td>
          {{ props.item.control }}
        </td>
        <td class="text-xs-left">{{ props.item.career }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.programName }}</td>
        <td class="text-xs-left">{{ props.item.startDate }}</td>
        <td class="text-xs-left">{{ props.item.endDate }}</td>
        <td class="text-xs-left">{{ props.item.status }}</td>
      </template>
      <template v-slot:no-results>
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >No se encontraron resultados para "{{ search }}".</v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'home',
  methods: {
    ...mapActions(['fetchServicios']),
    ...mapGetters(['allServicios'])
  },
  computed: mapGetters(['allServicios']),
  created () {
    this.fetchServicios()
    // console.log(this.allServicios())
    // this.allServicios[0].servicios.forEach(servico => {
    //   this.students.push({
    //     control: servicio.control,
    //     career: servicio.career,
    //     name: `${servicio.name} ${servicio.lastName}`,
    //     programName: servicio.programName,
    //     startDate: servicio.startDate.split('T')[0],
    //     endDate: servicio.endDate.split('T')[0]
    //   })
    // })
    // try {
    //   const response = await AuthenticationService.servicioFetchAll()
    //   console.log(response.data.servicios)
    //   response.data.servicios.forEach(servicio => {
    //     this.students.push({
    //       control: servicio.control,
    //       career: servicio.career,
    //       name: `${servicio.name} ${servicio.lastName}`,
    //       programName: servicio.programName,
    //       startDate: servicio.startDate.split('T')[0],
    //       endDate: servicio.endDate.split('T')[0]
    //     })
    //   })
    // } catch (err) {
    //   console.log(err.response.data.error)
    // }
  },
  data () {
    return {
      dropdownCategory: ['Servicio Social', 'Residencias', 'Tesis'],
      search: '',
      headers: [
        {
          text: 'N° Control',
          align: 'center',
          sortable: false,
          value: 'control'
        },
        { text: 'Carrera', value: 'career' },
        { text: 'Nombre', value: 'name' },
        { text: 'Nombre del Programa', value: 'programName' },
        { text: 'Inicio', value: 'startDate' },
        { text: 'Termino', value: 'endDate' }
        // { text: 'Estado', value: 'status' }
      ],
      students: []
    }
  }
}
</script>
