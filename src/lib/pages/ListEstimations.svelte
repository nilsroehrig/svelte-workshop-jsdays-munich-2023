<script>
  import { getContext } from "svelte";
  import { scale } from "svelte/transition";
  import Button from "../components/Button.svelte";
  import Pencil from "../components/icons/Pencil.svelte";
  import Trash from "../components/icons/Trash.svelte";

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
    <header>
      <strong>{estimation.name}</strong>
      <div class="actions">
        <Button variant="unstyled" on:click={() => editEstimation(estimation)}><Pencil /></Button>
        <Button variant="unstyled" on:click={() => deleteEstimation(estimation.id)}><Trash /></Button>
      </div>
    </header>
    <p>{estimation.description}</p>
  </article>
{:else}
  <p>Bislang wurde noch nichts geschätzt.</p>
{/each}

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  article > p {
    margin-bottom: 0;
  }

  .actions {
    display: flex;
    gap: 1rem;
    align-items: baseline;
  }
</style>
