class horarioAsignadoService {
    //servicios para login
    axios;
    baseUrl;
  
    constructor(axios, baseUrl) {
      this.axios = axios;
      this.baseUrl = `${baseUrl}/horario_asignado`;
    }
  
    listar() {
      let ruta = `${this.baseUrl}`;
      return this.axios.get(ruta);
    }
  
    actualizar(data, id) {
      let ruta = `${this.baseUrl}/update/${id}`;
      return this.axios.put(ruta, data);
    }

    show(id) {
      let ruta = `${this.baseUrl}/show/${id}`;
      return this.axios.get(ruta);
    }
  
    guardar(data) {
      let ruta = `${this.baseUrl}/create`;
      return this.axios.post(ruta, data);
    }
  
    eliminar(data, id) {
      let ruta = `${this.baseUrl}/delete/${id}`;
      return this.axios.delete(ruta, data);
    }
  }
  
  export default horarioAsignadoService;
  