import { digitalTimePicker} from "vuetify-more-component";

export default {
  components: {
    digitalTimePicker,
  },
  data() {
    return {
      /* Time Picker */
      menu: null,
      menu2: null,
      /* /Time Picker */

      dialog: false,
      dialogConfirm: false,
      loading: false,
      item: null,
      type: null,
      search: "",
      horario: {
        id: null,
        descripcion: "",
        hora_entrada: "",
        hora_salida: "",
      },
      default_horario: {
        id: null,
        descripcion: "",
        hora_entrada: "",
        hora_salida: "",
      },
      itemEncargados: [],
      headers: [
        {
          text: "Descripción",
          align: "center",
          sortable: true,
          value: "descripcion",
        },
        {
          text: "Hora Entrada",
          align: "center",
          sortable: true,
          value: "hora_entrada",
        },
        {
          text: "Hora Salida",
          align: "center",
          sortable: true,
          value: "hora_salida",
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
        /* hora de entrada no puede ser mayor a la de salida */
        hora_salida: (value) => {
          if (value <= this.horario.hora_entrada) {
            return "La hora de salida no puede ser menor a la de entrada";
          } else {
            return true;
          }
        },
      },
    };
  },
  async created() {
    await this.listarHorario();
  },
  methods: {
    async dialogForm(item) {
      await this.listarEncargados();
      console.log(item, "item");
      if (item == null) {
        if (this.$refs.form != undefined) {
          this.$refs.form.resetValidation();
        }
        this.horario = Object.assign(this.horario, this.default_horario);
        this.type = "Crear";
        this.dialog = true;
      } else {
        this.type = "Editar";
        this.item = item;
        await this.edithorario();
        this.dialog = true;
      }
    },

    async listarHorario() {
      try {
        this.loading = true;
        let r = await this.$store.state.services.horarioService.listar();
        console.log("r.data. horario");
        console.log(r.data.data);
        this.listado = r.data.data;
        if (r.status === 200) {
          this.$toast.success("Horarios obtenidos", {
            position: "bottom-right",
          });
        } else {
          this.$toast.warning(r.data.message, { position: "bottom-right" });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error("Ocurrio un error al intentar obtener los horarios", {
          position: "bottom-right",
        });
      }
    },

    async listarEncargados() {
      try {
        this.loading = true;
        let r = await this.$store.state.services.encargadosService.listar();
        console.log("r.data. Encargados");
        console.log(r.data);
        this.itemEncargados = r.data.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error("Ocurrio un error al intentar obtener los horarios", {
          position: "bottom-right",
        });
      }
    },

    async edithorario() {
      try {
        console.log("Editar horarios");
        this.horario.id = this.item.id;
        this.horario.descripcion = this.item.descripcion;
        this.horario.hora_entrada = this.item.hora_entrada;
        this.horario.hora_salida = this.item.hora_salida;
        console.log(this.horario);
      } catch (error) {
        this.$toast.error("Ocurrio un error al intentar obtener el horario", {
          position: "bottom-right",
        });
      }
    },

    async confirmarGuardar() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        console.log(this.horario, "horario GUARDADO");
        await this.$store.state.services.horarioService
          .guardar(this.horario)
          .then(async () => {
            this.loading = false;
            this.$toast.success("Datos guardados con éxito", {
              position: "bottom-right",
            });
            this.closeDialog();
            await this.listarHorario();
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
        console.log(this.horario, "DATOS EDITADOS");
        await this.$store.state.services.horarioService
          .actualizar(this.horario, this.horario.id)
          .then(async () => {
            this.loading = false;
            this.$toast.success("Datos actualizados con éxito", {
              position: "bottom-right",
            });
            this.closeDialog();
            await this.listarHorario();
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
      this.$store.state.services.horarioService
        .eliminar(this.horario, item.id)
        .then(async () => {
          this.loading = false;
          this.$toast.success("Horario eliminado con éxito", {
            position: "bottom-right",
          });
          this.dialogConfirm = false;
          await this.listarHorario();
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
      this.horario = Object.assign(this.horario, this.default_horario);
      this.dialog = false;
      this.menu = null;
      this.menu2 = null;
    },
  },
};
