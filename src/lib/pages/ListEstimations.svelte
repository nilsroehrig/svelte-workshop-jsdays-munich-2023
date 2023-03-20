<script>
  import { createEventDispatcher, getContext } from "svelte";

  export let router = getContext("router")
  export let estimations = getContext("estimations");

  function deleteEstimation(id) {
    estimations.delete(id);
  }

  function editEstimation(estimation) {
    router.goto("edit_estimation", { estimation })
  }
</script>

{#each $estimations as estimation}
  <article>
    <header><strong>{estimation.name}</strong></header>
    <p>{estimation.description}</p>
    <footer>
      <button class="secondary" on:click={() => editEstimation(estimation)}
        >Edit</button
      >
      <button class="secondary" on:click={() => deleteEstimation(estimation.id)}
        >Delete</button
      >
    </footer>
  </article>
{:else}
  <p>Bislang wurde noch nichts geschätzt.</p>
{/each}

<style>
  footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  footer button {
    margin: 0;
  }
</style>
