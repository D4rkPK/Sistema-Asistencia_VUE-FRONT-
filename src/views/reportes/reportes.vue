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
                    v-model="value"
                    :rules="[rules.required]"
                    :loading="loadingBuscar"
                    :items="years"
                    item-text="anio"
                    prepend-icon="schedule"
                    label="Seleccionar Estado*"
                    @change="disableExport = true"
                    :disabled="disableButton"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-autocomplete
                    v-model="buscarProducto"
                    :rules="[rules.required]"
                    :loading="loadingBuscar"
                    :items="productos"
                    item-text="descripcion"
                    item-value="id"
                    prepend-icon="mdi-calendar"
                    label="Seleccionar Período*"
                    @change="disableExport = true"
                    :disabled="disableButton"
                    required
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-autocomplete
                    v-model="buscarLicencia"
                    :rules="[rules.required]"
                    :loading="loadingBuscar"
                    :items="licencias"
                    item-text="numero_licencia"
                    return-object
                    prepend-icon="medical_information"
                    label="Seleccionar Área*"
                    @change="
                      changeLicencia(buscarLicencia), (disableExport = true)
                    "
                    :disabled="disableButton"
                    required
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-autocomplete
                    v-model="buscarLicencia"
                    :rules="[rules.required]"
                    :loading="loadingBuscar"
                    :items="licencias"
                    item-text="numero_licencia"
                    return-object
                    prepend-icon="school"
                    label="Seleccionar Universidad*"
                    @change="
                      changeLicencia(buscarLicencia), (disableExport = true)
                    "
                    :disabled="disableButton"
                    required
                  ></v-autocomplete>
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
                    @click="buscarPresentacion(buscarProducto, value)"
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
                    @click="exportarExcelAnual()"
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
            :search="search"
            :headers="headers"
            :items="listado"
            :items-per-page="-1"
            :hide-default-footer="true"
            class="elevation-1 mt-0"
          >
          </v-data-table>
        </div>
      </div>
    </div>
  </div>
</template>
  <script src="./reportes.js"></script>