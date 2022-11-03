<script>
  import Header from './Header.svelte';
  import './styles.css';
</script>

<div class="app">
  <Header />

  <main>
    <slot />
  </main>

  <footer>
    <p id="itsmeagain">&copy; iGbanam iGravity&trade; 2010. All rights reserved.</p>
    <p>Best played on a Javascript-enabled browser.</p>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 800px;
    margin: 20px auto 0 auto;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.85em;
  }
</style>
