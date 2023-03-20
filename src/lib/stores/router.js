import { writable } from "svelte/store";
import CreateEstimation from "../pages/CreateEstimation.svelte";
import EditEstimation from "../pages/EditEstimation.svelte";
import ListEstimations from "../pages/ListEstimations.svelte";

// @ts-ignore
const routes = new Map([
  ["start_page", ListEstimations],
  ["create_estimation", CreateEstimation],
  ["edit_estimation", EditEstimation],
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
