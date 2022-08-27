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
      area: {
        id: null,
        descripcion: '',
        user_id: '',
      },
      default_area: {
        id: null,
        descripcion: '',
        user_id: '',
      },
      itemEncargados: [],
      headers: [
        {
          text: 'Descripción',	
          align: 'center',
          sortable: true,
          value: 'descripcion',
        },
        {
          text: 'Encargado',
          align: 'center',
          sortable: true,
          value: 'encargado',
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
    await this.listarArea();
  },

  methods: {
    async dialogForm(item) {
      await this.listarEncargados();
      console.log(item, "item");
      if (item == null) {
        if (this.$refs.form != undefined) {
          this.$refs.form.resetValidation()
        }
        this.area = Object.assign(this.area, this.default_area);
        this.type = "Crear";
        this.dialog = true;
      } else {
        this.type = "Editar"
        this.item = item;
        await this.editareas();
        this.dialog = true;
      }
    },

    async listarArea() {
      try {
        this.loading = true;
        let r = await this.$store.state.services.areaService.listar();
        console.log('r.data. area');
        console.log(r.data.data);
        this.listado = r.data.data;
        if (r.status === 200) {
          this.$toast.success('Areas obtenidas', { position: "bottom-right" });
        } else {
          this.$toast.warning(r.data.message, { position: "bottom-right" });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error('Ocurrio un error al intentar obtener las areas', { position: "bottom-right" });
      }
    },

    async listarEncargados() {
      try {
        this.loading = true;
        let r = await this.$store.state.services.encargadosService.listar();
        console.log('r.data. Encargados');
        console.log(r.data);
        this.itemEncargados = r.data.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error('Ocurrio un error al intentar obtener las areas', { position: "bottom-right" });
      }
    },

    async editareas() {
      try {
        console.log("Editar areas");
        this.area.id = this.item.id;
        this.area.descripcion = this.item.descripcion;
        this.area.user_id = parseInt(this.item.user_id);
      } catch (error) {
        this.$toast.error('Ocurrio un error al intentar obtener el area', { position: "bottom-right" });
      }
    },

    async confirmarGuardar() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        console.log(this.area, "area GUARDADO");
        await this.$store.state.services.areaService.guardar(this.area)
          .then(async () => {
            this.loading = false;
            this.$toast.success('Datos guardados con éxito', { position: "bottom-right" });
            this.closeDialog();
            await this.listarArea();
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
        console.log(this.area, "DATOS EDITADOS");
        await this.$store.state.services.areaService.actualizar(this.area, this.area.id)
          .then(async () => {
            this.loading = false;
            this.$toast.success('Datos actualizados con éxito', { position: "bottom-right" });
            this.closeDialog();
            await this.listarArea();
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
      this.$store.state.services.areaService.eliminar(this.area, item.id)
        .then(async () => {
          this.loading = false;
          this.$toast.success('Area eliminado con éxito', { position: "bottom-right" });
          this.dialogConfirm = false;
          await this.listarArea();
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
      this.area = Object.assign(this.area, this.default_area);
      this.dialog = false;
    }

  }

}