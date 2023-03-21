<script>
  export let estimation;

  async function getStories() {
    const response = await fetch(`/api/stories?estimationId=${estimation.id}`);

    if (!response.ok) {
      console.error("Stories konnten nicht geladen werden.", response);
    } else {
      try {
        const json = response.json();
        return json;
      } catch (e) {
        console.error("Stories konnten nicht geparsed werden.", e);
      }
    }

    return Promise.reject(
      "Stories konnten nicht geladen werden, Siehe Konsole für Details."
    );
  }
</script>

<article>
  <header><strong>{estimation.name}</strong></header>
  <p>{estimation.description}</p>
  <table>
    <thead>
      <tr>
        <th class="text">Story-Text</th>
        <th>Größe</th>
      </tr>
    </thead>
    <tbody>
      {#await getStories()}
        <tr><td colspan="2" aria-busy="true" /></tr>
      {:then stories}
        {#each stories as story (story.id)}
          <tr>
            <td>{story.text}</td>
            <td>{story.size ?? "Ungeschätzt"}</td>
          </tr>
        {:else}
          <tr>
            <td colspan="2">Diese Schätzung enthält noch keine Stories.</td>
          </tr>
        {/each}
      {:catch error}
        <tr>
          <td colspan="2">{error}</td>
        </tr>
      {/await}
    </tbody>
  </table>
</article>

<style>
  th {
    font-weight: bold;
  }

  .text {
    width: 100%;
  }
</style>
