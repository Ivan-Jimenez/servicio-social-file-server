import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

const state = {
  servicios: []
}

const actions = {
  async fetchServicios ({ commit }) {
    const response = await axios.get(`${BASE_URL}/servicio/`)
    commit('setServicios', response.data.servicios)
    console.log(response.data.servicios)
  },
  async addServicio ({ commit }, servicio) {
    const response = await axios.post(`${BASE_URL}/servicio/`, { servicio, completed: false })
    commit('newServicio', response.data)
  }
}

const mutations = {
  setServicios: (state, servicios) => (state.servicios = servicios),
  newServicio: (state, servicio) => state.servicios.unshift(servicio)
}

const getters = {
  allServicios: state => state.servicios
}

export default {
  state,
  getters,
  actions,
  mutations
}
