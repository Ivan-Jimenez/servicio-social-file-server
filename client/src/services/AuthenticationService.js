import Api from '@/services/Api'

// TODO: Find a better way to implement axios
export default {
  register (credentials) {
    return Api().post('user/signup', credentials)
  },
  login (credentials) {
    return Api().post('user/login', credentials)
  },
  servicio (credentials) {
    return Api().post('/servicio', credentials)
  },
  servicioFetchAll () {
    return Api().get('/servicio')
  },
  reporte (data, headers) {
    return Api().post('/reporte', data, headers)
  },
  final (credentials) {
    return Api().post('/final', credentials)
  }
}
