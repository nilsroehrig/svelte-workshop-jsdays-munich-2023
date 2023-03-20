<script>
  import { getContext } from "svelte";
  import { createEstimationStore } from "./lib/stores/estimations";

  export let router = getContext("router");

  async function getEstimations() {
    const response = await fetch("/api/estimations");

    if (!response.ok) {
      console.error("Could not fetch estimations");
    } else {
      try {
        const json = await response.json();
        return createEstimationStore(json);
      } catch (e) {
        console.error("Could not parse estimations", e);
      }
    }

    return createEstimationStore([]);
  }
</script>

<header>
  <nav>
    <ul>
      <li><strong>Svestimator</strong></li>
    </ul>
    <ul>
      <li>
        <button class="outline" on:click={() => router.goto("start_page")}
          >Startseite</button
        >
      </li>
      <li>
        <button
          class="outline"
          on:click={() => router.goto("create_estimation")}>Neu</button
        >
      </li>
    </ul>
  </nav>
</header>

<main>
  {#await getEstimations()}
    <article aria-busy="true" />
  {:then estimations}
    <svelte:component
      this={$router.component}
      {...$router.params}
      {estimations}
    />
  {/await}
</main>

<style>
  main {
    margin: 3rem auto;
    width: 100%;
  }
</style>
