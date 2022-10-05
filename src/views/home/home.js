export default {
  data: () => ({
    alignments: [
      'start',
      'center',
      'end',
    ],
  }),
  methods: {
    async FingerprintSdk() {

      try {
        this.loading = true;
        console.log("FingerprintSdk");

        await this.$store.state.services.practicantesService.eliminarTemp()
          .then(async () => {
          })
          .catch((e) => {
            if (e.response) {
              this.$toast.error(e.response.data.message, { position: 'top-right' });
            }
          });
          this.loading = false;
          let r = await this.$store.state.services.practicantesService.openFingerPrint();
      } catch (error) {
        this.loading = false;
        this.$toast.error('Ocurrio un error al abrir el ejecutable', { position: "top-right" });
      }
    }
  },
}