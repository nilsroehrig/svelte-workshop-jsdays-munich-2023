<script>
  import { getContext } from "svelte";

  export let router = getContext("router");
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
  <svelte:component this={$router.component} {...$router.params} />
</main>

<style>
  main {
    margin: 3rem auto;
    width: 100%;
  }
</style>
