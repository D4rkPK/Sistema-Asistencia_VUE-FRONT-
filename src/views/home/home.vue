<template>
  <v-app>
    <v-main>
      <div class="home">
        <div class="container">
          <div class="text-subtitle-2 text-center">
            <h1>CONTROL ASISTENCIA</h1>
            <p>HOSPITAL REGIONAL DE ZACAPA</p>
          </div>
          <div class="row justify-content-center">
            <v-container fluid fill-height>
              <v-row no-gutters>
                <v-col cols="12" sm="6" md="6">
                  <v-card class="card cardDashboard mx-auto pa-4" max-width="400">
                    <v-card-text>
                      <strong
                        class="text-h4 text--primary"
                        style="font-weight: bold"
                        >Dashboard</strong
                      >
                      <div class="text--primary">
                        Gestiona permisos, asistencia y justificaciones.
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        width="150"
                        class="ma-2 rounded"
                        color="var(--deep-blue-hospital)"
                        dark
                        @click="$router.push('/login')"
                        >Iniciar Sesión</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-card
                    class="card cardAsistencia mx-auto pa-4"
                    max-width="400"
                    color="var(--deep-blue-hospital)"
                  >
                    <v-card-text>
                      <strong
                        class="text-h4"
                        style="color: var(--white); font-weight: bold"
                        >Marcar Asistencia</strong
                      >
                      <p class="text" style="color: var(--hospital-walls)">
                        Marca asistencias a los practicantes.
                      </p>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn width="150" color="var(--hospital-walls)">
                        Entrar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script src="./home.js"></script>
<style scoped lang="scss" src="./home.scss"></style>
