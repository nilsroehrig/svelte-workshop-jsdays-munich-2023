<script>
  import { getContext } from "svelte";
  import { scale } from "svelte/transition";

  const focus = (node) => node.focus();

  export let router = getContext("router");
  export let estimation;

  let inputRef;
  let stories = [];

  async function submit({ target: form }) {
    const formData = new FormData(form);

    const story = {
      id: crypto.randomUUID(),
      text: formData.get("story"),
      estimationId: estimation.id,
    };

    const response = await fetch("/api/stories", {
      method: "POST",
      body: JSON.stringify(story),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return alert("Story konnte nicht gespeichert werden.");
    }

    stories = stories.concat(story);
    form.reset();
    focus(inputRef);
  }

  async function deleteStory(id) {
    const response = await fetch(`/api/stories/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return alert("Die Story konnte nicht gelöscht werden.");
    }

    stories = stories.filter((story) => story.id !== id);
  }
</script>

<h1>Stories Hinzufügen</h1>

<article>
  <header><strong>{estimation.name}</strong></header>
  <details>
    <summary>Beschreibung lesen</summary>
    {estimation.description}
  </details>
  <details open>
    <summary>Neue Story erstellen</summary>
    <form on:submit|preventDefault={submit}>
      <input
        maxlength="60"
        placeholder="Story-Text..."
        name="story"
        required
        use:focus
        bind:this={inputRef}
      />
      <button type="submit">Hinzufügen</button>
    </form>
  </details>
  <div class="stories">
    {#each stories as story (story.id)}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <article transition:scale|local on:click={() => deleteStory(story.id)}>
        {story.text}
      </article>
    {/each}
  </div>
  <footer>
    <button class="secondary" on:click={() => router.goto("start_page")}
      >Abbrechen</button
    >
    <button
      class="secondary"
      on:click={() => router.goto("estimate_stories", { estimation, stories })}
      >Weiter</button
    >
  </footer>
</article>

<style>
  form {
    display: flex;
    gap: 0.5rem;
    margin: 0;
  }

  form input {
    flex: 1 0 0;
    margin: 0;
  }
  form button {
    flex: 0 0 0;
    margin: 0;
  }

  footer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .stories {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .stories article {
    margin: 0;
    display: flex;
    align-items: center;
    text-align: center;
    border: solid thin rgba(255, 255, 255, 0.1);
    transition: background-color ease 0.2s, border-color ease 0.2s;
  }

  .stories article:hover {
    background-color: rgba(139, 0, 0, 0.25);
    border-color: rgba(139, 0, 0, 0.5);
    cursor: pointer;
  }
</style>
