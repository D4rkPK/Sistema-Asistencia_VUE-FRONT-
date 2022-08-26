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
        cui: null,
        correo: '',
        nombre: '',
        apellido: '',
        correo: '',
        carne: '',
        area_id: '',
        universidad_id: '',
      },
      default_area: {
        id: null,
        cui: null,
        correo: '',
        nombre: '',
        apellido: '',
        correo: '',
        carne: '',
        area_id: '',
        universidad_id: '',
      },
      itemAreas: [],
      itemUniversidades: [],
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
          value: 'user.descripcion'
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
      await this.listarAreas();
      await this.listarUniversidades();
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
        console.log('r.data. USERS');
        console.log(r.data.data);
        this.listado = r.data.data;
        if (r.status === 200) {
          this.$toast.success('areas obtenidos', { position: "top-right" });
        } else {
          this.$toast.warning(r.data.message, { position: "top-right" });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error('Ocurrio un error al intentar obtener los areas', { position: "top-right" });
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

    async editareas() {
      try {
        console.log("Editar areas");
        this.area.id = this.item.id;
        this.area.cui = this.item.cui;
        this.area.correo = this.item.correo;
        this.area.carne = this.item.carne;
        this.area.nombre = this.item.nombre;
        this.area.apellido = this.item.apellido;
        this.area.area_id = parseInt(this.item.area_id);
        this.area.universidad_id = parseInt(this.item.universidad_id);
      } catch (error) {
        this.$toast.error('Ocurrio un error al intentar obtener al area', { position: "top-right" });
      }
    },

    async confirmarGuardar() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        console.log(this.area, "area GUARDADO");
        await this.$store.state.services.areaService.guardar(this.area)
          .then(async () => {
            this.loading = false;
            this.$toast.success('Datos guardados con éxito', { position: "top-right" });
            this.closeDialog();
            await this.listarArea();
          })
          .catch((e) => {
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
        console.log(this.area, "DATOS EDITADOS");
        await this.$store.state.services.areaService.actualizar(this.area, this.area.id)
          .then(async () => {
            this.loading = false;
            this.$toast.success('Datos actualizados con éxito', { position: "top-right" });
            this.closeDialog();
            await this.listarArea();
          })
          .catch((e) => {
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
      this.$store.state.services.areaService.eliminar(this.area, item.id)
        .then(async () => {
          this.loading = false;
          this.$toast.success('area eliminado con éxito', { position: "top-right" });
          this.dialogConfirm = false;
          await this.listarArea();
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
      this.area = Object.assign(this.area, this.default_area);
      this.dialog = false;
    }

  }

}