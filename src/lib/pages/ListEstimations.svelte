<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let estimations = [];

  function deleteEstimation(id) {
    dispatch("estimation:delete", { id });
  }

  function editEstimation(id) {
    dispatch("estimation:edit", { id });
  }
</script>

{#each estimations as estimation}
  <article>
    <header><strong>{estimation.name}</strong></header>
    <p>{estimation.description}</p>
    <footer>
      <button class="secondary" on:click={() => editEstimation(estimation.id)}
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
