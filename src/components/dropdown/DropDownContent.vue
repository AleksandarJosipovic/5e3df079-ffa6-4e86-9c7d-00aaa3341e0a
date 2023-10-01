<script setup lang="ts">
import { inject } from "vue";

const active = inject<string>("active");
</script>
<template>
  <transition name="dropdown-content">
    <div
      v-if="active"
      class="absolute left-0 mt-2 bg-white rounded-sm border py-2"
    >
      <slot />
    </div>
  </transition>
</template>

<style scoped>
.dropdown-content-enter-active,
.dropdown-content-leave-active {
  transition: all 0.2s;
}
.dropdown-content-enter,
.dropdown-content-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
