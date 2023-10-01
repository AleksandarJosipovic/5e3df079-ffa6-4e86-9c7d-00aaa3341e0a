<script setup lang="ts">
import { ref } from "vue";
import DropDown from "../dropdown/DropDown.vue";
import DropdownContent from "../dropdown/DropdownContent.vue";
import DropdownItem from "../dropdown/DropdownItem.vue";
import { useEventStore } from "../../store/index";

const useStore = useEventStore();

const startTime = ref<string | Date | null>("2021-10-10");
const endTime = ref<string | Date | null>("2021-10-15");

const handleFilter = () => {
  if (startTime.value && endTime.value) {
    useStore.filterListBetweenTwoDates(startTime.value, endTime.value);
  }
};
</script>
<template>
  <div class="">
    <DropDown>
      <template #toggler>
        <span class="cursor-pointer">
          <img src="../../assets/icons/filter-icon.svg" alt="" />
        </span>
      </template>
      <DropdownContent>
        <DropdownItem>
          <div class="flex flex-row items-center space-x-3">
            <input type="date" v-model="startTime" id="" />
            <span>-</span>
            <input type="date" v-model="endTime" id="" />
          </div>
        </DropdownItem>
        <DropdownItem>
          <div class="flex flex-row items-center justify-end space-x-3  text-xs text-white">
            <button class="px-2 py-1 bg-red-600 rounded-sm uppercase" @click="useStore.getEventDataFromAPI()">Reset</button>
            <button class="px-5 py-1 bg-sky-600 rounded-sm uppercase" @click="handleFilter()">go</button>
          </div>
        </DropdownItem>
      </DropdownContent>
    </DropDown>
  </div>
</template>
