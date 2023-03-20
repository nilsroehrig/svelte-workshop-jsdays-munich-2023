<script>
  import { getContext } from "svelte";

  export let router = getContext("router");
  export let estimation;
  export let stories;

  const stacks = [undefined, "XS", "S", "M", "L", "XL"];

  async function doDrop(size, dataTransfer) {
    const id = dataTransfer.getData("text/plain");
    const story = stories.find((oldStory) => oldStory.id === id);
    const response = await fetch(`/api/stories/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...story,
        size,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return alert("Story konnte nicht geschätzt werden.");
    }

    stories = stories.map((oldStory) =>
      oldStory.id === id ? { ...oldStory, size } : oldStory
    );
  }
</script>

<article>
  <header><strong>{estimation.name}</strong></header>
  <div class="stacks">
    {#each stacks as stack (stack)}
      {@const stackStories = stories.filter((story) => story.size === stack)}

      <article
        on:dragenter={(e) => (stack ? e.preventDefault() : undefined)}
        on:dragover={(e) => (stack ? e.preventDefault() : undefined)}
        on:drop={({ dataTransfer }) => doDrop(stack, dataTransfer)}
      >
        <header><strong>{stack ?? "Ungeschätzt"}</strong></header>
        <div class="stories">
          {#each stackStories as story (story.id)}
            <article
              draggable="true"
              on:dragstart={(event) =>
                event.dataTransfer.setData("text/plain", story.id)}
            >
              {story.text}
            </article>
          {/each}
        </div>
      </article>
    {/each}
  </div>
  <footer>
    <button class="secondary" on:click={() => router.goto("start_page")}
      >Schätzung abschließen</button
    >
  </footer>
</article>

<style>
  .stacks {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .stacks article {
    margin: 0;
  }

  .stacks header {
    text-align: center;
  }

  .stories {
    display: grid;
    grid-template-areas: "single";
  }

  .stories article {
    margin: 0;
    text-align: center;
    border: solid thin rgba(255, 255, 255, 0.1);
    transition: background-color ease 0.2s, border-color ease 0.2s;
    grid-area: single;
    cursor: pointer;
  }
</style>
