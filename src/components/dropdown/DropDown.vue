<script setup lang="ts">
import { ref, provide } from "vue";

const active = ref<boolean>(false);
provide("active", active);

const toggle = () => {
  active.value = !active.value;
};
</script>
<template>
  <div class="relative">
    <div @click="toggle">
      <slot name="toggler">
        <button>Toggle</button>
      </slot>
    </div>

    <slot />
  </div>
</template>
