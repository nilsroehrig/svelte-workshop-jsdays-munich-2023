<script>
  import ListEstimations from "./lib/pages/ListEstimations.svelte";
  import CreateEstimation from "./lib/pages/CreateEstimation.svelte";

  let currentView = "start_page";
  let estimation = { id: crypto.randomUUID(), name: "", description: "" };
  let estimations = [];

  function resetEstimation() {
    estimation = { id: crypto.randomUUID(), name: "", description: "" };
  }

  function submitEstimation() {
    if (currentView === "create_estimation") {
      estimations = estimations.concat(estimation);
    }
    resetEstimation();
    gotoStartPage();
  }

  function addEstimation({ detail }) {
    estimations = estimations.concat(detail.estimation);
    currentView = "start_page";
  }

  function gotoStartPage() {
    currentView = "start_page";
  }

  function deleteEstimation({ detail }) {
    estimations = estimations.filter((est) => est.id !== detail.id);
  }

  function editEstimation({ detail }) {
    estimation = estimations.find((est) => est.id === detail.id);
    currentView = "edit_estimation";
  }
</script>

<header>
  <nav>
    <ul>
      <li><strong>Svestimator</strong></li>
    </ul>
    <ul>
      <li>
        <button class="outline" on:click={gotoStartPage}>Startseite</button>
      </li>
      <li>
        <button
          class="outline"
          on:click={() => (currentView = "create_estimation")}>Neu</button
        >
      </li>
    </ul>
  </nav>
</header>

<main>
  {#if currentView === "create_estimation"}
    <CreateEstimation on:estimation:create={addEstimation} />
  {:else if currentView === "edit_estimation"}
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
  {:else}
    <ListEstimations
      {estimations}
      on:estimation:delete={deleteEstimation}
      on:estimation:edit={editEstimation}
    />
  {/if}
</main>

<style>
  main {
    margin: 3rem auto;
    width: 100%;
  }

  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
</style>
