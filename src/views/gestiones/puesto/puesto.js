//import store from "../../../../store/index.js";
export default {
  data() {
    return {
      dialog: false,
      dialogConfirm: false,
      loading: false,
      item: null,
      type: null,
      search: "",
      puesto: {
        id: null,
        puesto: "",
      },
      default_puesto: {
        id: null,
        puesto: "",
      },
      itemAreas: [],
      headers: [
        {
          text: "Puesto",
          align: "center",
          sortable: true,
          value: "descripcion",
        },
        {
          text: "Acciones",
          align: "center",
          sortable: false,
          value: "acciones",
        },
      ],
      listado: [],
      rules: {
        required: (value) => !!value || "Requerido.",
      },
    };
  },
  async created() {
    await this.listarPuestos();
  },

  methods: {
    async dialogForm(item) {
      console.log(item, "item");
      if (item == null) {
        if (this.$refs.form != undefined) {
          this.$refs.form.resetValidation();
        }
        this.puesto = Object.assign(this.puesto, this.default_puesto);
        this.type = "Crear";
        this.dialog = true;
      } else {
        this.type = "Editar";
        this.item = item;
        await this.editpuestos();
        this.dialog = true;
      }
    },

    async listarPuestos() {
      try {
        this.loading = true;
        let r = await this.$store.state.services.puestoService.listar();
        console.log("r.data. PUESTO");
        console.log(r.data.data);
        this.listado = r.data.data;
        if (r.status === 200) {
          this.$toast.success("puestos obtenidos", { position: "bottom-right" });
        } else {
          this.$toast.warning(r.data.message, { position: "bottom-right" });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error("Ocurrio un error al intentar obtener los puestos", {
          position: "bottom-right",
        });
      }
    },

    async editpuestos() {
      try {
        console.log("Editar puestos");
        this.puesto.id = this.item.id;
        this.puesto.cui = this.item.cui;
        this.puesto.correo = this.item.correo;
        this.puesto.carne = this.item.carne;
        this.puesto.nombre = this.item.nombre;
        this.puesto.apellido = this.item.apellido;
        this.puesto.area_id = parseInt(this.item.area_id);
        this.puesto.universidad_id = parseInt(this.item.universidad_id);
      } catch (error) {
        this.$toast.error("Ocurrio un error al intentar obtener al puesto", {
          position: "bottom-right",
        });
      }
    },

    async confirmarGuardar() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        console.log(this.puesto, "puesto GUARDADO");
        await this.$store.state.services.puestoService
          .guardar(this.puesto)
          .then(async () => {
            this.loading = false;
            this.$toast.success("Datos guardados con éxito", {
              position: "bottom-right",
            });
            this.closeDialog();
            await this.listarPuestos();
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
    },

    async confirmarEditar() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        console.log(this.puesto, "DATOS EDITADOS");
        await this.$store.state.services.puestoService
          .actualizar(this.puesto, this.puesto.id)
          .then(async () => {
            this.loading = false;
            this.$toast.success("Datos actualizados con éxito", {
              position: "bottom-right",
            });
            this.closeDialog();
            await this.listarPuestos();
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
    },

    async eliminar(item) {
      console.log(item.id, "ID QUE SE ELIMINARA");
      console.log(item);
      this.dialogConfirm = true;
      this.item = item;
    },

    confirmarEliminar(item) {
      console.log(item.id, "ID ELIMINADO");
      this.$store.state.services.puestoService
        .eliminar(this.puesto, item.id)
        .then(async () => {
          this.loading = false;
          this.$toast.success("Puesto eliminado con éxito", {
            position: "bottom-right",
          });
          this.dialogConfirm = false;
          await this.listarPuestos();
        })
        .catch((e) => {
          this.loading = false;
          if (e.response) {
            this.$toast.error(e.response.data.message, {
              position: "bottom-right",
            });
          }
        });
    },

    closeDialog() {
      this.$refs.form.resetValidation();
      this.puesto = Object.assign(this.puesto, this.default_puesto);
      this.dialog = false;
    },
  },
};
