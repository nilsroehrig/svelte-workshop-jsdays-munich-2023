<script>
  import CreateEstimation from "./lib/pages/CreateEstimation.svelte";
  import EditEstimation from "./lib/pages/EditEstimation.svelte";
  import ListEstimations from "./lib/pages/ListEstimations.svelte";

  let currentView = "start_page";
  let estimations = [];
  let estimation;

  function addEstimation({ detail }) {
    estimations = estimations.concat(detail.estimation);
    gotoStartPage();
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

  function updateEstimation({ detail }) {
    estimations = estimations.map((est) =>
      est.id === detail.estimation.id ? detail.estimation : est
    );
    estimation = undefined;
    gotoStartPage();
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
    <EditEstimation {estimation} on:estimation:update={updateEstimation} />
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
</style>
