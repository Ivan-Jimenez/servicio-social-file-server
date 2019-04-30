<template>
  <v-card>
    <v-card-title>
      <v-overflow-btn
          :items="dropdownCategory"
          label="Mostrar"
        ></v-overflow-btn>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="students" :search="search">
      <template v-slot:items="props">
        <td>{{ props.item.control }}</td>
        <td class="text-xs-left">{{ props.item.career }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.programName }}</td>
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
export default {
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
        { text: 'Estado', value: 'status' }
      ],
      students: [
        {
          control: 14550332,
          career: 'Ing. en Sistemas',
          name: 'Iván Jiménez',
          programName: 'Clúster para la DEPI',
          status: 'Activo'
        },
        {
          control: 19550332,
          career: 'Ing. en Sistemas',
          name: 'Alexis',
          programName: 'Clúster para la DEPI',
          status: 'Activo'
        },
        {
          control: 20550332,
          career: 'Ing. en Sistemas',
          name: 'Adrián',
          programName: 'Clúster para la DEPI',
          status: 'Activo'
        }
      ]
    }
  }
}
</script>
