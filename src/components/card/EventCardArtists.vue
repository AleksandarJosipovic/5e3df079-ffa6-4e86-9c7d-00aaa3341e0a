<script setup lang="ts">
interface Props {
  artists?: object | any;
}
const props = defineProps<Props>();
</script>
<template>
  <div class="font-semibold text-xs text-gray-800 uppercase relative px-10">
    <h2 class="font-semibold text-2xl text-sky-800 mb-2">Artists</h2>
    <div class="flex flex-wrap">
      <h3 v-for="artist in props.artists" :key="artist.id" class="">
        <span>{{ artist.name }}</span>
        <span class="px-2 text-red-600/50"> |</span>
      </h3>
    </div>
  </div>
</template>
