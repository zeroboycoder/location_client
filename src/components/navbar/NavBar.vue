<template>
  <v-app-bar style="background-color: white">
    <v-container>
      <v-row>
        <v-col cols="4" class="d-flex align-center">
          <div
            class="text-h5 font-weight-bold"
            @click="goTo('/')"
            style="cursor: pointer"
          >
            Operation
          </div>
        </v-col>
        <v-col class="d-flex align-center justify-end nav_items">
          <div class="text-h6" @click="goTo('/auth')">Sign in</div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.logo {
  height: 80%;
}
.nav_items > div {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 0.7rem;
  font-size: 18px;
  cursor: pointer;
}
.nav_items > div:hover,
.nav_items > div:active {
  color: var(--simbolo_red);
}
div.contact_us {
  color: white;
  background-color: black;
  border-radius: 10px;
  margin-left: 12px;
  width: 130px;
  height: 40px;
}
div.contact_us:hover {
  color: white;
}
</style>
