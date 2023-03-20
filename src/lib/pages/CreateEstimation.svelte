<script>
  import { getContext } from "svelte";
  import EstimationForm from "../components/EstimationForm.svelte";

  export let router = getContext("router");
  export let estimations = getContext("estimations");

  let error = null;

  async function submitEstimation({ detail }) {
    const { estimation } = detail;
    const response = await fetch("/api/estimations", {
      method: "POST",
      body: JSON.stringify(estimation),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      error = `Die Schätzung konnte nicht gespeichert werden. Status: ${response.status}`;
      return;
    }

    estimations.add(estimation);
    router.goto("add_stories", { estimation });
  }
</script>

<h1>Neue Schätzung</h1>

<EstimationForm on:submit={submitEstimation} bind:error />
