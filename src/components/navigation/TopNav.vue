<script setup lang="ts">
import SearchEvent from "./SearchEvent.vue";
import FilterEvent from "./FilterEvent.vue";
import ShopEvent from "./ShopEvent.vue";
</script>

<template>
  <div
    class="w-full h-12 px-5 sm:px-0 fixed left-0 top-0 bg-sky-600 flex items-center shadow-md drop-shadow z-30"
  >
    <nav class="container mx-auto flex items-center justify-between">
      <div class="inline-flex items-center space-x-5">
        <SearchEvent />
        <FilterEvent />
      </div>
      <ShopEvent />
    </nav>
  </div>
</template>
