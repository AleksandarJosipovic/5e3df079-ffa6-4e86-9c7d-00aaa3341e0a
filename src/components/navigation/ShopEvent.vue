<script setup lang="ts">
import { computed } from "vue";

import { useEventStore } from "../../store/index";

const useStore = useEventStore();

const storedItems: [] | any = computed(() => useStore.itemsInStore);
</script>
<template>
  <div class="relative">
    <router-link to="/events-store">
      <img src="../../assets/icons/shopping-icon.svg" alt="" />
    </router-link>
    <div
      v-if="storedItems.length > 0"
      class="absolute left-4 -top-3 flex items-center justify-center text-xs text-white w-4 h-4 rounded-full bg-red-600 z-10"
    >
      {{ storedItems.length }}
    </div>
  </div>
</template>
