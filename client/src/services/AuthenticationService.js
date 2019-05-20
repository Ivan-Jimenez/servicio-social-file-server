import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('user/signup', credentials)
  },
  login (credentials) {
    return Api().post('user/login', credentials)
  },
  servicio (credentials) {
    return Api().post('/servicio', credentials)
  }
}
