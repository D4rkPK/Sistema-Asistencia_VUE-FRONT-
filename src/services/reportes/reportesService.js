class universidadService {
    //servicios para login
    axios;
    baseUrl;
  
    constructor(axios, baseUrl) {
      this.axios = axios;
      this.baseUrl = `${baseUrl}/reporte`;
    }
  
    reporteLicencias(data) {
      let ruta = `${this.baseUrl}`;
      return this.axios.post(ruta, data);
    }
  
  }
  
  export default universidadService;
  