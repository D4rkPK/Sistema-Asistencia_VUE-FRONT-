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
      estudiante: {
        id: null,
        cui: '',
        correo: '',
        nombre: '',
        apellido: '',
        correo: '',
        carne: '',
        area_id: '',
        universidad_id: '',
      },
      default_estudiante: {
        id: null,
        cui: '',
        correo: '',
        nombre: '',
        apellido: '',
        correo: '',
        carne: '',
        area_id: '',
        universidad_id: '',
      },
      horario_id: null,
      
      itemHorarios: [],
      itemAreas: [],
      itemUniversidades: [],
      headers: [
        {
          text: 'DPI',
          align: 'center',
          sortable: true,
          value: 'cui',
        },
        {
          text: 'Nombre',
          align: 'center',
          sortable: true,
          value: 'nombre',
        },
        {
          text: 'Apellido',
          align: 'center',
          sortable: true,
          value: 'apellido',
        },
        {
          text: 'Correo',
          align: 'center',
          sortable: true,
          value: 'correo'
        },
        {
          text: 'Carné',
          align: 'center',
          sortable: true,
          value: 'carne'
        },
        {
          text: 'Area',
          align: 'center',
          sortable: true,
          value: 'area.descripcion_area',
        },
        {
          text: 'Universidad',
          align: 'center',
          sortable: true,
          value: 'universidad.nombre_universidad',
        },
        {
          text: 'Estado Huella',
          align: 'center',
          sortable: true,
          value: 'estado_huella',
        },
        {
          text: 'Huella',
          align: 'center',
          sortable: false,
          value: 'huella',
        },
        {
          text: 'Acciones',
          align: 'center',
          sortable: false,
          value: 'acciones',
        }
      ],
      listado: [],
      rules: {
        required: value => !!value || 'Requerido.',
        cui: value => value.length === 13 || 'El CUI debe contener 13 números',
        correo: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail invalido.'
        },
        noNumeros: value => {
          const pattern = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/
          return pattern.test(value) || 'No se permiten números.'
        }
      },
    }
  },
  async created() {
    await this.listarPracticantes();
  },

  methods: {
    async dialogForm(item) {
      await this.listarHorarios();
      await this.listarAreas();
      await this.listarUniversidades();
      console.log(item, "item");
      if (item == null) {
        if (this.$refs.form != undefined) {
          this.$refs.form.resetValidation()
        }
        this.estudiante = Object.assign(this.estudiante, this.default_estudiante);
        this.type = "Crear";
        this.dialog = true;
      } else {
        this.type = "Editar"
        this.item = item;
        await this.editEstudiantes();
        this.dialog = true;
      }
    },

    async listarPracticantes() {
      try {
        this.loading = true;
        let r = await this.$store.state.services.practicantesService.listar();
        console.log('r.data. USERS');
        console.log(r.data.data);
        this.listado = r.data.data;
        if (r.status === 200) {
          this.$toast.success('estudiantes obtenidos', { position: "top-right" });
        } else {
          this.$toast.warning(r.data.message, { position: "top-right" });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error('Ocurrio un error al intentar obtener los estudiantes', { position: "top-right" });
      }
    },

    async listarHorarios() {
      try {
        this.loading = true;
        let r = await this.$store.state.services.horarioService.listar();
        console.log('r.data. HORARIOS');
        console.log(r.data.data);
        this.itemHorarios = r.data.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error('Ocurrio un error al intentar obtener los horarios', { position: "top-right" });
      }
    },

    async listarAreas() {
      try {
        this.loading = true;
        let r = await this.$store.state.services.areaService.listar();
        console.log('r.data. AREAS');
        console.log(r.data);
        this.itemAreas = r.data.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error('Ocurrio un error al intentar obtener las areas', { position: "top-right" });
      }
    },

    async listarUniversidades() {
      try {
        this.loading = true;
        let r = await this.$store.state.services.universidadService.listar();
        console.log('r.data. universidades');
        console.log(r.data);
        this.itemUniversidades = r.data.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error('Ocurrio un error al intentar obtener las universidades', { position: "top-right" });
      }
    },

    async editEstudiantes() {
      try {
        console.log("Editar estudiantes");
        this.estudiante.id = this.item.id;
        this.estudiante.cui = this.item.cui;
        this.estudiante.correo = this.item.correo;
        this.estudiante.carne = this.item.carne;
        this.estudiante.nombre = this.item.nombre;
        this.estudiante.apellido = this.item.apellido;
        this.estudiante.area_id = parseInt(this.item.area_id);
        this.estudiante.universidad_id = parseInt(this.item.universidad_id);

        try {
          let r = await this.$store.state.services.horarioAsignadoService.show(this.item.id);
          console.log(r.data, 'HORARIOS ASIGNADOS');
          this.horario_id = r.data[0].horario_id;
          console.log(this.horario_id, 'HORARIO ID');
        } catch (error) {
          console.log(error);
        }

      } catch (error) {
        this.$toast.error('Ocurrio un error al intentar obtener al estudiante', { position: "top-right" });
      }
    },

    async confirmarGuardar() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        console.log(this.estudiante, "estudiante GUARDADO");
        await this.$store.state.services.practicantesService.guardar(this.estudiante)
          .then(async () => {
            await this.$store.state.services.horarioAsignadoService.guardar({estudiante: this.estudiante.cui, horario: this.horario_id})
            .then(async () => {
            this.loading = false;
            this.$toast.success('Datos guardados con éxito', { position: "top-right" });
            this.closeDialog();
            await this.listarPracticantes();
          })
          .catch((e) => {
            this.loading = false;
            if (e.response) {
              this.$toast.error(e.response.data.message, { position: 'top-right' });
            }
          });
        }).catch((e) => {
          this.loading = false;
          if (e.response) {
            this.$toast.error(e.response.data.message, { position: 'top-right' });
          }
        });
      } else {
        this.$toast.error("Debe llenar los campos obligatorios", { position: 'top-right' })
      }
    },

    async confirmarEditar() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        console.log(this.estudiante, "DATOS EDITADOS");
        await this.$store.state.services.practicantesService.actualizar({estudiante: this.estudiante, horario: this.horario_id}, this.estudiante.id,)
          .then(async () => {
            await this.$store.state.services.horarioAsignadoService.actualizar({estudiante: this.estudiante.cui, horario: this.horario_id})
            .then(async () => {
            this.loading = false;
            this.$toast.success('Datos actualizados con éxito', { position: "top-right" });
            this.closeDialog();
            await this.listarPracticantes();
          })
          .catch((e) => {
            this.loading = false;
            if (e.response) {
              this.$toast.error(e.response.data.message, { position: 'top-right' });
            }
          });
        }).catch((e) => {
          this.loading = false;
          if (e.response) {
            this.$toast.error(e.response.data.message, { position: 'top-right' });
          }
        });
      } else {
        this.$toast.error("Debe llenar los campos obligatorios", { position: 'top-right' })
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
      this.$store.state.services.practicantesService.eliminar(this.estudiante, item.id)
        .then(async () => {
          this.loading = false;
          this.$toast.success('estudiante eliminado con éxito', { position: "top-right" });
          this.dialogConfirm = false;
          await this.listarPracticantes();
        })
        .catch((e) => {
          this.loading = false;
          if (e.response) {
            this.$toast.error(e.response.data.message, { position: 'top-right' });
          }
        });
    },

    closeDialog() {
      this.$refs.form.resetValidation();
      this.estudiante = Object.assign(this.estudiante, this.default_estudiante);
      this.dialog = false;
      this.horario_id = null;
    },
    
    async FingerprintSdk(item) {

      try {
        this.loading = true;
        console.log("FingerprintSdk", item.id);

        await this.$store.state.services.practicantesService.guardarTemp({'estudiante_id': item.id})
          .then(async () => {
          })
          .catch((e) => {
            if (e.response) {
              this.$toast.error(e.response.data.message, { position: 'top-right' });
            }
          });
          this.loading = false;
          let r = await this.$store.state.services.practicantesService.openFingerPrint();
      } catch (error) {
        this.loading = false;
        this.$toast.error('Ocurrio un error al abrir el ejecutable', { position: "top-right" });
      }
    }
  }
}