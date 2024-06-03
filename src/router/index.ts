import { createRouter, createWebHistory } from "vue-router";

import Welcome from "../views/Welcome.vue"; //Could not find a declaration file for module '../views/Welcome.vue'. 'd:/VueProjectPractice/vuetify/src/views/Welcome.vue' implicitly has an 'any' type.
import Tasks from "../views/Tasks.vue"; // Could not find a declaration file for module '../views/Tasks.vue'. 'd:/VueProjectPractice/vuetify/src/views/Tasks.vue' implicitly has an 'any' type
import Info from "../views/Info.vue"; //Could not find a declaration file for module '../views/Info.vue'. 'd:/VueProjectPractice/vuetify/src/views/Info.vue' implicitly has an 'any' type.

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Welcome,
    },
    {
      path: "/tasks",
      component: Tasks,
    },
    {
      path: "/info",
      component: Info,
    },
  ],
});

export default router;
