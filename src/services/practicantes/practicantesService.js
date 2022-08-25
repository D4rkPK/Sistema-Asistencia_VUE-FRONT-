
class practicantesService {//servicios para login
    axios
    baseUrl
  
    constructor(axios, baseUrl) {
      this.axios = axios;
      this.baseUrl = `${baseUrl}`;
    }
  
    listar() {
      let ruta = `${this.baseUrl}/estudiante`
      return this.axios.get(ruta);
    }
  }
  
  export default practicantesService;
  