<template>
  <v-app>
    <v-main>
      <div class="login">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-8 col-sm-12 posicion">
              <v-card class="md-elevation-3 rounded-card p-3">
                <!-- LOGO MEM -->
                <div class="text-center">
                  <div>
                    <img
                      style="content: var(--logoMEM)"
                      class="p-0 mt-3 mb-3"
                    />
                  </div>
                  <div class="md-title">
                    <strong>LOGIN<br /></strong>
                  </div>
                </div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="user"
                    append-icon="pin"
                    maxlength="13"
                    v-model="login.user"
                    :rules="[(value) => !!value || 'El user es requerido.']"
                  ></v-text-field>

                  <v-text-field
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :rules="[
                      (value) => !!value || 'La contraseña es requerida.',
                    ]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Contraseña"
                    counter
                    @click:append="show1 = !show1"
                    v-model="login.password"
                    @keydown.enter="auth()"
                  ></v-text-field>
                  <br />
                </v-form>

                <!-- REDIRECT , INICIAR SESIÓN -->
                <div
                  class="actions md-layout md-alignment-center-space-between"
                ></div>

                <div class="actions md-layout md-alignment-center">
                  <v-btn
                    class="ma-2 rounded-pill"
                    color="primary"
                    block
                    @click="auth"
                    >Iniciar Sesión</v-btn
                  >
                </div>
              </v-card>
            </div>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script src="./login.js"></script>



