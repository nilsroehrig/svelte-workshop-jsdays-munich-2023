<script>
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

  function deleteEstimation(id) {
    estimations = estimations.filter((est) => est.id !== id);
  }

  function editEstimation(id) {
    estimation = estimations.find((est) => est.id === id);
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
    {#each estimations as est}
      <article>
        <header><strong>{est.name}</strong></header>
        <p>{est.description}</p>
        <footer>
          <button class="secondary" on:click={() => editEstimation(est.id)}
            >Edit</button
          >
          <button class="secondary" on:click={() => deleteEstimation(est.id)}
            >Delete</button
          >
        </footer>
      </article>
    {:else}
      <p>Bislang wurde noch nichts geschätzt.</p>
    {/each}
  {/if}
</main>

<style>
  main {
    margin: 3rem auto;
    width: 100%;
  }

  footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  footer button {
    margin: 0;
  }

  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
</style>
