<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let estimation = null;
  export let error = null;

  $: hasError = error != null;

  let innerEstimation = getInnerEstimation(estimation);

  function getInnerEstimation(est) {
    return est
      ? { ...est }
      : {
          id: crypto.randomUUID(),
          name: "",
          description: "",
        };
  }

  function submit() {
    error = null;
    dispatch("submit", { estimation: innerEstimation });
  }
</script>

<form on:submit|preventDefault={submit}>
  {#if hasError}
    <p class="error">{error}</p>
  {/if}
  <fieldset>
    <label>
      Bezeichnung
      <input type="text" bind:value={innerEstimation.name} required />
    </label>
    <label>
      Beschreibung
      <textarea bind:value={innerEstimation.description} required />
    </label>
  </fieldset>
  <fieldset class="buttons">
    <button
      type="reset"
      on:click={() => (innerEstimation = getInnerEstimation(estimation))}
      >Zurücksetzen</button
    >
    <button type="submit">Speichern</button>
  </fieldset>
</form>

<style>
  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .error {
    padding: 1rem;
    border: solid thin var(--form-element-invalid-active-border-color, red);
  }
</style>
