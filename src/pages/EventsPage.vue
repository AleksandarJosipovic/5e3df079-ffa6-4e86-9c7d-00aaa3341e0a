<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useEventStore } from "../store/index";
import EventCard from "../components/card/EventCard.vue";
import DialogModal from "../components/modals/DialogModal.vue";
import EventCardTitle from "../components/card/EventCardTitle.vue";
import EventCardImg from "../components/card/EventCardImg.vue";
import EventCardLocation from "../components/card/EventCardLocation.vue";
import EventCardDate from "../components/card/EventCardDate.vue";
import EventCardArtists from "../components/card/EventCardArtists.vue";

const useStore = useEventStore();
const events = computed<any[]>(() => useStore.eventsData);

const showEventModal = ref<boolean>(false);
const eventItemModal = ref<{} | any>(null);

const target = ref<HTMLElement | any>();
const sticking = ref<boolean>(false);

const observer = new IntersectionObserver(
  ([entry]) => {
    sticking.value = !entry.isIntersecting;
  },
  { threshold: 0.0 }
);
onMounted(() => {
  observer.observe(target.value);
});

const closeModal = () => {
  eventItemModal.value = null;
  showEventModal.value = !showEventModal.value;
};
const onOpenModal = (item: object | any) => {
  eventItemModal.value = item;
  showEventModal.value = !showEventModal.value;
};
</script>
<template>
  <section
    class="w-full min-h-screen container mx-auto px-5 pt-12 m-0 relative"
  >
    <header class="w-full h-auto py-5">
      <h1 class="w-full text-3xl font-extrabold">Public Events</h1>
    </header>
    <div ref="target" v-if="events" class="w-full mt-10">
      <div v-for="(row, key) in events" :key="key" class="w-full">
        <h3
          class="sticky-menu w-full text-xl font-semibold px-5 py-1 uppercase text-sky-600 bg-white/50 z-20"
          :class="{ sticking }"
        >
          {{ key }}
        </h3>
        <div class="w-full flex flex-wrap justify-start items-start gap-5 my-8">
          <div v-for="items in row" :key="items._id" class="max-w-sm w-full">
            <EventCard
              :event="items"
              :addBtn="true"
              @onOpenModal="onOpenModal"
            />
          </div>
        </div>
      </div>
      <dialog-modal :show="showEventModal" @close="closeModal" maxWidth="4xl">
        <template #content>
          <EventCardTitle
            v-if="eventItemModal"
            :title="eventItemModal?.title"
          />
          <div class="flex flex-wrap">
            <EventCardImg
              v-if="eventItemModal?.flyerFront"
              :src="eventItemModal?.flyerFront"
              :alt="eventItemModal?.title"
              :title="eventItemModal?.title"
              class="flex-none"
              customClasses="h-full w-1/2"
            />
            <EventCardArtists
              class="w-1/2"
              :artists="eventItemModal?.artists"
            />
          </div>
          <EventCardLocation
            v-if="eventItemModal?.venue.direction"
            :location="eventItemModal?.venue.direction"
            :name="eventItemModal?.venue.name"
          />
          <div
            class="w-full inline-flex items-center justify-between space-x-3"
          >
            <EventCardDate
              v-if="eventItemModal?.startTime && eventItemModal?.endTime"
              :startTime="eventItemModal?.startTime"
              :endTime="eventItemModal?.endTime"
            />
          </div>
        </template>
      </dialog-modal>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.sticky-menu {
  position: sticky;
  top: 48px;
  background-color: hsla(0, 0%, 100%, 0.8);
}
.sticky-menu.sticking {
  box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.8);
}
</style>
