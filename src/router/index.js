import { createRouter, createWebHistory } from "vue-router";
import JourneyPage from "../pages/JourneyPage/JourneyPage.vue";
import MapDrawer from "../components/map/MapDrawer.vue";

// const routes = [{ path: "/" }, { path: "/:journeys?", props: true }];
const routes = [
  { path: "/", name: "home", redirect: "journey" },
  { path: "/journey/:journeyId?", name: "journey", component: JourneyPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active-link",
});

export default router;
