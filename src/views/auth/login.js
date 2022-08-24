import Axios from "axios";
import { mapGetters } from "vuex";
//INCRIPTACION
import CryptoJS from "crypto-js";

export default {
  name: "Login",
  data() {
    return {
      error: null,
      loading: false,
      showPass: false,
      login: {
        cui: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters([
      'services'
    ]),
  },
  created() {
    console.log(process.env.VUE_APP_SERVICE);
  },
  methods: {

    async auth() { //verifica_recaptcha
      /* this.$refs.captcha.click(); */
      this.recaptcha_response('1');
    },

    async recaptcha_response(token) {
      if (this.$refs.form.validate()) {
      if (token != null) {
        this.loading = true;
        await this.services.authService.login(this.login)
          .then(async (r) => {
            console.log(this.login, "LOGIN");
            console.log(r.data, "RESPONSE");
            await this.setSessionData(r.data.data);
            await this.setHeaders(r.data.data);
            this.loading = false;
            this.$router.push('/dashboard');
            this.$toast.success('Bienvenido');
          })
          .catch((e) => {
            this.loading = false;
            this.login.password = "";
            if (e.response) {
              this.$toast.error(e.response.data.message);
            }
          });
        }
      }
    },

    async setHeaders(data) {
      //guardamos el token authorization en el header para inicializar el acceso a los servicios
      Axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
      Axios.defaults.headers.common.Accept = 'application/json'
      // Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    },

    async setSessionData(data) {
      //incriptacion de datos y token de autorización
      let clave_token_autorizacion = "fdAF#$QV$-r!!@="//nombre en sessión storage
      let clave_data = "#$%ffsdf.fDSD-32*" //nombre en sessión storage
      //let clave_rol_id = "$%$SFDSF-RS#$%-22" // rol id en session storage 
      sessionStorage.setItem(clave_data, btoa(data.token));
      sessionStorage.setItem(clave_token_autorizacion, CryptoJS.AES.encrypt(JSON.stringify(data), data.token + "m3m@21").toString());
      //sessionStorage.setItem(clave_rol_id, parseInt(data.user.rol_id));
    },

    inicio() {
      let home = sessionStorage.getItem("home");
      this.$router.push(home);
    }
  }
};