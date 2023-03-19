<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let estimation = null;

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
</script>

<form
  on:submit|preventDefault={() =>
    dispatch("submit", { estimation: innerEstimation })}
>
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
</style>
