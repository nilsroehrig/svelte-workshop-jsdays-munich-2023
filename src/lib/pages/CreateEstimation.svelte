<script>
  import { getContext } from "svelte";
  import EstimationForm from "../components/EstimationForm.svelte";

  export let router = getContext("router");
  export let estimations = getContext("estimations");

  function submitEstimation({ detail }) {
    estimations.add(detail.estimation);
    router.goto("start_page");
  }
</script>

<h1>Neue Schätzung</h1>

<EstimationForm on:submit={submitEstimation} />
