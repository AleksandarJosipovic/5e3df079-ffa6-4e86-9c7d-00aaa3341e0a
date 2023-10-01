<script setup lang="ts">
import { computed } from "vue";
import { useEventStore } from "../store/index";
import EventCard from "../components/card/EventCard.vue";

const useStore = useEventStore();
const storedItems: [] | any = computed(() => useStore.itemsInStore);
</script>
<template>
  <section
    class="w-full min-h-screen container mx-auto px-5 pt-12 m-0 relative"
  >
    <header class="w-full h-auto py-5">
      <h1 class="w-full text-3xl font-extrabold">Events Store</h1>
    </header>
    <div ref="target" v-if="storedItems" class="w-full mt-10">
      <div class="w-full">
        <div class="w-full flex flex-wrap justify-start items-start gap-5 my-8">
          <div
            v-for="(items, index) in storedItems"
            :key="index"
            class="max-w-sm w-full"
          >
            <EventCard :event="items" :addBtn="false" />
          </div>
        </div>
        <div v-if="storedItems.length == 0" class="text-gray-700">
          There are no items in the store
        </div>
      </div>
    </div>
  </section>
</template>
