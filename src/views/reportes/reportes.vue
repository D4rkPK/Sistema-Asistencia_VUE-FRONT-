<template>
  <div>
    <div class="row justify-content-center">
      <div class="p-0 mb-10">
        <v-toolbar dark color="var(--just-gray)">
          <v-toolbar-title class="ml-3">
            <strong style="font-size: 30px; letter-spacing: 3px"
              >REPORTES</strong
            >
          </v-toolbar-title>
        </v-toolbar>
      </div>
    </div>
    <div class="card">
      <div class="row p-5">
        <div class="col-md-12">
          <v-form ref="form">
            <v-card-title class="p-0 pl-5">
              <span class="title"><strong>Buscar por</strong></span>
            </v-card-title>
            <v-container class="m-0">
              <v-row>
                <v-col cols="12" sm="3" md="3">
                  <v-select
                    v-model="estado"
                    :rules="[rules.required]"
                    :loading="loadingBuscar"
                    :items="itemsEstados"
                    item-text="nombre"
                    item-value="id"
                    prepend-icon="schedule"
                    label="Seleccionar Estado*"
                    @change="disableExport = true"
                    :disabled="disableButton"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateRangeText"
                        label="Seleccionar Rango de Fechas*"
                        :rules="[rules.required]"
                        hint="Formato MM/DD/YYYY"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        @change="disableExport = true"
                        required
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dates"
                      range
                      no-title
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="menu2 = false"
                    >
                      Cerrar
                    </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-select
                    v-model="area"
                    :rules="[rules.required]"
                    :loading="loadingBuscar"
                    :items="itemsArea"
                    item-text="descripcion_area"
                    item-value="id"
                    prepend-icon="medical_information"
                    label="Seleccionar Área*"
                    @change="disableExport = true"
                    :disabled="disableButton"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-select
                    v-model="universidad"
                    :rules="[rules.required]"
                    :loading="loadingBuscar"
                    :items="itemsUniversidades"
                    item-text="nombre_universidad"
                    item-value="id"
                    prepend-icon="school"
                    label="Seleccionar Universidad*"
                    @change="disableExport = true"
                    :disabled="disableButton"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-btn
                    class="ma-2"
                    :loading="loading"
                    :disabled="disableButton"
                    block
                    color="primary"
                    elevation="2"
                    large
                    @click="buscarReporte()"
                  >
                    Buscar
                    <v-icon class="mx-1">search</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-btn
                    class="ma-2"
                    :loading="loading"
                    :disabled="disableExport"
                    block
                    color="warning"
                    elevation="2"
                    large
                    @click="exportarReporte()"
                  >
                    Exportar PDF
                    <v-icon class="mx-1">file_download</v-icon>
                  </v-btn>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <v-btn
                    class="ma-2"
                    :loading="loading"
                    :disabled="disableExport"
                    block
                    color="success"
                    elevation="2"
                    large
                    @click="exportarExcel()"
                  >
                    Exportar EXCEL
                    <v-icon class="mx-1">file_download</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <hr class="mb-0" />
          <v-data-table
            :loading="loading"
            item-key="reporte.id + Math.random()"
            :headers="headers"
            :items="reporte"
            :items-per-page="-1"
            :hide-default-footer="true"
            class="elevation-1 mt-0"
          >
          <template v-slot:[`item.estado`]="{ item }">
            <v-icon v-if="item.estado == 1" color="green">alarm_on</v-icon>
            <v-icon v-else-if="item.estado == -1" color="red">timer_off</v-icon>
            <v-icon v-else-if="item.estado == -2" color="warning">alarm_off</v-icon>
          </template>
          
          </v-data-table>
        </div>
      </div>
    </div>
  </div>
</template>
  <script src="./reportes.js"></script>