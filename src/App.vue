<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
:root {
  /* COLORS */
--white: #ffffff;
--black: #000000;
--deep-blue-hospital: #0c479d;
--hospital-pants: #94b6e6;
--hospital-walls: #e8f1fb;
--just-gray: #3e3e3e;
--hospital-blues: #7f9db9;

 /* IMG */
 --logo: url(https://i.postimg.cc/nVGTs6R1/image.webp);

/* FONTS */
--sm: 14px;
--md: 16px;
--lg: 18px;
--en: 100px;
}
</style>