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
      :items="allServicios"
      :search="search">
      <template
        v-slot:items="props">
        <td>
          {{ props.item.control }}
        </td>
        <td class="text-xs-left">{{ props.item.career }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.programName }}</td>
        <td class="text-xs-left">{{ props.item.startDate.split('T')[0] }}</td>
        <td class="text-xs-left">{{ props.item.endDate.split('T')[0] }}</td>
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
  mounted () {
    // // this.fetchServicios()
    // for (var i = 0; i <= this.allServicios.length; ++i) {
    //   this.students.push({
    //     control: this.allServicios[i].control,
    //     career: this.allServicios[i].career,
    //     name: this.allServicios[i].name,
    //     lastName: this.allServicios[i].lastName,
    //     programName: this.allServicios[i].programName,
    //     startDate: this.allServicios[i].startDate,
    //     endDate: this.allServicios[i].endDate
    //   })
    // }
  },
  created () {
    var response = this.fetchServicios()
    console.log(response)
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
