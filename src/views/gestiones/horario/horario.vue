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
                    ref="time1"
                    v-model="time1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time1"
                    transition="scale-transition"
                    offset-y
                    max-width="200px"
                    min-width="200px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="horario.hora_entrada"
                        label="Seleccione Hora de Entrada*"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-card 
                    >
                      <v-card-title class="primary white--text"
                        >Seleccionar Hora</v-card-title
                      >
                      <v-card-text class="pt-4">
                        <v-layout justify-center align-center>
                          <v-layout
                            align-center
                            justify-center
                            style="max-width: 100px"
                          >
                            <v-layout column align-center>
                              <v-btn
                                icon
                                class="my-0"
                                style="position: relative; bottom: 4px"
                                @click="onAddHourClicked"
                              >
                                <v-icon large>keyboard_arrow_up</v-icon>
                              </v-btn>
                              <v-text-field
                                v-model="hourModel"
                                style="width: 40px"
                                class="pt-0 my-0 no-underline centered-input"
                                type="number"
                                hide-spin-buttons
                                :min="minHour"
                                :max="maxHour"
                                step="1"
                                required
                                hide-details
                              ></v-text-field>
                              <v-btn
                                icon
                                class="my-0"
                                style="position: relative; top: 8px"
                                @click="onSubtractHourClicked"
                              >
                                <v-icon large>keyboard_arrow_down</v-icon>
                              </v-btn>
                            </v-layout>

                            <div
                              class="grey--text"
                              style="
                                font-size: 18px;
                                position: relative;
                                bottom: 2px;
                              "
                            >
                              :
                            </div>
                            <v-layout align-center>
                              <v-layout column align-center>
                                <v-btn
                                  icon
                                  class="my-0"
                                  style="position: relative; bottom: 4px"
                                  @click="onAddMinuteClicked"
                                >
                                  <v-icon large>keyboard_arrow_up</v-icon>
                                </v-btn>
                                <v-text-field
                                  v-model="minuteModel"
                                  style="width: 40px"
                                  class="pt-0 my-0 no-underline centered-input"
                                  type="number"
                                  hide-spin-buttons
                                  :min="minMinute"
                                  :max="maxMinute"
                                  step="1"
                                  required
                                  hide-details
                                ></v-text-field>
                                <v-btn
                                  icon
                                  class="my-0"
                                  style="position: relative; top: 8px"
                                  @click="onSubtractMinuteClicked"
                                >
                                  <v-icon large>keyboard_arrow_down</v-icon>
                                </v-btn>
                              </v-layout>
                            </v-layout>
                          </v-layout>
                        </v-layout>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="time1 = false"
                          >Cerrar</v-btn
                        >
                        <v-btn color="primary" text @click="saveTime(1)" 
                          >Aceptar</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-menu
                    ref="time2"
                    v-model="time2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time2"
                    transition="scale-transition"
                    offset-y
                    max-width="200px"
                    min-width="200px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="horario.hora_salida"
                        label="Seleccione Hora de Salida*"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-card>
                      <v-card-title class="primary white--text"
                        >Seleccionar Hora</v-card-title
                      >
                      <v-card-text class="pt-4">
                        <v-layout justify-center align-center>
                          <v-layout
                            align-center
                            justify-center
                            style="max-width: 100px"
                          >
                            <v-layout column align-center>
                              <v-btn
                                icon
                                class="my-0"
                                style="position: relative; bottom: 4px"
                                @click="onAddHourClicked"
                              >
                                <v-icon large>keyboard_arrow_up</v-icon>
                              </v-btn>
                              <v-text-field
                                v-model="hourModel"
                                style="width: 40px"
                                class="pt-0 my-0 no-underline centered-input"
                                type="number"
                                hide-spin-buttons
                                :min="minHour"
                                :max="maxHour"
                                step="1"
                                required
                                hide-details
                              ></v-text-field>
                              <v-btn
                                icon
                                class="my-0"
                                style="position: relative; top: 8px"
                                @click="onSubtractHourClicked"
                              >
                                <v-icon large>keyboard_arrow_down</v-icon>
                              </v-btn>
                            </v-layout>

                            <div
                              class="grey--text"
                              style="
                                font-size: 18px;
                                position: relative;
                                bottom: 2px;
                              "
                            >
                              :
                            </div>
                            <v-layout align-center>
                              <v-layout column align-center>
                                <v-btn
                                  icon
                                  class="my-0"
                                  style="position: relative; bottom: 4px"
                                  @click="onAddMinuteClicked"
                                >
                                  <v-icon large>keyboard_arrow_up</v-icon>
                                </v-btn>
                                <v-text-field
                                  v-model="minuteModel"
                                  style="width: 40px"
                                  class="pt-0 my-0 no-underline centered-input"
                                  type="number"
                                  hide-spin-buttons
                                  :min="minMinute"
                                  :max="maxMinute"
                                  step="1"
                                  required
                                  hide-details
                                ></v-text-field>
                                <v-btn
                                  icon
                                  class="my-0"
                                  style="position: relative; top: 8px"
                                  @click="onSubtractMinuteClicked"
                                >
                                  <v-icon large>keyboard_arrow_down</v-icon>
                                </v-btn>
                              </v-layout>
                            </v-layout>
                          </v-layout>
                        </v-layout>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="time1 = false"
                          >Cancelar</v-btn
                        >
                        <v-btn color="primary" text @click="saveTime(2)" 
                          >Aceptar</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-menu>
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
          Esta seguro que desea eliminar este horario
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

<script src="./horario.js"></script>
<style scoped src="./horario.css"></style>
