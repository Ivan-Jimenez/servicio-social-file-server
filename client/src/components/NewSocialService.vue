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
      }
    }
  }
}
</script>
