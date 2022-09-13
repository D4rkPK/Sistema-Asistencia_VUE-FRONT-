<template>
  <div id="app">
    <router-view />
  </div>
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
--color-azul: #1589c2;
--color-textAzul: #152a4c;
--white: #ffffff;
--black: #000000;
--deep-blue-hospital: #005be7;
--hospital-pants: #004bc1;
--hospital-walls: #eeeff1;
--just-gray: #3e3e3e;
--hospital-blues: #6ed0f6;

 /* IMG */
 --logo: url(https://i.postimg.cc/nVGTs6R1/image.webp);

/* FONTS */
--sm: 14px;
--md: 16px;
--lg: 18px;
--en: 100px;
}


.v-list-group .v-icon.v-icon {
  color: white !important;
}
</style>