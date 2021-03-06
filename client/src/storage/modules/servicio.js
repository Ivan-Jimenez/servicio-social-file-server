import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

const state = {
  servicios: [],
  files: []
}

const actions = {
  async fetchServicios ({ commit }) {
    const response = await axios.get(`${BASE_URL}/servicio/get-all`)
    commit('setServicios', response.data.servicios)
    // console.log(response.data.servicios)
    return response
  },
  async addServicio ({ commit }, servicio) {
    const response = await axios.post(`${BASE_URL}/servicio/new`, servicio)
    commit('newServicio', response.data)
    return response
  },
  async uploadInitialFiles ({ commit }, files) {
    // TODO: Get the servicio id to pass it here.
    const response = await axios.post(`${BASE_URL}/servicio/initial-documents/upload`, files)
    commit('uploadInitialFiles', response.data)
  }
}

const mutations = {
  setServicios: (state, servicios) => (state.servicios = servicios),
  newServicio: (state, servicio) => state.servicios.unshift(servicio),
  uploadInitialFiles: (state, files) => (state.files.push({ 'initialFiles': files }))
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
