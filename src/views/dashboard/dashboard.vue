<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-if="mostrarLateral"
      v-model="drawer"
      app
      :mini-variant="mini"
      style="
        position: fixed;
        top: 0;
        left: 0;
        background-color: var(--deep-blue-hospital);
      "
    >
      <template v-slot:prepend>
        <v-list-item>
          <strong style="text-align: center; color: var(--white)"
            >HOSPITAL REGIONAL DE ZACAPA</strong
          >
          <v-img style="content: var(--logo)" max-width="30%"></v-img>
        </v-list-item>
        <v-divider class="mt-0"></v-divider>
        <v-list-item><v-spacer></v-spacer></v-list-item>
      </template>

      <!-- MENU LATERAL -->
      <!--       <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item
            dark
            v-for="(i, key) in menus"
            :key="key"
            @click="pushRoute(i.path)"
          >
            <v-icon class="me-2">{{ i.icono }}</v-icon>
            <span>{{ i.nombre }}</span>
          </v-list-item>
        </v-list-item-group>
      </v-list> -->

      <div v-for="(x, i) in menus" :key="i">
        <!-- MENU -->
        <v-list-item
          dark
          @click="pushRoute(x.path)"
          v-if="x.submenu && x.submenu.length === 0"
        >
          <v-icon class="me-2">{{ x.icono }}</v-icon>
          <span>{{ x.nombre }}</span>
        </v-list-item>
        
        <!-- SUBMENU -->
        <v-list-group v-if="x.submenu && x.submenu.length > 0">
          <template v-slot:activator>
            <v-list-item-content
              style="color: white"
              class="animated fadeInLeft d-inline"
            >
              <v-list dark>
                <v-icon class="me-2">{{ x.icono }}</v-icon>
                <span>{{ x.nombre }}</span>
              </v-list>
            </v-list-item-content>
          </template>
          <v-list-item
            dark
            class="ms-5"
            @click="pushRoute(y.path)"
            v-for="(y, j) in x.submenu"
            :key="j"
          >
            <v-icon class="me-2">{{ y.icono }}</v-icon>
            <span>{{ y.nombre }}</span>
          </v-list-item>
        </v-list-group>
      </div>

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
          dark
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
      color="var(--white )"
      class="text-white p-0"
      elevation="0"
      v-bind="size"
    >
      <v-img
        style="magin-left: -1px; cursor: pointer; content: var(--logo)"
        max-height="100"
        max-width="240"
        contain
        v-if="!mostrarLateral"
        @click="redirectInicio()"
      ></v-img>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon
            style="color: var(--hospital-pants)"
            v-bind="attrs"
            v-on="on"
            v-if="mostrarLateral"
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
            class="mx-5"
            style="color: var(--hospital-pants)"
            v-bind="attrs"
            v-on="on"
            @click="selectionUserItems('/dashboard')"
            >home
          </v-icon>
        </template>
        <span>Menu Principal</span>
      </v-tooltip>

      <v-spacer></v-spacer>
      <div class="text-center" style="color: var(--just-gray)">
        <strong style="margin: 0 auto">
          <span>{{ userLogged.nombre + " " }}</span>
          <span>{{ userLogged.apellido }}</span>
        </strong>
        <br />
        <span>
          {{ userLogged.puesto.descripcion }}
        </span>
        <span> | {{ userLogged.area.descripcion }} </span>
      </div>
      <v-avatar class="ml-5" size="40">
        <v-img
          :src="
            'https://ui-avatars.com/api/?name=' +
            userLogged.nombre +
            '+' +
            userLogged.apellido
          "
          :alt="userLogged.nombre + '+' + userLogged.apellido"
        ></v-img>
      </v-avatar>
    </v-app-bar>

    <v-main>
      <!-- CONTENIDO -->
      <v-container fluid>
        <!-- GESTIONA LAS RUTAS HIJAS DEFINIDAS EN ROUTER -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <!-- FOOTER -->
    <v-footer :padless="true">
      <v-card flat tile width="100%" class="text-center">
        <v-card-text class="white--text">
          <strong style="color: var(--just-gray)">
            <a href="/about">ACDP</a>
            | Copyright ©
            <a target="_blank" href="https://www.umg.edu.gt"
              >Universidad Mariano Galvez de Guatemala</a
            >

            {{ new Date().getFullYear() }}
          </strong>
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
