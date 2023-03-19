<script>
  let currentView = "start_page";
  let estimation = { name: "", description: "" };
  let estimations = [];

  function resetEstimation() {
    estimation = { name: "", description: "" };
  }

  function submitEstimation() {
    estimations = estimations.concat(estimation);
    resetEstimation();
    gotoStartPage();
  }

  function gotoStartPage() {
    currentView = "start_page";
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

  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
</style>
