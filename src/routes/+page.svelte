<script>
  import Nav from './Nav.svelte'
  import Cell from './Cell.svelte'
  import Scores from './Scores.svelte'

  let playzone

  /** @type {import('./$types').PageData} */
  export let data

  /** Number of Wins */
  $: wins = data.wins
  $: losses = data.losses
  $: ties = data.ties

  function resetBoard() {
    document.querySelectorAll('.cell').forEach((n) => n.innerHTML = '')
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

    <section id="difficulty">
      <p><strong>Tick-Tack Attitude</strong></p>
      <li id="diff-1" class="selected">The Ignorant</li>
      <li id="diff-2">The Clingy</li>
      <li id="diff-3">iGbanam iGravity</li>
    </section>
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
  #difficulty {
    margin-top: 50px;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border: 2px solid black;
    font-size: 1.05em;
    background-image: -webkit-gradient(
      linear,
      0% 0%,
      0% 100%,
      from(rgba(201, 201, 201, 0.5)),
      to(rgba(201, 201, 201, 0.5)),
      color-stop(0.5, rgba(174, 174, 174, 0.85))
      );
      background-image: -moz-linear-gradient(19% 75% 90deg, #ababab, #c9c9c9, #c7c7c7 100%);
  }
  #difficulty li {
    padding: 8px;
    border-top: 1px solid black;
  }
  #difficulty > p > strong {
    text-shadow: 0 1px 0 white;
  }
  .selected {
    box-shadow: inset 2px 2px 5px black;
    -moz-box-shadow: inset 2px 2px 5px black;
    -webkit-box-shadow: inset 0px 0px 5px black;
    background-color: rgba(88, 88, 88, 0.6);
    text-shadow: 0 -1px 0 white;
  }
</style>
