<template>
  <div class="thealert">
    <transition name="slide-y-transition">
      <v-alert v-model="alert" :type="type" closable>{{ text }}</v-alert>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alert: false,
      text: null,
      type: "success",
    };
  },
  methods: {
    showAlert(args) {
      this.text = args.text;
      this.type = args.type;
      setTimeout(() => {
        this.alert = false;
      }, 3000);
      this.alert = true;
    },
  },
  mounted() {
    this.$eventBus.$on("show-alert-success", (args) =>
      this.showAlert({ text: args.message, type: "success" })
    );
    this.$eventBus.$on("show-alert-error", (args) =>
      this.showAlert({ text: args.message, type: "error" })
    );
  },
};
</script>

<style scoped>
.thealert {
  position: fixed;
  top: 0;
  z-index: 99999;
  width: 100%;
}
</style>
