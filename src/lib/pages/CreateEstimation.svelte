<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let estimation = createDefaultEstimation();

  function createDefaultEstimation() {
    return {
      id: crypto.randomUUID(),
      name: "",
      description: "",
    };
  }

  function resetEstimation() {
    estimation = createDefaultEstimation();
  }

  function submitEstimation() {
    dispatch("estimation:create", { estimation });
  }
</script>

<h1>Neue Schätzung</h1>

<form on:submit|preventDefault={submitEstimation}>
  <fieldset>
    <label>
      Bezeichnung
      <input type="text" bind:value={estimation.name} required />
    </label>
    <label>
      Beschreibung
      <textarea bind:value={estimation.description} required />
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
