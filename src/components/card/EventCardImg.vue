<script setup lang="ts">
interface Props {
  src?: string;
  alt?: string;
  title?: string;
  customClasses?: string;
}
const props = defineProps<Props>();
</script>
<template>
  <div
    class="relative overflow-hidden"
    :class="customClasses ? customClasses : 'h-80'"
  >
    <img
      :src="props.src"
      :alt="props.title"
      :title="props.title"
      class="w-full object-cover object-top h-full"
    />
  </div>
</template>
