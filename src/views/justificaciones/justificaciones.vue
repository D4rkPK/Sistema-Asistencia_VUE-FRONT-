<template>
  <div>
    <div class="row justify-content-center">
      <div class="p-0 mb-10">
        <v-toolbar dark color="var(--just-gray)">
          <v-toolbar-title class="ml-3">
            <strong style="font-size: 30px; letter-spacing: 3px">
              JUSTIFICACIONES
            </strong>
          </v-toolbar-title>
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
            <template v-slot:[`item.estado_comentario`]="{ item }">
              <v-icon v-if="item.estado_comentario == '1'" color="green"
                >mdi-check</v-icon
              >
              <v-icon v-else-if="item.estado_comentario == '-1'" color="red"
                >mdi-close</v-icon
              >
              <v-icon v-else-if="item.estado_comentario == null" color="orange"
                >mdi-clock-outline</v-icon
              >
            </template>
            <template v-slot:[`item.acciones`]="{ item }">
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="justificar(item)"
                    v-bind="attrs"
                    v-on="on"
                    fab
                    icon
                    dark
                    small
                    color="primary"
                  >
                    <v-icon dark class="text-center"> description </v-icon>
                  </v-btn>
                </template>
                <span>Crear justificación</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </div>
      </div>
    </div>

    <!-- DIALOG editar o crear -->
    <v-dialog v-model="dialog" persistent max-width="1000px">
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="text-h5"> Justificar Falta </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="justificacion.comentario"
                    label="Comentario*"
                    type="text"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="justificacion.estado_comentario"
                    :items="ItemEstado_comentario"
                    item-text="text"
                    item-value="value"
                    label="Estado*"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="confirmarGuardar()"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script src="./justificaciones.js"></script>
