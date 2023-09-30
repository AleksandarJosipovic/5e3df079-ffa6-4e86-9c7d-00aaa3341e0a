<script setup lang="ts">
interface Props {
  title?: string;
}
const props = defineProps<Props>();
</script>
<template>
  <h2 class="h-14 font-semibold text-sm text-gray-800 leading-none">
    {{ props.title }}
  </h2>
</template>
