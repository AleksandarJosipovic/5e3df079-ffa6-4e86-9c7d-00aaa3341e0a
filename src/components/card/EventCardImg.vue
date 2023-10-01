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
    class="relative overflow-hidden cursor-pointer group"
    :class="customClasses ? customClasses : 'h-80'"
  >
    <img
      :src="props.src"
      :alt="props.title"
      :title="props.title"
      class="w-full object-cover object-top h-full"
    />
    <div
      class="absolute top-0 left-0 w-full h-full items-center justify-center bg-slate-900/50 hidden group-hover:flex"
    >
      <img src="../../assets/icons/plus-icon.svg" alt="plus-icon" />
    </div>
  </div>
</template>
