<script setup lang="ts">
interface Props {
  addBtn: boolean | any;
}
const props = defineProps<Props>();
</script>
<template>
  <div class="relative overflow-hidden w-8">
    <img
      src="../../assets/icons/add-icon.svg"
      alt="add-icon"
      class="w-full object-cover object-top h-full cursor-pointer"
      v-if="props.addBtn"
    />
    <img
      src="../../assets/icons/minus-icon.svg"
      alt="add-icon"
      class="w-full object-cover object-top h-full cursor-pointer"
      v-else
    />
  </div>
</template>
