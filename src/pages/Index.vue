<template>
  <q-page class="flex flex-center">
    <todos-page />
  </q-page>
</template>

<script>
import TodosPage from "./TodosPage.vue";

export default {
  name: "PageIndex",
  components: {
    TodosPage,
  },
};
</script>
