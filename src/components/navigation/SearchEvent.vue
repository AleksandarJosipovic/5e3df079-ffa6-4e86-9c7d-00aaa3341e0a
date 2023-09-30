<script setup lang="ts">
import { useEventStore } from "../../store/index";
const useStore = useEventStore();
</script>

<template>
  <div class="inline-flex items-center relative">
    <img
      src="../../assets/icons/search-icon.svg"
      alt=""
      class="absolute top-1/2 left-3 transform -translate-y-1/2"
    />
    <input
      type="search"
      id=""
      @input="useStore.searchEvents($event.target.value)"
      class="bg-white/20 pl-10 pr-2 py-1 text-white placeholder:text-white/30 shadow border-none outline-none ring-2 focus:ring-white/60"
      placeholder="Search..."
    />
  </div>
</template>
