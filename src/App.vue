<script setup lang="ts">
import { onBeforeMount } from "vue";
import TopNav from "./components/navigation/TopNav.vue";
import { useEventStore } from "./store/index";

const useStore = useEventStore();

onBeforeMount(async () => {
  await useStore.getEventDataFromAPI();
});
</script>

<template>
  <main>
    <TopNav />
    <router-view></router-view>
  </main>
</template>
