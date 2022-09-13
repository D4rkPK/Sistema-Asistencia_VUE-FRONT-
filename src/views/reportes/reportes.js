import { mapGetters } from "vuex";
//import * as XLSX from 'xlsx';
export default {
    data() {
        return {
            search: '',
            loading: false,
            loadingBuscar: false,
            disableDepartamentos: true,
            disableMunicipios: true,
            disableButton: false,
            disableExport: true,
            value: null,
            years: [],
            productos: [],
            licencias: [],
            departamentos: [],
            municipios: [],
            nombreReporte: '',
            buscarProducto: null,
            buscarLicencia: null,
            buscarDepartamento: { id: -1, nombre: 'TODOS' },
            buscarMunicipio: { municipio_id: -1, nombre: 'TODOS' },
            productoEncontrado: null,
            reporte: [],
            totalReporte: [],
            headers: [
                { text: "Nombre", align: "center", sortable: true, value: "estudiante.full_name", },
                { text: "Entrada", align: "center", sortable: true, value: "entrada", },
                { text: "Salida", align: "center", sortable: true, value: "salida", },
                { text: "Fecha", align: "center", sortable: true, value: "fecha", },
                { text: "Estado", align: "center", sortable: true, value: "estado", },
                { text: "Área", align: "center", sortable: true, value: "area", },
                { text: "Universidad", align: "center", sortable: true, value: "universidad", },

            ],
            rules: {
                required: value => !!value || 'Requerido.',
            },
        }
    },

    async created() {
        this.disableButton = false;
        this.loadingBuscar = false;
        this.loadingDate = false;
        let sistema_id = atob(sessionStorage.getItem('SSS'));
        this.menu === null || this.menu.length === 0 ? store.dispatch("setReloadMenu", sistema_id) : console.log(this.menu);
    },

    computed: {
        ...mapGetters([
            'services', 'menu', 'cambio'
        ]),
    },

    methods: {
        getMesLetras(date) {
            let mes = parseInt(date);
            mes = mes === 1 ? 'Enero' : mes;
            mes = mes === 2 ? 'Febrero' : mes;
            mes = mes === 3 ? 'Marzo' : mes;
            mes = mes === 4 ? 'Abril' : mes;
            mes = mes === 5 ? 'Mayo' : mes;
            mes = mes === 6 ? 'Junio' : mes;
            mes = mes === 7 ? 'Julio' : mes;
            mes = mes === 8 ? 'Agosto' : mes;
            mes = mes === 9 ? 'Septiembre' : mes;
            mes = mes === 10 ? 'Octubre' : mes;
            mes = mes === 11 ? 'Noviembre' : mes;
            mes = mes === 12 ? 'Diciembre' : mes;
            return mes;
        },

        async listarAnios() {
            try {
                this.disableButton = true;
                this.loadingBuscar = true;
                let r = await this.$store.state.services.calendarioService.listarAnios();
                if (r.status === 200) {
                    this.years = r.data.data;
                } else {
                    this.$toast.error('A OCURRIDO UN ERROR AL INTENTAR OBTENER LOS AÑOS', { position: "top-right" });
                }
            } catch (error) {
                this.$toast.error('A OCURRIDO UN ERROR AL INTENTAR OBTENER LOS AÑOS', { position: "top-right" });
            }
        },

        async listarProductos() {
            try {
                this.disableButton = true;
                this.loadingBuscar = true;
                let r = await this.$store.state.services.productosService.listar();
                console.log('r.data. PRODUCTOS');
                console.log(r.data);
                this.productos = r.data.data;
            } catch (error) {
                this.loading = false;
                this.$toast.error('Ocurrio un error al intentar obtener los productos', { position: "top-right" });
            }
        },

        async listarLicencias() {
            try {
                this.disableButton = true;
                this.loadingDate = true;
                let r = await this.$store.state.services.licenciaService.listar();
                console.log('LICENCIAS', r.data.data);
                if (r.status === 200) {
                    this.licencias = r.data.data;
                    this.licencias.unshift({ id: -1, numero_licencia: 'TODOS' });
                } else {
                    this.$toast.error('A OCURRIDO UN ERROR AL INTENTAR OBTENER LOS AÑOS', { position: "top-right" });
                }
            } catch (error) {
                this.$toast.error('A OCURRIDO UN ERROR AL INTENTAR OBTENER LOS AÑOS', { position: "top-right" });
            }
        },

        async listarDepartamentos() {
            try {
                this.loading = true;
                let r = await this.$store.state.services.departamentosGTService.listar();
                console.log('r.data. DEPARTAMENTOS');
                console.log(r.data);
                this.departamentos = r.data.data;
                this.departamentos.unshift({ id: -1, nombre: 'TODOS' });
                this.loading = false;
            } catch (error) {
                this.loading = false;
                this.$toast.error('Ocurrio un error al intentar obtener los departamentos', { position: "top-right" });
            }
        },

        changeLicencia(lic) {
            if (lic.id != -1) {
                this.disableDepartamentos = true;
            } else {
                this.disableDepartamentos = false;
            }
        },

        async changeDepartamento(id) {
            console.log('dept', id);
            if (id != -1) {
                try {
                    this.loading = true;
                    /* this.itemMunicipios = null; */
                    let r = await this.$store.state.services.departamentosGTService.municipios(id);
                    r.data.data.filter(x => x.municipio_id = x.id);
                    console.log('MUNICIPIOS', r.data.data);
                    this.municipios = r.data.data;
                    this.municipios.unshift({ municipio_id: -1, nombre: 'TODOS' });
                    this.loading = false;
                    this.disableMunicipios = false;

                } catch (error) {
                    this.loading = false;
                    this.$toast.error('Ocurrio un error al intentar obtener los Municipios', { position: "top-right" });
                }
            } else {
                this.buscarMunicipio = { municipio_id: -1, nombre: 'TODOS' };
                this.disableMunicipios = true;
            }
        },

        async buscarPresentacion(producto, anio) {
            if (this.$refs.form.validate()) {
                this.loading = true;
                this.disableButton = true;
                this.disableExport = true;
                this.reporte = [];
                console.log('guardar', this.buscarMunicipio);
                try {
                    let rl = await this.$store.state.services.productosService.listar();
                    const found = rl.data.data.find(data => data.id === producto);
                    this.productoEncontrado = found.descripcion;
                    console.log('prueba', { licencia: this.buscarLicencia.id, departamento: this.buscarDepartamento.id, municipio: this.buscarMunicipio.municipio_id });
                    let r = await this.$store.state.services.productosService.buscarProducto(producto, anio, { licencia: this.buscarLicencia.id, departamento: this.buscarDepartamento.id, municipio: this.buscarMunicipio.municipio_id });
                    this.reporte = r.data.data[0];
                    this.totalReporte = r.data.data[1];

                    let sumaCompraAnio = 0;
                    let sumaVentaAnio = 0;
                    let indexCompra = 0;
                    let indexVenta = 0;

                    for (let index = 0; index < this.reporte.length; index++) {
                        if (this.reporte[index].precioCompraTotal != 0) {
                            indexCompra++;
                            sumaCompraAnio += parseFloat(this.reporte[index].precioCompraTotal);
                        }
                        if (this.reporte[index].precioCompraTotal != 0) {
                            indexVenta++;
                            sumaVentaAnio += parseFloat(this.reporte[index].ventaPrecioVenta);
                        }
                    }
                    for (let index = 0; index < this.totalReporte.length; index++) {
                        if (sumaCompraAnio != 0) {
                            if (index === 0) {
                                this.totalReporte[index].sumatoriaPrecioTotal = (sumaCompraAnio / indexVenta).toFixed(2);
                                this.totalReporte[index].ventaPrecioVenta = (sumaVentaAnio / indexVenta).toFixed(2);
                            } else {
                                this.totalReporte[index].sumatoriaPrecioTotal = (((sumaCompraAnio / indexCompra) / 42).toFixed(2));
                                this.totalReporte[index].ventaPrecioVenta = (((sumaVentaAnio / indexVenta) / 42).toFixed(2));
                            }
                        } else {
                            if (index === 0) {
                                this.totalReporte[index].sumatoriaPrecioTotal = (0).toFixed(2);
                                this.totalReporte[index].ventaPrecioVenta = (0).toFixed(2);
                            } else {
                                this.totalReporte[index].sumatoriaPrecioTotal = (0).toFixed(2);
                                this.totalReporte[index].ventaPrecioVenta = (0).toFixed(2);
                            }
                        }
                    }
                    if (r.status === 200) {
                        console.log('REPORTE GENERADO', r.data.data);
                        this.loading = false;
                        this.disableButton = false;
                        this.disableExport = false;
                    } else {
                        this.$toast.error('A ocurrido un error al tratar de obtener los productos', { position: "top-right" });
                    }
                } catch (error) {
                    this.$toast.error('A ocurrido un error al tratar de obtener los productos ' + error, { position: "top-right" });
                }
            }
        },

        convertirNumero(numero) {
            let dollarUSLocale = Intl.NumberFormat('en-US', { minimumFractionDigits: 2 });
            return dollarUSLocale.format(parseFloat(numero).toFixed(2))
        },

        async exportarReporte() {
            this.loading = true;
            this.disableButton = true;
            this.disableExport = true;
            console.log("GENERANDO REPORTE... ");
            this.nombreReporte = null;

            if (this.buscarLicencia.id === -1 && this.buscarDepartamento.id === -1 && this.buscarMunicipio.municipio_id === -1) {
                this.nombreReporte = ` Todas las licencias`;
            } else if (this.buscarLicencia.id === -1 && this.buscarDepartamento.id != -1 && this.buscarMunicipio.municipio_id === -1) {
                this.nombreReporte = ` Departamento ${this.buscarDepartamento.nombre}`
            } else if (this.buscarLicencia.id === -1 && this.buscarDepartamento.id != -1 && this.buscarMunicipio.municipio_id != -1) {
                this.nombreReporte = ` ${this.buscarDepartamento.nombre} ${this.buscarMunicipio.nombre}`
            } else {
                this.nombreReporte = ` Licencia ${this.buscarLicencia.numero_licencia}`;
            }
            await this.$store.state.services.productosService.generarReporte({ items: this.reporte, totales: this.totalReporte, anio: this.value, producto: this.productoEncontrado, nombreReporte: this.nombreReporte })
                .then(async (r) => {
                    console.log('REPORTE', r);
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = r.data.data
                    link.setAttribute('download', `REPORTE PRODUCTOS ${this.value} ${this.productoEncontrado} ${this.nombreReporte}.pdf`)
                    /* link.setAttribute('download', `REPORTE PRODUCTOS ${this.value} ${this.productoEncontrado}.pdf`) */
                    document.body.appendChild(link)
                    link.click()
                    this.loading = false;
                    this.disableButton = false;
                    this.disableExport = false;
                    this.$toast.success(`Reporte generado.`, { timeout: 3000, position: "top-right" });
                    /*             await this.listarRoles(); */
                })
                .catch((e) => {
                    this.loading = false;
                    this.disableButton = false;
                    this.disableExport = false;
                    if (e.response) {
                        this.$toast.error(e.response.data.message, { position: 'top-right' });
                    }
                });
        },

        exportarExcelAnual() {
            let info = [];
            this.reporte.forEach(element => {

                let data = {
                    MES: element.mes,
                    CANTIDAD_INFORMES: element.cantidadInformes,
                    COMPRA_VOLUMEN: element.compraVolumentTotal,
                    PRECIO_COMPRA_TOTAL: element.precioCompraTotal,
                    VENTA_VOLUMEN: element.ventaVolumentTotal,
                    PRECIO_VENTA_TOTAL: element.ventaPrecioVenta,
                    CONSUMO_EXPEDIO: element.consumoExpendio,
                };
                info.push(data);
            });
            console.log('REPORTE EXCEL', info);
            let data = XLSX.utils.json_to_sheet(info)
            const workbook = XLSX.utils.book_new()
            const filename = 'REPORTE PRODUCTOS';
            XLSX.utils.book_append_sheet(workbook, data, filename)
            XLSX.writeFile(workbook, `${filename}.xlsx`)
        },
    }
}