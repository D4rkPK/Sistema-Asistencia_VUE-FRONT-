class registroService {
    //servicios para login
    axios;
    baseUrl;
  
    constructor(axios, baseUrl) {
      this.axios = axios;
      this.baseUrl = `${baseUrl}/registro`;
    }
  
    listar() {
      let ruta = `${this.baseUrl}`;
      return this.axios.get(ruta);
    }

    listarFaltantes() {
      let ruta = `${this.baseUrl}/faltante`;
      return this.axios.get(ruta);
    }
  
    actualizar(data, id) {
      let ruta = `${this.baseUrl}/update/${id}`;
      return this.axios.put(ruta, data);
    }
  
    guardar(data) {
      let ruta = `${this.baseUrl}/create`;
      return this.axios.post(ruta, data);
    }
  
    eliminar(data, id) {
      let ruta = `${this.baseUrl}/delete/${id}`;
      return this.axios.delete(ruta, data);
    }

    validar(data){
      let ruta = `${this.baseUrl}/validarAsistencia`;
      return this.axios.post(ruta, data);
    }
  }
  export default registroService;
  