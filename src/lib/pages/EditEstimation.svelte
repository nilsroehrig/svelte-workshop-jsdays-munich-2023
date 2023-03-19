<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let estimation;

  let updatedEstimation = { ...estimation };

  function resetEstimation() {
    updatedEstimation = estimation;
  }

  function submitEstimation() {
    dispatch("estimation:update", { estimation: updatedEstimation });
  }
</script>

<form on:submit|preventDefault={submitEstimation}>
  <fieldset>
    <label>
      Bezeichnung
      <input type="text" bind:value={updatedEstimation.name} required />
    </label>
    <label>
      Beschreibung
      <textarea bind:value={updatedEstimation.description} required />
    </label>
  </fieldset>
  <fieldset class="buttons">
    <button type="reset" on:click={resetEstimation}>Zurücksetzen</button>
    <button type="submit">Speichern</button>
  </fieldset>
</form>

<style>
  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
</style>
