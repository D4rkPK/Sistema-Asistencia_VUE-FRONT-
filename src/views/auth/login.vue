<template>
  <section class="section-container">
    <v-row class="signin">
      <v-col cols="8" class="left">
        <v-btn class="back-btn" color="var(--deep-blue-hospital)" @click="$router.push('/')">
          Regresar</v-btn
        >
        <h1>HOSPITAL REGIONAL DE ZACAPA</h1>
      </v-col>
      <v-col cols="4" class="right">
        <h2>LOGIN</h2>

        <v-form ref="form">
          <v-text-field
            label="Usuario"
            required
            outlined
            dark
            filled
            dense
            v-model="login.cui"
            :rules="[(value) => !!value || 'El usuario es requerido.']"
          ></v-text-field>

          <v-text-field
            label="Contraseña"
            :append-icon="showPass ? 'visibility' : 'visibility_off'"
            @click:append="showPass = !showPass"
            required
            outlined
            dense
            dark
            filled
            :type="showPass ? 'text' : 'password'"
            v-model="login.password"
            :rules="[(value) => !!value || 'La contraseña es requerido.']"
            @keydown.enter="auth()"
          ></v-text-field>

          <div class="text-center">
            <v-btn
              class="signin-btn"
              rounded
              color="white"
              dark
              @click="auth()"
            >
              Ingresar
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </section>
</template>

<script src="./login.js"></script>
<style lang="scss" src="./login.scss"></style>




