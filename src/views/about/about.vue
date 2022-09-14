<template>
  <div>
    <div class="row justify-content-center">
      <div class="p-0 mb-10">
        <v-toolbar dark color="var(--just-gray)">
          <v-toolbar-title class="ml-3">
            <strong style="font-size: 30px; letter-spacing: 3px"
              >INFORMACIÓN</strong
            >
          </v-toolbar-title>
        </v-toolbar>
      </div>
    </div>
    <template>
      <v-carousel
        cycle
        height="680"
        interval="5000"
        hide-delimiter-background
        hide-delimiters
        show-arrows-on-hover
      >
        <v-carousel-item v-for="i in 2" :key="i">
          <div v-if="i === 1">
            <h3
              class="mb-10"
              style="
                width: 100%;
                text-align: center;
                font-weight: bold;
                letter-spacing: 2px;
                font-size: 2.3rem;
              "
            >
              EQUIPO DE DESARROLLO
            </h3>
            <v-row>
              <v-col cols="12" sm="6" md="3" align="center">
                <v-card max-width="344">
                  <v-img
                    src="https://i.postimg.cc/13Pb5sLW/000-1.webp"
                    height="400px"
                  ></v-img>
                  <h5 class="p-3 m-0" style="font-weight: 600">
                    Brandon Josué Pineda Chacón
                  </h5>
                  <v-card-text>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="title"
                          >Desarrollador Front-End</v-list-item-title
                        >
                        <span
                          >1190-18-5755</span
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3" align="center">
                <v-card max-width="344">
                  <v-img
                    src="https://i.postimg.cc/mDc56DHr/0d2abc23-5552-4e82-8854-3e01daf1590f.webp"
                    height="400px"
                  ></v-img>
                  <h5 class="p-3 m-0" style="font-weight: 600">
                    Jonathan René Cameros Vargas
                  </h5>
                  <v-card-text>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="title"
                          >Desarrollador Back-End</v-list-item-title
                        >
                        <span
                          >1190-18-9120</span
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3" align="center">
                <v-card max-width="344">
                  <v-img
                    src="https://i.postimg.cc/Xv1P8FXh/3e2b4aff-11d8-4338-a5c7-b659a44a8169-1.webp"
                    height="400px"
                  ></v-img>
                  <h5 class="p-3 m-0" style="font-weight: 600">
                    José Carlos Díaz López
                  </h5>
                  <v-card-text>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="title"
                          >Analista Desarrollador</v-list-item-title
                        >
                        <span
                          >1190-18-7959</span
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3" align="center">
                <v-card max-width="344">
                  <v-img
                    src="https://i.postimg.cc/0jFRXWxK/24b4cc39-448d-4f5f-9fb9-d737d7f647d5.webp"
                    height="400px"
                  ></v-img>
                  <h5 class="p-3 m-0" style="font-weight: 600">
                    José Mario Ayala Resuleu
                  </h5>
                  <v-card-text>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="title"
                          >Aseguramiento de la Cálidad </v-list-item-title
                        >
                        <span
                          >1190-18-3953</span
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <div v-else>
            <h3
              class="mb-10"
              style="
                width: 100%;
                text-align: center;
                font-weight: bold;
                letter-spacing: 2px;
                font-size: 2.3rem;
              "
            >
              ASESORES TÉCNICOS
            </h3>
            <v-row>
              <v-col cols="12" sm="12" md="4" align="center">
                <v-card max-width="344">
                  <v-img
                    src="https://i.postimg.cc/y6F74hpz/120660092-5230988036926582-8618727796326523289-n.webp"
                    height="400px"
                  ></v-img>
                  <h5 class="p-3 m-0" style="font-weight: 600">
                    <span>Doc.</span>
                    José Alejandro Chinchilla
                  </h5>
                  <v-card-text>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="title"
                          >Coordinador del Proyecto</v-list-item-title
                        >
                        <span
                          >COORDINADOR DE LA FACULTAD DE INGENIERIA EN SISTEMAS</span
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="12" md="4" align="center">
                <v-card max-width="344">
                  <v-img
                    src="https://i.postimg.cc/L622HqGg/240590443-3071602769792322-8812601941538559241-n.webp"
                    height="400px"
                  ></v-img>
                  <h5 class="p-3 m-0" style="font-weight: 600">
                    <span>Ing.</span>
                    Obed Monteros
                  </h5>
                  <v-card-text>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="title"
                          >Cálidad de Software</v-list-item-title
                        >
                        <span
                          >ASEGURAMIENTO DE LA CALIDAD DE
                          SOFTWARE</span
                        >
                        
                      </v-list-item-content>
                    </v-list-item>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="12" md="4" align="center">
                <v-card max-width="344">
                  <v-img
                    src="https://i.postimg.cc/FzgvymkK/69272518-2700077846669552-6146625175883350016-n.webp"
                    height="400px"
                  ></v-img>
                  <h5 class="p-3 m-0" style="font-weight: 600">
                    <span>Ing. </span>
                    Juan Antonio Posadas
                  </h5>
                  <v-card-text>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="title"
                          >Project Manager</v-list-item-title
                        >
                        <span
                          >SEMINARIO DE TECNOLOGÍAS DE
                          INFORMACIÓN</span
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-carousel-item>
      </v-carousel>
    </template>
    <template> </template>
  </div>
</template>
  <script src="./about.js"></script>