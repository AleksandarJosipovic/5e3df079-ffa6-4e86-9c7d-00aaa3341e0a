<script setup lang="ts">
import EventCardTitle from "./EventCardTitle.vue";
import EventCardImg from "./EventCardImg.vue";
import EventCardLocation from "./EventCardLocation.vue";
import EventCardDate from "./EventCardDate.vue";
import AddToStoreBtn from "../buttons/AddToStoreBtn.vue";
import { useEventStore } from "../../store/index";

const useStore = useEventStore();

interface Props {
  event: object | any;
  addBtn: boolean | any;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "onOpenModal", id: number): void;
}>();
const onOpenModal = (item: object | any) => {
  emit("onOpenModal", item);
};
const onStoreNewItem = (item: object | any) => {
  let payload: object | any = {
    _id: item._id,
    title: item.title,
    flyerFront: item.flyerFront,
    startTime: item.startTime,
    endTime: item.endTime,
    venue: {
      direction: item.venue.direction,
      name: item.venue.name,
    },
    createdAt: new Date(),
  };
  useStore.storeNewItem("event_store", payload);
};
</script>
<template>
  <div
    class="max-w-sm w-full px-3 py-5 shadow drop-shadow-sm bg-slate-50 rounded"
  >
    <EventCardTitle v-if="props.event?.title" :title="props.event?.title" />
    <EventCardImg
      v-if="props.event?.flyerFront"
      :src="props.event?.flyerFront"
      :alt="props.event?.title"
      :title="props.event?.title"
      @click="onOpenModal(props.event)"
    />
    <EventCardLocation
      v-if="props.event?.venue.direction"
      :location="props.event?.venue.direction"
      :name="props.event?.venue.name"
    />
    <div class="w-full inline-flex items-center justify-between space-x-3">
      <EventCardDate
        v-if="props.event?.startTime && props.event?.endTime"
        :startTime="props.event?.startTime"
        :endTime="props.event?.endTime"
      />
      <AddToStoreBtn
        @click="
          props.addBtn
            ? onStoreNewItem(props.event)
            : useStore.onRemoveItemFromStore(props.event._id)
        "
        :addBtn="props.addBtn"
      />
    </div>
  </div>
</template>
