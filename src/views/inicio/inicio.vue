<template>
  <v-container>
    <div class="row justify-content-center">
      <div class="col-md-12">
        <v-alert
          color="#29b5f6de"
          dark
          border="top"
          transition="scale-transition"
          class="text-center fs-2"
        >
          INICIO
        </v-alert>
      </div>
    </div>
    <div class="row">
      <div v-for="(x, i) in sistemas" :key="i" class="col-md-4">
        <card
          :titulo_pequeno="'Trámites'"
          :titulo_grande="x.descripcion.toUpperCase()"
          :icono="x.icon"
          :abreviatura="x.abreviatura"
          :no_imagen="x.image"
          :redirect="x.path"
          :sistema_id="x.id"
          class="animated zoomIn"
        ></card>
      </div>
    </div>
  </v-container>
</template>
<script src="./inicio.js"></script>