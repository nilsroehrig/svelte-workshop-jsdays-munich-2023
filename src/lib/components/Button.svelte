<script>
  export let variant = "default";

  $: outline = variant === "outline";
  $: unstyled = variant === "unstyled";
</script>

<button on:click class:outline class:unstyled {...$$restProps}>
  <slot />
</button>

<style>
  .unstyled {
    border: none;
    margin: 0;
    padding: 0;
    background-color: transparent;
    display: inline;
    width: auto;
  }
</style>