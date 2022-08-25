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
      usuario: {
        id: null,
        cui: null,
        email: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        area_id: '',
        rol_id: '',
      },
      default_usuario: {
        cui: null,
        email: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        area_id: '',
        rol_id: '',
      },
      itemAreas: [],
      itemPuestos: [],
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
          text: 'Email',
          align: 'center',
          sortable: true,
          value: 'correo'
        },

        {
          text: 'Area',
          align: 'center',
          sortable: true,
          value: 'area.descripcion',
        },
        {
          text: 'Universidad',
          align: 'center',
          sortable: true,
          value: 'universidad.nombre',
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
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail invalido.'
        }
      },
    }
  },
  async created() {
    await this.listarPracticantes();
  },

  methods: {
/*     async dialogForm(item) {
      await this.listarAreas();
      await this.listarRoles();
      console.log(item, "item");
      if (item == null) {
        if (this.$refs.form != undefined) {
          this.$refs.form.resetValidation()
        }
        this.usuario = Object.assign(this.usuario, this.default_usuario);
        this.type = "Crear";
        this.dialog = true;
      } else {
        this.type = "Editar"
        this.item = item;
        await this.editUsers();
        this.dialog = true;
      }
    }, */

    async listarPracticantes() {
      try {
        this.loading = true;
        let r = await this.$store.state.services.practicantesService.listar();
        console.log('r.data. USERS');
        console.log(r.data.data);
        this.listado = r.data.data;
        if (r.status === 200) {
          this.$toast.success('Usuarios obtenidos', { position: "top-right" });
        } else {
          this.$toast.warning(r.data.message, { position: "top-right" });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error('Ocurrio un error al intentar obtener los usuarios', { position: "top-right" });
      }
    },

/*     async listarAreas() {
      try {
        this.loading = true;
        let r = await this.$store.state.services.areasService.listar();
        console.log('r.data. AREAS');
        console.log(r.data);
        this.itemAreas = r.data.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error('Ocurrio un error al intentar obtener las areas', { position: "top-right" });
      }
    },

    async listarRoles() {
      try {
        this.loading = true;
        let r = await this.$store.state.services.rolesService.listar();
        console.log('r.data. ROLES');
        console.log(r.data);
        this.itemPuestos = r.data.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast.error('Ocurrio un error al intentar obtener los roles', { position: "top-right" });
      }
    },

    async editUsers() {
      try {
        console.log("Editar usuarios");
        this.usuario.id = this.item.id;
        this.usuario.cui = this.item.cui;
        this.usuario.email = this.item.email;
        this.usuario.primer_nombre = this.item.primer_nombre;
        this.usuario.segundo_nombre = this.item.segundo_nombre;
        this.usuario.primer_apellido = this.item.primer_apellido;
        this.usuario.segundo_apellido = this.item.segundo_apellido;
        this.usuario.area_id = parseInt(this.item.area_id);
        this.usuario.rol_id = parseInt(this.item.rol_id);
      } catch (error) {
        this.$toast.error('Ocurrio un error al intentar obtener al usuario', { position: "top-right" });
      }
    },

    async confirmarGuardar() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        console.log(this.usuario, "USUARIO GUARDADO");
        await this.$store.state.services.usuariosService.guardar(this.usuario)
          .then(async () => {
            this.loading = false;
            this.$toast.success('Datos guardados con éxito', { position: "top-right" });
            this.closeDialog();
            await this.listarUsuarios();
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
        console.log(this.usuario, "DATOS EDITADOS");
        await this.$store.state.services.usuariosService.actualizar(this.usuario)
          .then(async () => {
            this.loading = false;
            this.$toast.success('Datos actualizados con éxito', { position: "top-right" });
            this.closeDialog();
            await this.listarUsuarios();
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
      this.$store.state.services.usuariosService.eliminar(this.usuario, item.id)
        .then(async () => {
          this.loading = false;
          this.$toast.success('Usuario eliminado con éxito', { position: "top-right" });
          this.dialogConfirm = false;
          await this.listarUsuarios();
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
      this.usuario = Object.assign(this.usuario, this.default_usuario);
      this.dialog = false;
    }

  } */
}
}