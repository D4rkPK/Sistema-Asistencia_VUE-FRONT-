<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-12">
        <v-alert
          color="var(--hospital-pants)"
          dark
          border="left"
          transition="scale-transition"
          class="text-center fs-2"
        >
          PRACTICANTES
        </v-alert>
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
          <hr />
          <v-btn
            block
            color="primary"
            elevation="2"
            large
            @click="dialogForm(null)"
          >
            Registrar un nuevo practicante
          </v-btn>

          <v-data-table
            :loading="loading"
            :search="search"
            :headers="headers"
            :items="listado"
            :items-per-page="20"
            :footer-props="{ 'items-per-page-options': [20, 50, 100] }"
            class="elevation-1"
          >
            <template v-slot:[`item.acciones`]="{ item }">
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="dialogForm(item)"
                    v-bind="attrs"
                    v-on="on"
                    fab
                    icon
                    dark
                    small
                    color="orange"
                  >
                    <v-icon dark class="text-center"> edit </v-icon>
                  </v-btn>
                </template>
                <span>Editar</span>
              </v-tooltip>
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="eliminar(item)"
                    v-bind="attrs"
                    v-on="on"
                    fab
                    icon
                    dark
                    small
                    color="red"
                  >
                    <v-icon dark class="text-center"> delete </v-icon>
                  </v-btn>
                </template>
                <span>Eliminar</span>
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
            <span class="text-h5"> {{ type }} estudiante </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-if="type === 'Crear'"
                    v-model="estudiante.cui"
                    :rules="[rules.required, rules.cui]"
                    label="DPI*"
                    counter
                    type="text"
                    maxlength="13"
                  ></v-text-field>
                  <v-text-field
                    v-if="type === 'Editar'"
                    v-model="estudiante.cui"
                    label="CUI"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="estudiante.correo"
                    :rules="[rules.required, rules.correo]"
                    label="correo*"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="estudiante.carne"
                    :rules="[rules.required, rules.carne]"
                    label="Carne*"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="estudiante.nombre"
                    :rules="[rules.required]"
                    label="Nombre*"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="estudiante.apellido"
                    label="Apellido*"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-select
                    v-model="estudiante.area_id"
                    :rules="[rules.required]"
                    :items="itemAreas"
                    item-text="descripcion"
                    item-value="id"
                    label="Area*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    v-model="estudiante.universidad_id"
                    :rules="[rules.required]"
                    :items="itemUniversidades"
                    item-text="nombre"
                    item-value="id"
                    label="Universidad*"
                    required
                  ></v-select>
                </v-col>
                 <v-col cols="12" sm="6" md="6">
                  <v-btn  v-if="type === 'Crear'"
                  color="blue darken-1"
                  text
                  @click="FingerprintSdkTest()" >
                    Insertar Huella
                  </v-btn>
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
            v-if="type === 'Crear'"
            color="blue darken-1"
            text
            @click="confirmarGuardar()"
          >
            Guardar
          </v-btn>
          <v-btn
            v-if="type === 'Editar'"
            color="blue darken-1"
            text
            @click="confirmarEditar()"
          >
            Actualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog confirmacion -->
    <v-dialog v-model="dialogConfirm" persistent max-width="300px">
      <v-card>
        <v-card-title class="text-h5">
          Esta seguro que desea eliminar este estudiante
        </v-card-title>
        <v-card-text v-if="item != null">
          <strong>CUI:</strong>{{ item.cui }} <br />
          <strong>Nombre:</strong>{{ item.primer_nombre }} <br />
          <strong>Apellido:</strong>{{ item.primer_apellido }} <br />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogConfirm = false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="confirmarEliminar(item)">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script src="es6-shim.js"></script>
<script src=" websdk.client.bundle.min.js"></script>
<script src=" fingerprint.sdk.min.js"></script>
<script src="./practicantes.js"></script>
