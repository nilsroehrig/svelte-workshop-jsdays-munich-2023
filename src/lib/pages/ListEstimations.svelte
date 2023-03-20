<script>
  import { getContext } from "svelte";
  import { scale } from "svelte/transition";

  export let router = getContext("router");
  export let estimations = getContext("estimations");

  async function deleteEstimation(id) {
    const response = await fetch(`/api/estimations/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return alert("Die Schätzung konnte nicht gelöscht werden.");
    }

    estimations.delete(id);
  }

  function editEstimation(estimation) {
    router.goto("edit_estimation", { estimation });
  }
</script>

{#each $estimations as estimation (estimation.id)}
  <article transition:scale|local>
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
