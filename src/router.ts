import { createRouter, createWebHistory } from "vue-router";
import EventsPage from "./pages/EventsPage.vue";
import EventsStorePage from "./pages/EventsStorePage.vue";

const routes = [
  {
    path: "/",
    name: "Events",
    component: EventsPage,
    params: true,
    meta: {
      title: "Public Events",
    },
  },
  {
    path: "/events-store",
    name: "EventsStore",
    component: EventsStorePage,
    params: true,
    meta: {
      title: "Events Store",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
