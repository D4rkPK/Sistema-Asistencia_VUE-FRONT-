<template>
  <div>
    <div class="row justify-content-center">
      <div class="p-0 mb-10">
        <v-toolbar dark color="var(--just-gray)">
          <v-toolbar-title class="ml-3"
            ><strong style="font-size: 30px; letter-spacing: 3px"
              >PRACTICANTES</strong
            ></v-toolbar-title
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
          <hr />
          <div class="mb-2" style="text-align: right">
            <v-btn
              color="primary"
              elevation="2"
              large
              @click="dialogForm(null)"
            >
              Registrar un nuevo practicante
            </v-btn>
          </div>
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
                    :rules="[rules.required, rules.noNumeros]"
                    label="Nombre*"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="estudiante.apellido"
                    :rules="[rules.required, rules.noNumeros]"
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
                    label="Universidad"
                    :disabled="isUpdating"
                    filled
                    chips
                    color="blue-grey lighten-2"
                  >
                    <template v-slot:selection="data">
                        <span left>
                          <strong>{{ data.item.abreviatura }}&nbsp;</strong>
                        </span>
                        {{ data.item.nombre }}
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-item-content v-text="data.item"></v-list-item-content>
                      </template>
                      <template v-else>
                        <v-list-item-avatar>
                          <strong>{{ data.item.abreviatura }}</strong>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title
                            v-html="data.item.nombre"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn
                    v-if="type === 'Crear'"
                    color="blue darken-1"
                    text
                    @click="FingerprintSdkTest()"
                  >
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
    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title class="text-h5">
          ¿Esta seguro que desea eliminar este estudiante?
        </v-card-title>
        <v-card-text v-if="item != null">
          <strong>DPI: </strong>{{ item.cui }} <br />
          <strong>Nombre: </strong>{{ item.nombre }} <br />
          <strong>Apellido: </strong>{{ item.apellido }} <br />
          <strong>Área: </strong>{{ item.area.descripcion }} <br />
          <strong>Universidad: </strong>{{ item.universidad.nombre }} <br />
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

