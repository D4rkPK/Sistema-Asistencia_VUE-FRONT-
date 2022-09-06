class practicantesService {
  //servicios para login
  axios;
  baseUrl;

  constructor(axios, baseUrl) {
    this.axios = axios;
    this.baseUrl = `${baseUrl}/estudiante`;
    this.baseUrl1= `${baseUrl}/temp_estudiante`;
  }

  listar() {
    let ruta = `${this.baseUrl}`;
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

  openFingerPrint() {
    let ruta = `${this.baseUrl}/huella`;
    return this.axios.get(ruta);
  }

  guardarTemp(data) {
    let ruta = `${this.baseUrl1}/create`;
    return this.axios.post(ruta, data);
  }

  eliminarTemp() {
    let ruta = `${this.baseUrl1}/delete`;
    return this.axios.get(ruta);
  }
}

export default practicantesService;
