import "@picocss/pico";
import "./app.css";
import App from "./App.svelte";
import { createEstimationStore } from "./lib/stores/estimations";
import { createRouter } from "./lib/stores/router";

const ESTIMATION_STORAGE_KEY = "svestimator:estimations";
const DEFAULT_ESTIMATION_STORE_VALUE = [];

const storageItem = localStorage.getItem(ESTIMATION_STORAGE_KEY);
const storageValue = storageItem
  ? JSON.parse(storageItem)
  : DEFAULT_ESTIMATION_STORE_VALUE;

const estimationStore = createEstimationStore(storageValue);

estimationStore.subscribe((estimations) => {
  localStorage.setItem(ESTIMATION_STORAGE_KEY, JSON.stringify(estimations));
});

const app = new App({
  target: document.getElementById("app"),
  // @ts-ignore
  context: new Map([
    ["router", createRouter()],
    ["estimations", estimationStore],
  ]),
});

export default app;
