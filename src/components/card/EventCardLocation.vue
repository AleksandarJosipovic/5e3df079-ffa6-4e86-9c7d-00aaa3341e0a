<script setup lang="ts">
interface Props {
  location?: string;
  name?: string;
}
const props = defineProps<Props>();
</script>
<template>
  <div class="inline-flex items-center space-x-3 py-2">
    <img
      src="../../assets/icons/location-dot.svg"
      alt="location-dot"
      class=""
    />
    <a :href="props.location" target="_blank" class="text-xs uppercase font-light hover:underline hover:text-sky-700" rel="noopener noreferrer">{{
      props.name
    }}</a>
  </div>
</template>
