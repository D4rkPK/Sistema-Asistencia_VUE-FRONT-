//INCRIPTACION
import CryptoJS from "crypto-js";
import Axios from "axios";
import store from '../../store/index.js'
import { mapGetters } from "vuex";

/* import dialog_cambiar_pass from "../../components/cambiarPass/cambiarPass.vue"; */

export default {
  /*   components: {
      dialog_cambiar_pass,
    }, */
  data: () => ({
    dialog: false,
    drawer: true,
    group: null,
    notificaciones: [],
    padless: false,
    variant: "default",
    mini: false,
    messages: 0,
    selected: [2],
    benched: 0,
    faltacorreo: false,
    faltadireccion: false,
    faltatelefono: false,
    faltaempresa: false,
    pantalla: '',
    mostrarLateral: true,
    userLogged: {},
    menus: [
      { nombre: 'Asistencia', icono: 'schedule', path: '/asistencia' },
      { nombre: 'Practicantes', icono: 'person', path: '/practicantes' },
      { nombre: 'Justificaciones', icono: 'description', path: '/justificaciones'},

      { nombre: 'Areas', icono: 'medical_information', path: '/areas'},
      { nombre: 'Puestos', icono: 'badge', path: '/puestos'},
      { nombre: 'Universidades', icono: 'school', path: '/universidades'},



    ],

    IDLE_TIMEOUT: 3600,//TIEMPO DE SESSIÓN
    idleSecondsTimer: 0,
    idleSecondsCounter: 0,
    // logo_back

  }),
  created() {
    if (sessionStorage.getItem("#$%ffsdf.fDSD-32*") !== null) {
      this.reload();
      this.size;

      document.onclick = () => {
        this.idleSecondsCounter = 0;
      };
      document.onmousemove = () => {
        this.idleSecondsCounter = 0;
      };
      document.onkeypress = () => {
        this.idleSecondsCounter = 0;
      };
      this.idleSecondsTimer = window.setInterval(this.CheckIdleTime, 1000);
    } else {
      this.$toast.warning('No ha iniciado sesión');
      this.$router.push('/login');
    }
  },

  computed: {
    size() {
      const size = { sm: 'small', lg: 'large', xl: 'x-large' }[this.$vuetify.breakpoint.name];
      this.pantalla = size;
      return size ? { [size]: true } : {}
    }
  },

  methods: {
    CheckIdleTime() {//valida tiempo de sesión
      this.idleSecondsCounter++;
      // console.log(this.idleSecondsCounter);
      if (this.idleSecondsCounter >= this.IDLE_TIMEOUT) {
        window.clearInterval(this.idleSecondsTimer);
        this.$toast.info("Su sesión ha expirado", { position: "top-center" })
        let url = "/login"
        const clave_token = "#$%ffsdf.fDSD-32*"
        const clave_data = "fdAF#$QV$-r!!@="
        sessionStorage.removeItem(clave_token)
        sessionStorage.removeItem(clave_data)
        this.$router.push({ path: url });
      }
    },

    pushRoute(route) {
      console.log(route);
      this.selectionUserItems(route);
    },

    selectionUserItems(path) {//seleciona items del menu (Perfil)
      try {
        if (path != "/cerrarSesion") {
          if (this.$route.path === path) {
            //console.log("");//evalua si hacemos click sobre un boton ya seleccionado
            this.$router.go();
          } else {
            this.$router.push({ path: path }).catch(error => {
              if (
                error.name !== 'NavigationDuplicated' &&
                !error.message.includes('Avoided redundant navigation to current location')
              ) {
                this.$router.go();
              } else {
                this.$router.go();
              }
            })
          }
        } else {
          this.cerrarSesion();
        }
      } catch (error) {
        //console.log("")
      }
    },

    vista_menu() {//permite la funcionalidad de minimizar menu lateral
      if (this.drawer) {
        console.log("HOLA1", this.drawer);
        this.drawer = !this.drawer;
      } else {
        console.log("2", this.drawer);
        this.drawer = !this.drawer;
      }
    },

    cerrarSesion() {//Cerrar sesión
      this.$router.push("/login");
      const clave_token = "#$%ffsdf.fDSD-32*"
      const clave_data = "fdAF#$QV$-r!!@="
      sessionStorage.removeItem(clave_token)
      sessionStorage.removeItem(clave_data)
      sessionStorage.removeItem(clave_menu)
      store.dispatch("resetCartState");
      // window.location.href = url
    },

    reload() {
      //Desincriptacion de datos del usuario (valor, clave)
      let informacion_incriptada = sessionStorage.getItem('fdAF#$QV$-r!!@=');

      if (informacion_incriptada != null) {
        let key_pass = atob(sessionStorage.getItem('#$%ffsdf.fDSD-32*')) + "umg@22"
        let bytes = CryptoJS.AES.decrypt(informacion_incriptada, key_pass);
        //Casteo de información a estring
        let informacion_desincriptada = bytes.toString(CryptoJS.enc.Utf8);
        //Casteo de JSON String a Object json
        let r = JSON.parse(informacion_desincriptada)
        console.log('DATOS USUARIO');
        console.log(r);
        this.userLogged = r.user;
        ///////////////////////////////////////////store.dispatch('setUser', data);
        // Se obtiene el token por ser una vista padre
        Axios.defaults.headers.common.Authorization = `Bearer ${r.token}`
        Axios.defaults.headers.common.Accept = 'application/json'
        this.notificaciones = []
        this.messages = 0;

      } else {
        // this.$toast.warning("No te has registrado")
        let url = "/login"
        const clave_token = "#$%ffsdf.fDSD-32*"
        const clave_data = "fdAF#$QV$-r!!@="
        sessionStorage.removeItem(clave_token)
        sessionStorage.removeItem(clave_data)
        this.$router.push({ path: url });
      }
    }
  },
};