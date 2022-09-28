import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export default {
  data() {
    return {
      dates: ["", ""],
      menu2: false,
      loading: false,
      loadingBuscar: false,
      disableButton: false,
      disableExport: true,

      estado: null,
      area: null,
      universidad: null,
      itemsEstados: [
        { id: 2, nombre: "TODOS" },
        { id: 1, nombre: "A TIEMPO" },
        { id: -2, nombre: "TARDE" },
        { id: -1, nombre: "FALTANTE" },
      ],
      itemsArea: [],
      itemsUniversidades: [],
      reporte: [],
      headers: [
        { text: "Nombre", align: "center", sortable: true, value: "nombre" },
        {
          text: "Apellido",
          align: "center",
          sortable: true,
          value: "apellido",
        },
        { text: "Entrada", align: "center", sortable: true, value: "entrada" },
        { text: "Salida", align: "center", sortable: true, value: "salida" },
        { text: "Fecha", align: "center", sortable: true, value: "fecha" },
        { text: "Estado", align: "center", sortable: true, value: "estado" },
        {
          text: "Área",
          align: "center",
          sortable: true,
          value: "descripcion_area",
        },
        {
          text: "Universidad",
          align: "center",
          sortable: true,
          value: "nombre_universidad",
        },
      ],
      rules: {
        required: (value) => !!value || "Requerido.",
        dateRange: (value) => {
          if (this.dates[0] > this.dates[1]) {
            return "La fecha inicio no puede ser mayor a la fin";
          }
          return true;
        },
      },
    };
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
      return this.dates.join(" - ");
    },
  },

  methods: {
    async listarAreas() {
      try {
        this.disableButton = true;
        this.loadingDate = true;
        let r = await this.$store.state.services.areaService.listar();
        console.log("AREAS", r.data.data);
        if (r.status === 200) {
          this.itemsArea = r.data.data;
          this.itemsArea.unshift({ id: -1, descripcion_area: "TODOS" });
        } else {
          this.$toast.error(
            "A OCURRIDO UN ERROR AL INTENTAR OBTENER LAS AREAS",
            { position: "top-right" }
          );
        }
      } catch (error) {
        this.$toast.error("A OCURRIDO UN ERROR AL INTENTAR OBTENER LAS AREAS", {
          position: "top-right",
        });
      }
    },

    async listarUniversidades() {
      try {
        this.disableButton = true;
        this.loadingDate = true;
        let r = await this.$store.state.services.universidadService.listar();
        console.log("UNIVERSIDADES", r.data.data);
        if (r.status === 200) {
          this.itemsUniversidades = r.data.data;
          this.itemsUniversidades.unshift({
            id: -1,
            nombre_universidad: "TODOS",
          });
        } else {
          this.$toast.error(
            "A OCURRIDO UN ERROR AL INTENTAR OBTENER LAS UNIVERSIDADES",
            { position: "top-right" }
          );
        }
      } catch (error) {
        this.$toast.error(
          "A OCURRIDO UN ERROR AL INTENTAR OBTENER LAS UNIVERSIDADES",
          { position: "top-right" }
        );
      }
    },

    async buscarReporte() {
      if (this.$refs.form.validate()) {
        try {
          /* rule validar */

          this.disableButton = true;
          this.loadingBuscar = true;
          console.log("this.buscar", {
            estado: this.estado,
            fechas: this.dates,
            area: this.area,
            universidad: this.universidad,
          });
          let r =
            await this.$store.state.services.reportesService.reporteLicencias({
              estado: this.estado,
              fechas: this.dates,
              area: this.area,
              universidad: this.universidad,
            });
          console.log("r.data. REPORTE");
          console.log(r.data);
          this.reporte = r.data.data;
          this.disableButton = false;
          this.loadingBuscar = false;
          this.disableButton = false;
          this.disableExport = false;
        } catch (error) {
          this.disableButton = false;
          this.loadingBuscar = false;
          this.$toast.error("Ocurrio un error al intentar obtener el reporte", {
            position: "top-right",
          });
        }
      }
    },

    exportarExcel() {
      let info = [];
      this.reporte.forEach((element) => {
        var estadoEx = "";
        if (element.estado == 1) {
          estadoEx = "A TIEMPO";
        } else if (element.estado == -1) {
          estadoEx = "FALTA";
        } else {
          estadoEx = "TARDE";
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
      console.log("REPORTE EXCEL", info);
      let data = XLSX.utils.json_to_sheet(info);
      const workbook = XLSX.utils.book_new();
      const filename = "REPORTE PRACTICANTES";
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },

    async exportarPDF() {
      var doc = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "legal",
        //  putOnlyUsedFonts:true
      });

      doc.setFontSize(10);
      const pageCount = doc.internal.getNumberOfPages();
          for(let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            const pageSize = doc.internal.pageSize;
            const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            const header = 'REPORTE PRACTICANTES ' + this.dateRangeText;
            const footer = `Página ${i} de ${pageCount}`;
            // Header
            doc.text(header, pageWidth / 2, 10, { align: 'right' });
            // Footer
            doc.text(footer, pageWidth / 2 - (doc.getTextWidth(footer) / 2), pageHeight - 15, { baseline: 'bottom' });
        }
        
    
      autoTable(doc, {
        head: [
          [
            "NOMBRE",
            "APELLIDO",
            "ENTRADA",
            "SALIDA",
            "FECHA",
            "ESTADO",
            "AREA",
            "UNIVERSIDAD",
          ],
        ],
        body: this.reporte.map((item) => {
          var estadoEx = "";
          if (item.estado == 1) {
            estadoEx = "A TIEMPO";
          } else if (item.estado == -1) {
            estadoEx = "FALTA";
          } else {
            estadoEx = "TARDE";
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
          ];
        }),
      });
      doc.save("Reporte.pdf");
    },
  },
};
