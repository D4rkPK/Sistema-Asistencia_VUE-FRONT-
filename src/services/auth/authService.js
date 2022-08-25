
class authService {//servicios para login
    axios
    baseUrl
  
    constructor(axios, baseUrl) {
      this.axios = axios;
      this.baseUrl = `${baseUrl}`;
    }
  
    login(data) {
      let ruta = `${this.baseUrl}/login`
      return this.axios.post(ruta, data);
    }
  }
  
  export default authService;
  