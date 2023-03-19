<script>
  let currentView = "start_page";
  let estimation = { name: "", description: "" };

  function resetForm() {
    estimation = { name: "", description: ""}
  }

  $: console.dir(estimation)
</script>

<header>
  <nav>
    <ul>
      <li><strong>Svestimator</strong></li>
    </ul>
    <ul>
      <li>
        <button class="outline" on:click={() => (currentView = "start_page")}
          >Startseite</button
        >
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
    <form>
      <fieldset>
        <label>
          Bezeichnung
          <input type="text" bind:value={estimation.name} />
        </label>
        <label>
          Beschreibung
          <textarea bind:value={estimation.description} />
        </label>
      </fieldset>
      <fieldset class="buttons">
        <button type="reset" on:click={resetForm}>Zurücksetzen</button>
        <button type="submit">Speichern</button>
      </fieldset>
    </form>
  {:else}
    <p>Liste von Schätzungen</p>
  {/if}
</main>

<style>
  main {
    margin: 3rem auto;
  }

  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
</style>
