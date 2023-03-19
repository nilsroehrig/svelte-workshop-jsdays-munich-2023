<script>
  let currentView = "start_page";
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
    <p>Schätzung erstellen</p>
  {:else}
    <p>Liste von Schätzungen</p>
  {/if}
</main>

<style>
  main {
    margin: 3rem auto;
  }
</style>