<template>
  <v-container>
    <div class="row justify-content-center">
      <div class="col-md-12">
        <v-alert
          color="var(--hospital-blues)"
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
<!--     <v-dialog v-model="dialog" persistent max-width="1000px">
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="text-h5"> {{ type }} Usuario </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-if="type === 'Crear'"
                    v-model="usuario.cui"
                    :rules="[rules.required, rules.cui]"
                    label="CUI*"
                    counter
                    type="text"
                    maxlength="13"
                  ></v-text-field>
                  <v-text-field v-if="type === 'Editar'"
                    disabled = "true"
                    v-model="usuario.cui"
                    label="CUI"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="usuario.email"
                    :rules="[rules.required, rules.email]"
                    label="Email*"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-model="usuario.primer_nombre"
                    :rules="[rules.required]"
                    label="Primer nombre*"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-model="usuario.segundo_nombre"
                    label="Segundo nombre"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-model="usuario.primer_apellido"
                    :rules="[rules.required]"
                    label="Primer apellido*"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-model="usuario.segundo_apellido"
                    label="Segundo apellido"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-select
                    v-model="usuario.area_id"
                    :rules="[rules.required]"
                    :items="itemAreas"
                    item-text="descripcion"
                    item-value="id"
                    label="Unidad*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    v-model="usuario.rol_id"
                    :rules="[rules.required]"
                    :items="itemPuestos"
                    item-text="rol"
                    item-value="id_rol"
                    label="Puesto*"
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
    </v-dialog> -->

    <!-- Dialog confirmacion -->
<!--     <v-dialog v-model="dialogConfirm" persistent max-width="300px">
      <v-card>
        <v-card-title class="text-h5">
          Esta seguro que desea eliminar este usuario
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
    </v-dialog> -->
  </v-container>
</template>

<script src="./practicantes.js"></script>