<script>
  import { getContext } from "svelte";
  import EstimationForm from "../components/EstimationForm.svelte";

  export let router = getContext("router");
  export let estimations = getContext("estimations");

  export let estimation;

  function updateEstimation({ detail }) {
    estimations.update(detail.estimation);
    router.goto("start_page");
  }
</script>

<h1>Schätzung Bearbeiten</h1>

<EstimationForm {estimation} on:submit={updateEstimation} />
