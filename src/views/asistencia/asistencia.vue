<template>
  <div>
    <div class="row justify-content-center">
      <div class="p-0 mb-10">
        <v-toolbar dark color="var(--just-gray)">
          <v-toolbar-title class="ml-3">
            <strong style="font-size: 30px; letter-spacing: 3px">
              ASISTENCIA
            </strong>
            </v-toolbar-title
          >
        </v-toolbar>
      </div>
    </div>
    <div class="card">
      <div class="row p-5">
        <div class="col-md-12">
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
            <v-icon v-else-if="item.estado == -1" color="red">timer_off</v-icon>
            <v-icon v-else-if="item.estado == -2" color="warning">alarm_off</v-icon>
          </template>
          </v-data-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./asistencia.js"></script>
