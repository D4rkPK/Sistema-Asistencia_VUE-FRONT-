export default {
  data() {
    return {
      /* Time Picker */
      minHour: 0,
      maxHour: 23,
      hour: 0,
      minMinute: 0,
      maxMinute: 59,
      minute: 0,
      /* /Time Picker */

      time1: false,
      time2: false,
      modal1: false,
      modal2: false,

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
      },
    };
  },
  async created() {
    await this.listarHorario();
  },
  computed: {
    hourModel: {
      get() {
        return this.forceTwoDigits(this.hour);
      },
      set(v) {
        this.hour = Number(v);
      },
    },
    minuteModel: {
      get() {
        return this.forceTwoDigits(this.minute);
      },
      set(v) {
        this.minute = Number(v);
      },
    },
    fullTimeModel: {
      get() {
        return `${this.hourModel}:${this.minuteModel}`;
      },
      set(v) {
        const [h, m] = v.split(":");
        this.hourModel = h;
        this.minuteModel = m;
      },
    },
  },
  watch: {
    hour: function (hour) {
      this.$nextTick(() => {
        if (hour < this.minHour) this.hour = this.minHour;
        if (hour > this.maxHour) this.hour = this.maxHour;
      });
    },
    minute: function (minute) {
      this.$nextTick(() => {
        if (minute < this.minMinute) this.minute = this.minMinute;
        if (minute > this.maxMinute) this.minute = this.maxMinute;
      });
    },
    /* si time se cierra  */
    time1: function (time1) {
      this.$nextTick(() => {
        if (time1 == false) this.minute = 0;
        this.hour = 0;
      });
    },
    time2: function (time2) {
      this.$nextTick(() => {
        if (time2 == false) this.minute = 0;
        this.hour = 0;
      });
    },
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
    },

    forceTwoDigits(num) {
      return (num < 10 ? "0" : "") + num;
    },
    onAddHourClicked() {
      this.hour < this.maxHour ? (this.hour += 1) : (this.hour = this.minHour);
    },
    onSubtractHourClicked() {
      this.hour > this.minHour ? (this.hour -= 1) : (this.hour = this.maxHour);
    },
    onAddMinuteClicked() {
      this.minute < this.maxMinute
        ? (this.minute += 1)
        : (this.minute = this.minMinute);
    },
    onSubtractMinuteClicked() {
      this.minute > this.minMinute
        ? (this.minute -= 1)
        : (this.minute = this.maxMinute);
    },

    saveTime(type) {
      console.log("saveTime", type);
      if (type == 1) {
        this.horario.hora_entrada = this.fullTimeModel;
      } else if (type == 2) {
        this.horario.hora_salida = this.fullTimeModel;
      } else {
        console.log("Invalid type");
      }
      this.hour = 0;
      this.minute = 0;
      this.time1 = false;
      this.time2 = false;
    },
  },
};
