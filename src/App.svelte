<script>
  import { getContext } from "svelte";

  export let router = getContext("router");

  let estimations = [];
  let estimation;

  function addEstimation({ detail }) {
    estimations = estimations.concat(detail.estimation);
    router.goto("start_page");
  }

  function deleteEstimation({ detail }) {
    estimations = estimations.filter((est) => est.id !== detail.id);
  }

  function editEstimation({ detail }) {
    estimation = estimations.find((est) => est.id === detail.id);
    router.goto("edit_estimation");
  }

  function updateEstimation({ detail }) {
    estimations = estimations.map((est) =>
      est.id === detail.estimation.id ? detail.estimation : est
    );
    estimation = undefined;
    router.goto("start_page");
  }
</script>

<header>
  <nav>
    <ul>
      <li><strong>Svestimator</strong></li>
    </ul>
    <ul>
      <li>
        <button class="outline" on:click={() => router.goto("start_page")}
          >Startseite</button
        >
      </li>
      <li>
        <button
          class="outline"
          on:click={() => router.goto("create_estimation")}>Neu</button
        >
      </li>
    </ul>
  </nav>
</header>

<main>
  <svelte:component
    this={$router.component}
    {estimation}
    {estimations}
    on:estimation:create={addEstimation}
    on:estimation:update={updateEstimation}
    on:estimation:delete={deleteEstimation}
    on:estimation:edit={editEstimation}
  />
</main>

<style>
  main {
    margin: 3rem auto;
    width: 100%;
  }
</style>
