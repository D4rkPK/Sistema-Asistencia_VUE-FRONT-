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
      universidad: {
        id: null,
        abreviatura: '',
        nombre: '',

      },
      default_universidad: {
        id: null,
        abreviatura: '',
        nombre: '',
      },
      itemUsuarios: [],
      headers: [
        {
          text: 'Abreviatura',
          align: 'center',
          sortable: true,
          value: 'abreviatura',
        },
        {
          text: 'Nombre',	
          align: 'center',
          sortable: true,
          value: 'nombre_universidad',
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
      },
    }
  },
  async created() {
    await this.listarUniversidad();
  },

  methods: {
    async dialogForm(item) {
      console.log(item, "item");
      if (item == null) {
        if (this.$refs.form != undefined) {
          this.$refs.form.resetValidation()
        }
        this.universidad = Object.assign(this.universidad, this.default_universidad);
        this.type = "Crear";
        this.dialog = true;
      } else {
        this.type = "Editar"
        this.item = item;
        await this.edituniversidads();
        this.dialog = true;
      }
    },

    async listarUniversidad() {
      try {
        this.loading = true;
        let r = await this.$store.state.services.universidadService.listar();
        console.log('r.data. universidad');
        console.log(r.data.data);
        this.listado = r.data.data;
        if (r.status === 200) {
          this.$toast.success('universidades obtenidas', { position: "bottom-right" });
        } else {
          this.$toast.warning(r.data.message, { position: "bottom-right" });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error('Ocurrio un error al intentar obtener las universidades', { position: "bottom-right" });
      }
    },

    async edituniversidads() {
      try {
        console.log("Editar universidads");
        this.universidad.id = this.item.id;
        this.universidad.abreviatura = this.item.abreviatura;
        this.universidad.nombre = this.item.nombre;
      } catch (error) {
        this.$toast.error('Ocurrio un error al intentar obtener al universidades', { position: "bottom-right" });
      }
    },

    async confirmarGuardar() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        console.log(this.universidad, "universidad GUARDADO");
        await this.$store.state.services.universidadService.guardar(this.universidad)
          .then(async () => {
            this.loading = false;
            this.$toast.success('Datos guardados con éxito', { position: "bottom-right" });
            this.closeDialog();
            await this.listarUniversidad();
          })
          .catch((e) => {
            this.loading = false;
            if (e.response) {
              this.$toast.error(e.response.data.message, { position: 'bottom-right' });
            }
          });
      } else {
        this.$toast.error("Debe llenar los campos obligatorios", { position: 'bottom-right' })
      }
    },

    async confirmarEditar() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        console.log(this.universidad, "DATOS EDITADOS");
        await this.$store.state.services.universidadService.actualizar(this.universidad, this.universidad.id)
          .then(async () => {
            this.loading = false;
            this.$toast.success('Datos actualizados con éxito', { position: "bottom-right" });
            this.closeDialog();
            await this.listarUniversidad();
          })
          .catch((e) => {
            this.loading = false;
            if (e.response) {
              this.$toast.error(e.response.data.message, { position: 'bottom-right' });
            }
          });
      } else {
        this.$toast.error("Debe llenar los campos obligatorios", { position: 'bottom-right' })
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
      this.$store.state.services.universidadService.eliminar(this.universidad, item.id)
        .then(async () => {
          this.loading = false;
          this.$toast.success('Universidad eliminada con éxito', { position: "bottom-right" });
          this.dialogConfirm = false;
          await this.listarUniversidad();
        })
        .catch((e) => {
          this.loading = false;
          if (e.response) {
            this.$toast.error(e.response.data.message, { position: 'bottom-right' });
          }
        });
    },

    closeDialog() {
      this.$refs.form.resetValidation();
      this.universidad = Object.assign(this.universidad, this.default_universidad);
      this.dialog = false;
    }

  }

}