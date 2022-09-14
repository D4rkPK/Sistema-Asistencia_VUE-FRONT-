import * as XLSX from 'xlsx';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
export default {
    data() {
        return {
            dates: ['', ''],
            menu2: false,
            loading: false,
            loadingBuscar: false,
            disableButton: false,
            disableExport: true,

            estado: null,
            area: null,
            universidad: null,
            itemsEstados: [{ id: 2, nombre: 'TODOS' }, { id: 1, nombre: 'A TIEMPO' }, { id: -2, nombre: 'TARDE' }, { id: -1, nombre: 'FALTANTE' }],
            itemsArea: [],
            itemsUniversidades: [],
            reporte: [],
            headers: [
                { text: "Nombre", align: "center", sortable: true, value: "nombre", },
                { text: "Apellido", align: "center", sortable: true, value: "apellido", },
                { text: "Entrada", align: "center", sortable: true, value: "entrada", },
                { text: "Salida", align: "center", sortable: true, value: "salida", },
                { text: "Fecha", align: "center", sortable: true, value: "fecha", },
                { text: "Estado", align: "center", sortable: true, value: "estado", },
                { text: "Área", align: "center", sortable: true, value: "descripcion_area", },
                { text: "Universidad", align: "center", sortable: true, value: "nombre_universidad", },

            ],
            rules: {
                required: value => !!value || 'Requerido.',
            },
        }
    },

    async created() {
        await this.listarAreas();
        await this.listarUniversidades();
        this.disableButton = false;
        this.loadingBuscar = false;
        this.loadingDate = false;
    },

    computed: {
        dateRangeText() {
            return this.dates.join(' ~ ')
        },
    },

    methods: {
        async listarAreas() {
            try {
                this.disableButton = true;
                this.loadingDate = true;
                let r = await this.$store.state.services.areaService.listar();
                console.log('AREAS', r.data.data);
                if (r.status === 200) {
                    this.itemsArea = r.data.data;
                    this.itemsArea.unshift({ id: -1, descripcion_area: 'TODOS' });
                } else {
                    this.$toast.error('A OCURRIDO UN ERROR AL INTENTAR OBTENER LAS AREAS', { position: "top-right" });
                }
            } catch (error) {
                this.$toast.error('A OCURRIDO UN ERROR AL INTENTAR OBTENER LAS AREAS', { position: "top-right" });
            }
        },

        async listarUniversidades() {
            try {
                this.disableButton = true;
                this.loadingDate = true;
                let r = await this.$store.state.services.universidadService.listar();
                console.log('UNIVERSIDADES', r.data.data);
                if (r.status === 200) {
                    this.itemsUniversidades = r.data.data;
                    this.itemsUniversidades.unshift({ id: -1, nombre_universidad: 'TODOS' });
                } else {
                    this.$toast.error('A OCURRIDO UN ERROR AL INTENTAR OBTENER LAS UNIVERSIDADES', { position: "top-right" });
                }
            } catch (error) {
                this.$toast.error('A OCURRIDO UN ERROR AL INTENTAR OBTENER LAS UNIVERSIDADES', { position: "top-right" });
            }
        },

        async buscarReporte() {
            try {
                this.disableButton = true;
                this.loadingBuscar = true;
                console.log('this.buscar', { estado: this.estado, fechas: this.dates, area: this.area, universidad: this.universidad });
                let r = await this.$store.state.services.reportesService.reporteLicencias({ estado: this.estado, fechas: this.dates, area: this.area, universidad: this.universidad });
                console.log('r.data. REPORTE');
                console.log(r.data);
                this.reporte = r.data.data;
                this.disableButton = false;
                this.loadingBuscar = false;
                this.disableButton = false;
                this.disableExport = false;
            } catch (error) {
                this.disableButton = false;
                this.loadingBuscar = false;
                this.$toast.error('Ocurrio un error al intentar obtener el reporte', { position: "top-right" });
            }
        },


        /* async buscarPresentacion(producto, anio) {
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
        }, */

        /*         async exportarReporte() {
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
                            document.body.appendChild(link)
                            link.click()
                            this.loading = false;
                            this.disableButton = false;
                            this.disableExport = false;
                            this.$toast.success(`Reporte generado.`, { timeout: 3000, position: "top-right" });
                        })
                        .catch((e) => {
                            this.loading = false;
                            this.disableButton = false;
                            this.disableExport = false;
                            if (e.response) {
                                this.$toast.error(e.response.data.message, { position: 'top-right' });
                            }
                        });
                }, */

        exportarExcel() {
            let info = [];
            this.reporte.forEach(element => {
                var estadoEx = '';
                if (element.estado == 1) {
                    estadoEx = 'A TIEMPO';
                } else if (element.estado == -1) {
                    estadoEx = 'FALTA';
                } else {
                    estadoEx = 'TARDE';
                }
                let data = {
                    NOMBRE: element.nombre,
                    APELLIDO: element.apellido,
                    ENTRADA: element.entrada,
                    SALIDA: element.salida,
                    FECHA: element.fecha,
                    ESTADO: estadoEx,
                    AREA: element.descripcion_area,
                    UNIVERSIDAD: element.nombre_universidad,
                };
                info.push(data);
            });
            console.log('REPORTE EXCEL', info);
            let data = XLSX.utils.json_to_sheet(info)
            const workbook = XLSX.utils.book_new()
            const filename = 'REPORTE PRACTICANTES';
            XLSX.utils.book_append_sheet(workbook, data, filename)
            XLSX.writeFile(workbook, `${filename}.xlsx`)
        },


        async exportarPDF() {
            var doc = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'legal',
                //  putOnlyUsedFonts:true
            })


            doc.setFontSize(10)

            autoTable(doc, {
                head: [['NOMBRE', 'APELLIDO', 'ENTRADA', 'SALIDA', 'FECHA', 'ESTADO', 'AREA', 'UNIVERSIDAD']],
                body: this.reporte.map((item) => {
                    var estadoEx = '';
                    if (item.estado == 1) {
                        estadoEx = 'A TIEMPO';
                    } else if (item.estado == -1) {
                        estadoEx = 'FALTA';
                    } else {
                        estadoEx = 'TARDE';
                    }
                    return [
                        
                        item.nombre,
                        item.apellido,
                        item.entrada,
                        item.salida,
                        item.fecha,
                        estadoEx,
                        item.descripcion_area,
                        item.nombre_universidad,
                    ]
                }),
            })
            doc.save('prueba.pdf')
            // doc.output("dataurlnewwindow");
        },
    }
}