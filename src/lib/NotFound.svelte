<script lang="ts">
  let { status }: { status: number } = $props();
</script>

<svelte:head>
  <title>Not found · Grapplehook</title>
  <!-- /404 itself is served with status 200, so keep it out of search results. -->
  <meta name="robots" content="noindex" />
</svelte:head>

<main class="hang">
  <h1>Nothing on this hook.</h1>
  <p class="code">Error {status}: this page doesn't exist.</p>
  <p><a class="btn" href="/">Back to Grapplehook</a></p>
</main>

<style>
  main {
    min-height: 100vh;
    display: grid;
    align-content: center;
    justify-items: start;
    gap: 24px;
  }
  .code {
    color: var(--muted);
  }
  h1 {
    font-size: clamp(3rem, 7vw, 5rem);
  }
</style>
