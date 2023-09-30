<script setup lang="ts">
interface Props {
  startTime: string | number | Date;
  endTime: string | number | Date;
}
const props = defineProps<Props>();
</script>
<template>
  <div class="flex flex-col space-y-1">
    <div class="inline-flex items-center space-x-1 px-2 border-l-2 border-gray-300 text-gray-800">
      <span class=" w-12 text-xs uppercase font-light">Starts:</span>
      <span class="text-sm">{{ new Date(props.startTime).toLocaleString() }}</span>
    </div>
    <div class="inline-flex items-center space-x-1 px-2 border-l-2 border-gray-300 text-gray-800">
      <span class=" w-12 text-xs uppercase font-light">Ends:</span>
      <span class="text-sm">{{ new Date(props.endTime).toLocaleString() }}</span>
    </div>
    <div></div>
  </div>
</template>
