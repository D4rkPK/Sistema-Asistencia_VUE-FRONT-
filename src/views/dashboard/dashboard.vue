<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-if="mostrarLateral"
      v-model="drawer"
      app
      :mini-variant="mini"
      style="position: fixed; top: 0; left: 0"
    >
      <template v-slot:prepend>
        <v-list-item>
          <v-img
            style="content: var(--logoMEM)"
            @click="redirectInicio()"
          ></v-img>
        </v-list-item>
        <div class="accordion-item accordion-flush">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <strong style="margin: 0 auto">
                <span>{{ userLogged.nombre + " " }}</span>
                <span>{{ userLogged.apellido }}</span>
              </strong>
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse show"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div class="text-center">
                <v-list-item-avatar
                  style="margin: 0 auto"
                  width="150"
                  height="150"
                >
                  <v-avatar size="150">
                    <img
                      width="150"
                      height="150"
                      :src="
                        'https://ui-avatars.com/api/?name=' +
                        userLogged.nombre +
                        '+' +
                        userLogged.apellido
                      "
                      :alt="userLogged.nombre + '+' + userLogged.apellido"
                    />
                  </v-avatar>
                </v-list-item-avatar>
              </div>
              <br />
              <hr />
              <span><strong>CUI: </strong>{{ userLogged.cui }}</span>
              <br />
              <span
                ><strong>Puesto: </strong>
                {{ userLogged.puesto.nombre_puesto }}
              </span>
              <br />
              <span
                ><strong>Area: </strong>
                {{ userLogged.area.descripcion }}
              </span>
            </div>
          </div>
        </div>
      </template>

      <!-- MENU LATERAL -->
      <v-list nav dense>
        <v-list-item-group v-model="group">
            <v-list-item v-for="(i, key) in menus" :key="key" @click="pushRoute(i.path)">
              <v-icon class="me-2">{{ i.icono }}</v-icon>
              <span>{{ i.nombre }}</span> 
            </v-list-item>
        </v-list-item-group>
      </v-list>

      <!-- CAMBIAR CONTRASEÑA -->
      <template v-slot:append>
        <!--         <v-list-item class="animated fadeInLeft zoomMenu" @click="changePass()">
          <v-list-item-icon>
            <v-icon v-text="'vpn_key'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="'Cambio de Contraseña'"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <!-- CERRAR SESION -->
        <v-list-item
          class="animated fadeInLeft zoomMenu"
          @click="cerrarSesion()"
        >
          <v-list-item-icon>
            <v-icon v-text="'logout'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="'Cerrar Sesión'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <!-- MENU BARRA -->
    <v-app-bar
      app
      class="blue darken-4 text-white p-0"
      elevation="5"
      v-bind="size"
    >
      <v-img
        style="magin-left: -1px; cursor: pointer; content: var(--logoMEM)"
        max-height="100"
        max-width="240"
        contain
        v-if="!mostrarLateral"
        @click="redirectInicio()"
      ></v-img>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon
            v-bind="attrs"
            v-on="on"
            v-if="mostrarLateral"
            class="text-white"
            @click="vista_menu()"
          ></v-app-bar-nav-icon>
        </template>
        <span v-if="drawer === true">Cerrar Tablero</span>
        <span v-if="drawer === false">Abrir Tablero</span>
      </v-tooltip>

      <!-- BOTON MENU PRINCIPAL -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            class="mx-5 text-white"
            dark
            v-bind="attrs"
            v-on="on"
            @click="selectionUserItems('/dashboard')"
            >radio_button_checked
          </v-icon>
        </template>
        <span>Menu Principal</span>
      </v-tooltip>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main style="background-color: #f7f7f7">
      <!-- CONTENIDO -->
      <v-container fluid>
        <!-- GESTIONA LAS RUTAS HIJAS DEFINIDAS EN ROUTER -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <!-- FOOTER -->
    <v-footer :padless="true">
      <v-card flat tile width="100%" class="blue darken-4 text-center">
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} —
          <strong
            >Ministerio de Energía y Minas - Departamento de Informática
            ©</strong
          >
        </v-card-text>
      </v-card>
    </v-footer>
    <!--     <dialog_cambiar_pass
      @cambio="cambio"
      @closeDialog="closeDialog"
      @cancelar="cancelar"
      :dialog="dialog"
    ></dialog_cambiar_pass> -->
  </v-app>
</template>

<script src="./dashboard.js"></script>