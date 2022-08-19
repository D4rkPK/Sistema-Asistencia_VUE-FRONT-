import Axios from 'axios'
/* import router from '../router' */

import authService from "../services/auth/authService.js";


let baseUrl = process.env.VUE_APP_SERVICE; //api

Axios.defaults.headers.common.Accept = 'application/json'
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// clave del token en parametro get item
if (sessionStorage.getItem('$DSDdse3423..32') !== null) {
  Axios.defaults.headers.common.Authorization = `Bearer ${atob(sessionStorage.getItem('$DSDdse3423..32'))}`
}

export default {//se cargan los servicios ubicados en la carpeta services
  authService: new authService(Axios, baseUrl),
}