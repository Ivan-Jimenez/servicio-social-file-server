import axios from 'axios'

const BASE_URL = 'http://localhost:3000/user'

const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user: {}
}

const actions = {
  async login ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('authRequest')
      axios.post(`${BASE_URL}/login`, user)
        .then(response => {
          const token = response.data.token
          const user = response.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('authSuccess', token, user)
          resolve(response)
        })
        .catch(err => {
          commit('authError')
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  async register ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('authRequest')
      axios.post(`${BASE_URL}/signup`, user)
        .then(response => {
          const token = response.data.token
          const user = response.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('authSuccess', token, user)
          resolve(response)
        })
        .catch(err => {
          commit('authError', err)
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  async logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

const mutations = {
  authRequest (state) {
    state.status = 'loading'
  },
  authSuccess (state, token, user) {
    state.status = 'success'
    state.token = token
    state.user = user
  },
  authError (state) {
    state.status = 'error'
  },
  logout (state) {
    state.status = ''
    state.token = ''
  }
}

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status
}

export default {
  state,
  getters,
  mutations,
  actions
}
