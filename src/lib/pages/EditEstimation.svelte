<script>
  import { createEventDispatcher } from "svelte";
  import EstimationForm from "../components/EstimationForm.svelte";

  const dispatch = createEventDispatcher();

  export let estimation;
</script>

<h1>Schätzung Bearbeiten</h1>

<EstimationForm
  {estimation}
  on:submit={({ detail }) => dispatch("estimation:update", detail)}
/>
