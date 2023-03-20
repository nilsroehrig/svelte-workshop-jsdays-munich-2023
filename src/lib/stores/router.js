import { writable } from "svelte/store";
import AddStories from "../pages/AddStories.svelte";
import CreateEstimation from "../pages/CreateEstimation.svelte";
import EditEstimation from "../pages/EditEstimation.svelte";
import EstimateStories from "../pages/EstimateStories.svelte";
import ListEstimations from "../pages/ListEstimations.svelte";

// @ts-ignore
const routes = new Map([
  ["start_page", ListEstimations],
  ["create_estimation", CreateEstimation],
  ["edit_estimation", EditEstimation],
  ["add_stories", AddStories],
  ["estimate_stories", EstimateStories],
]);

export function createRouter(startValue = { route: "start_page", params: {} }) {
  const { subscribe, set } = writable({
    ...startValue,
    component: getComponent(startValue.route),
  });

  return {
    subscribe,
    goto(route, params = {}) {
      set({ route, params, component: getComponent(route) });
    },
  };
}

function getComponent(route) {
  return routes.get(route) ?? routes.get("start_page");
}
