import { createRouter, createWebHistory } from "vue-router";
import JourneyPage from "@/pages/JourneyPage/JourneyPage.vue";

// const routes = [{ path: "/" }, { path: "/:journeys?", props: true }];
const routes = [
  { path: "/", name: "home", redirect: "journeys" },
  { path: "/journeys/:journeyId?", name: "journeys", component: JourneyPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active-link",
});

export default router;
