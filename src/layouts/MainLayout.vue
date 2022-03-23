<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <div class="header" :class="background">
        <q-toolbar>
          <q-toolbar-title>
            <div class="title">
              <b>{{ title }}</b>

              <span id="dark-mode-light-mode-icon" @click="setDarkMode"
                ><q-icon
                  v-if="background !== 'dark'"
                  name="light_mode"
                ></q-icon>
                <q-icon v-else name="dark_mode"></q-icon>
              </span>
            </div>
          </q-toolbar-title>
        </q-toolbar>
      </div>
    </q-header>

    <div class="content">
      <q-page-container :class="background">
        <router-view :background="background" />
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      title: "TODO",
    };
  },
  methods: {
    setDarkMode() {
      this.$store.dispatch("darkMode/setDarkMode");
    },
  },
  computed: {
    background() {
      if (this.$store.getters["darkMode/getDarkMode"]) {
        return "light";
      } else {
        return "dark";
      }
    },
  },
  mounted() {
    console.log(this.$store.getters["darkMode/getDarkMode"]);
  },
};
</script>
<style scoped>
.header {
  background-image: url("../assets/images/bg-desktop-dark.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.q-header > .dark {
  background-image: url("../assets/images/bg-desktop-light.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.title {
  display: flex;
  justify-content: space-between;
  max-width: 450px;
  align-items: center;
  margin: auto;
  height: 200px;
  margin-bottom: 50px;
}
.q-page-container {
  background-color: #000;
}

#dark-mode-light-mode-icon {
  cursor: pointer;
}

.content > .dark {
  background-color: #fff;
}
</style>
