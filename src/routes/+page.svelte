<script>
  import Nav from './Nav.svelte'
  import Cell from './Cell.svelte'
  import Scores from './Scores.svelte'
  import Levels from './Levels.svelte'

  let playzone

  /** @type {import('./$types').PageData} */
  export let data

  /** Number of Wins */
  $: wins = data.wins

  /** Number of Losses */
  $: losses = data.losses

  /** Number of Ties */
  $: ties = data.ties

  /** How hard should CPU go in!!! */
  $: difficulty = data.difficulty

  function resetBoard() {
    document.querySelectorAll('.cell').forEach((n) => n.innerHTML = '')
    wins = losses = ties = 0
  }

  function changeDifficulty(e) {
    difficulty = e.detail.level
  }
</script>

<svelte:head>
  <title>Tick Tack Tohh</title>
  <meta name="description" content="Tick Tack Tohh by @yaasky" />
</svelte:head>

<Nav on:ttt_reset={resetBoard} />

<div id="container">
  <section id="playZone" bind:this="{playzone}">
    <div class="row">
      <Cell id="cell-1" />
      <Cell id="cell-2" />
      <Cell id="cell-3" last=true />
    </div>
    <div class="row">
      <Cell id="cell-4" />
      <Cell id="cell-5" />
      <Cell id="cell-6" last=true />
    </div>
    <div class="row">
      <Cell id="cell-7" />
      <Cell id="cell-8" />
      <Cell id="cell-9" last=true />
    </div>
  </section>

  <aside>
    <Scores wins={wins} ties={ties} losses={losses} />

    <Levels on:ttt_difficulty={changeDifficulty} />
  </aside>
</div>

<style>
  section {
    display: block;
    clear: both;
  }
  #playZone {
    width: 400px;
    height: 400px;
    margin: 20px 0;
    border: 2px solid #cc6;
    border-radius: 10px;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    background-color: rgba(59, 21, 14, 0.75);
    padding: 50px;
    box-shadow: inset 5px 5px 15px black, inset -5px -5px 15px black;
    -moz-box-shadow: inset 5px 5px 15px black, inset -5px -5px 15px black;
    -o-box-shadow: inset 5px 5px 15px black, inset -5px -5px 15px black;
    -webkit-box-shadow: inset 5px 5px 15px black, inset -5px -5px 15px black;
    display: block;
    float: left;
  }
  .row {
    clear: both;
    border-top: 2px solid #cc6;
    width: 398px;
  }
  .row:first-child {
    border-top: none;
  }
  aside {
    float: right;
    text-align: center;
  }
</style>
