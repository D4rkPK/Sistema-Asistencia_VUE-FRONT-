import { mapGetters } from "vuex";
import store from "../../store/index";
import card from "../../components/card/card.vue";
export default {
  components: {
    card
  },
  data() {
    return {
      sistemas: []
    }
  },
  computed: {
    ...mapGetters([
      'services', 'menu'
    ])
  },
  async created() {
    this.getSistemas();
  },
  methods: {
    getSistemas() {
          this.sistemas = [
            {
                "id": 1,
                "abreviatura": "AU",
                "path": "/sau",
                "icon": "people",
                "descripcion": "Administracion de Usuarios",
                "deleted_at": null,
                "created_at": null,
                "updated_at": null,
                "image": "fondo1.webp"
            },
            {
                "id": 2,
                "abreviatura": "PMI",
                "path": "/spmi",
                "icon": "content_paste",
                "descripcion": "Presentacion Mensual de Informacion",
                "deleted_at": null,
                "created_at": null,
                "updated_at": null,
                "image": "fondo2.webp"
            },
            {
                "id": 3,
                "abreviatura": "IP",
                "path": "/sip",
                "icon": "payments",
                "descripcion": "Ingreso de Precios",
                "deleted_at": null,
                "created_at": null,
                "updated_at": null,
                "image": "fondo4.webp"
            },
            {
                "id": 4,
                "abreviatura": "RE",
                "path": "/sre",
                "icon": "analytics",
                "descripcion": "Reportes Estadisticos",
                "deleted_at": null,
                "created_at": null,
                "updated_at": null,
                "image": "fondo3.webp"
            },
            {
                "id": 5,
                "abreviatura": "MI",
                "path": "/smi",
                "icon": "construction",
                "descripcion": "Mantenimientos",
                "deleted_at": null,
                "created_at": null,
                "updated_at": null,
                "image": "fondo5.webp"
            }
        ]
    }
  }
}