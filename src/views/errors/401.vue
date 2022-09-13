<template>
  <error text="401! NO TIENES ACCESO" />
</template>

<script>
import error from "../errors/error.vue";
export default {
  components: {
    error,
  },
  // name: "401",
};
</script>