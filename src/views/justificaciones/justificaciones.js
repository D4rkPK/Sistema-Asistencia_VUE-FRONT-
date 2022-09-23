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
            justificacion: {
                id: null,
                comentario: "",
                estado_comentario: "",
                horario_asignado_id: "",
                entrada: "",
                salida: "",
                fecha: "",
                estado: "",

            },
            default_justificacion: {
                id: null,
                comentario: "",
                estado_comentario: "",
                horario_asignado_id: "",
                entrada: "",
                salida: "",
                fecha: "",
                estado: "",
            },
            ItemEstado_comentario: [{ text: "Aprobado", value: 1, }, { text: "Rechazado", value: -1 }],
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
                    text: "Comentario",
                    align: "center",
                    value: "comentario",
                },
                {
                    text: "Estado Comentario",
                    align: "center",
                    value: "estado_comentario",
                },
                {
                    text: "Acciones",
                    align: "center",
                    value: "acciones",
                }
            ],
            listado: [],
        };
    },
    async created() {
        await this.listarAsistencia();
    },

    methods: {
        async listarAsistencia() {
            try {
                this.loading = true;
                let r = await this.$store.state.services.registroService.listarFaltantes();
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

        async justificar(item) {
            console.log("item", item);
            try {
                this.justificacion.id = item.id;
                this.justificacion.comentario = item.comentario;
                this.justificacion.estado_comentario = item.estado_comentario;
                this.justificacion.horario_asignado_id = item.horario_asignado_id;
                this.justificacion.entrada = item.salida;
                this.justificacion.salida = item.salida;
                this.justificacion.fecha = item.fecha;
                this.justificacion.estado = item.estado;
                this.dialog = true;
            } catch (error) {
                this.$toast.error(
                    "Ocurrio un error al intentar obtener las asistencias",
                    { position: "top-right" }
                );
            }
        },

        async confirmarGuardar() {
            if (this.$refs.form.validate()) {
                this.loading = true;
                console.log(this.justificacion, "DATOS EDITADOS");
                await this.$store.state.services.registroService.actualizar(this.justificacion, this.justificacion.id)
                    .then(async () => {
                        this.loading = false;
                        this.$toast.success('Datos actualizados con éxito', { position: "top-right" });
                        this.closeDialog();
                        await this.listarAsistencia();
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

        closeDialog() {
            this.$refs.form.resetValidation();
            this.justificacion = Object.assign(this.justificacion, this.default_justificacion);
            this.dialog = false;
          },
    },
};
