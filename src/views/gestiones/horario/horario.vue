<template>
  <div>
    <div class="row justify-content-center">
      <div class="p-0 mb-10">
        <v-toolbar dark color="var(--just-gray)">
          <v-toolbar-title class="ml-3">
            <strong style="font-size: 30px; letter-spacing: 3px"
              >HORARIOS</strong
            >
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
          <div class="mb-2" style="text-align: right">
            <v-btn
              color="primary"
              elevation="2"
              large
              @click="dialogForm(null)"
            >
              Crear nuevo Horario
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
            <span class="text-h5"> {{ type }} horario </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    v-model="horario.descripcion"
                    :rules="[rules.required]"
                    label="Nombre*"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="horario.hora_entrada"
                        label="Seleccione hora de entrada"
                        required
                        :rules="[rules.required]"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <digitalTimePicker
                      v-model="horario.hora_entrada"
                      :TitleName="'Hora de entrada'"
                      :Hour="'HORA'"
                      :Minute="'MIN'"
                    ></digitalTimePicker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-menu
                    ref="menu"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="horario.hora_salida"
                        label="Seleccione hora de salida"
                        required
                        :rules="[rules.required, rules.hora_salida]"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <digitalTimePicker
                      v-model="horario.hora_salida"
                      :TitleName="'Hora de salida'"
                      :Hour="'HORA'"
                      :Minute="'MIN'"
                    ></digitalTimePicker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog()">
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
          Esta seguro que desea eliminar este horario
        </v-card-title>
        <v-card-text v-if="item != null">
          <strong>Nombre:</strong>{{ item.descripcion }} <br />
          <strong>Hora de entrada:</strong>{{ item.hora_entrada }} <br />
          <strong>Hora de salida:</strong>{{ item.hora_salida }} <br />
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

<script src="./horario.js"></script>
