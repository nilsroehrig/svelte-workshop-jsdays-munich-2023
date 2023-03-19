<script>
  import { createEventDispatcher } from "svelte";
  import EstimationForm from "../components/EstimationForm.svelte";

  const dispatch = createEventDispatcher();

  function submitEstimation({detail}) {
    console.dir({detail})
    dispatch("estimation:create", detail);
  }
</script>

<h1>Neue Schätzung</h1>

<EstimationForm on:submit={submitEstimation} />
