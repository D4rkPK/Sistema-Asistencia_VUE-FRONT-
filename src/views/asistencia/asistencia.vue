<template>
  <div>
    <div class="row justify-content-center">
      <div class="p-0 mb-10">
        <v-toolbar dark color="var(--just-gray)">
          <v-toolbar-title class="ml-3">
            <strong style="font-size: 30px; letter-spacing: 3px">
              ASISTENCIA
            </strong>
          </v-toolbar-title>
        </v-toolbar>
      </div>
    </div>
    <div class="card">
      <div class="row p-5">
        <div class="col-md-12">
          <v-form ref="form">
            <div class="row">
              <div class="col-md-3">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="fecha"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="fecha"
                      label="Seleccionar fecha"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[rules.required]"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="fecha" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(fecha)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </div>
              <div class="col-md-3">
                <v-btn
                  class="ma-2"
                  :loading="loading"
                  block
                  color="primary"
                  elevation="2"
                  large
                  @click="validarFaltantes(fecha)"
                >
                  Validar Faltantes
                  <v-icon class="mx-1">schedule</v-icon>
                </v-btn>
              </div>
            </div>
          </v-form>

          <hr class="mb-0" />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            class="col-12"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
          <hr class="mb-0" />
          <v-data-table
            :loading="loading"
            :search="search"
            :headers="headers"
            :items="listado"
            :items-per-page="20"
            :footer-props="{ 'items-per-page-options': [20, 50, 100] }"
            class="elevation-1 mt-0"
          >
            <template v-slot:[`item.estado`]="{ item }">
              <v-icon v-if="item.estado == 1" color="green">alarm_on</v-icon>
              <v-icon v-else-if="item.estado == -1" color="red"
                >timer_off</v-icon
              >
              <v-icon v-else-if="item.estado == -2" color="warning"
                >alarm_off</v-icon
              >
            </template>
          </v-data-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./asistencia.js"></script>
