//import store from "../../../../store/index.js";
export default {
  data() {
    return {
      dialog: false,
      dialogConfirm: false,
      loading: false,
      item: null,
      type: null,
      menu: null,
      fecha: null,
      search: "",
      estudiante: {
        id: null,
        cui: "",
        correo: "",
        nombre: "",
        apellido: "",
        correo: "",
        carne: "",
        area_id: "",
        universidad_id: "",
      },
      default_estudiante: {
        id: null,
        cui: "",
        correo: "",
        nombre: "",
        apellido: "",
        correo: "",
        carne: "",
        area_id: "",
        universidad_id: "",
      },
      itemAreas: [],
      itemUniversidades: [],
      headers: [
        {
          text: "Nombre",
          align: "center",
          sortable: true,
          value: "estudiante.full_name",
        },
        {
          text: "Entrada",
          align: "center",
          sortable: true,
          value: "entrada",
        },
        {
          text: "Salida",
          align: "center",
          sortable: true,
          value: "salida",
        },
        {
          text: "Fecha",
          align: "center",
          sortable: true,
          value: "fecha",
        },
        {
          text: "Estado",
          align: "center",
          sortable: true,
          value: "estado",
        },
      ],
      listado: [],
      rules: {
        required: (value) => !!value || "Requerido.",
      },
    };
  },
  async created() {
    await this.listarAsistencia();
  },

  methods: {
    async listarAsistencia() {
      try {
        this.loading = true;
        let r = await this.$store.state.services.registroService.listar();
        console.log("r.data. asistencia", r.data.data);
        this.listado = r.data.data;
        if (r.status === 200) {
          this.$toast.success("Información obtenida", {
            position: "top-right",
          });
        } else {
          this.$toast.warning(r.data.message, { position: "top-right" });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error(
          "Ocurrio un error al intentar obtener las asistencias",
          { position: "top-right" }
        );
      }
    },

    async validarFaltantes(fecha) {
      console.log('Fecha', fecha);
      if (this.$refs.form.validate()) {
        this.loading = true;
        await this.$store.state.services.registroService
          .validar({fecha: fecha})
          .then(async () => {
            this.loading = false;
            this.$toast.success("Faltantes Generado con éxito", {
              position: "bottom-right",
            });
            await this.listarAsistencia();
          })
          .catch((e) => {
            this.loading = false;
            if (e.response) {
              this.$toast.error(e.response.data.message, {
                position: "bottom-right",
              });
            }
          });
      } else {
        this.$toast.error("Debe llenar los campos obligatorios", {
          position: "bottom-right",
        });
      }
    }
  },
};
