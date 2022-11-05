<script>
  import Nav from './Nav.svelte'
  import Cell from './Cell.svelte'
  import Scores from './Scores.svelte'
  import Levels from './Levels.svelte'
  import o_pic from '$lib/images/o_pic.png'

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

  /** The state of the board */
  $: board = data.board

  function resetBoard() {
    document.querySelectorAll('.cell').forEach((n) => n.innerHTML = '')
    wins = losses = ties = 0
  }

  function changeDifficulty(e) {
    difficulty = e.detail.level
  }

  function play(e) {
    board[e.detail.position] = 'x'
    if (won()) {
      console.log("Gameover")
    } else {
      let cpu_move = think()
      updateCell({where: cpu_move})
    }
  }

  function won() {
    return [horizontals(), verticals(), diagonals()].flat().some(in_win_form)
  }

  const in_win_form = (e) => e.join('') === 'xxx'

  function horizontals() {
    return [
      board.slice(0, 3),
      board.slice(3, 6),
      board.slice(6)
    ]
  }

  function verticals() {
    return [
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
    ]
  }

  function diagonals() {
    return [
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ]
  }

  function think() {
    let decision = board.findIndex((element) => element === '_')
    board[decision] = 'o'
    return decision
  }

  function updateCell({ where }) {
    let choice_node = [...document.querySelectorAll('.cell')].findLast((node) => node.id == `${where}`)
    const o = document.createElement('img')
    o.src = o_pic
    choice_node.appendChild(o)
  }
</script>

<svelte:head>
  <title>Tick Tack Tohh</title>
  <meta name="description" content="Tick Tack Tohh by @yaasky" />
</svelte:head>

<Nav on:ttt_reset={resetBoard} />

<div id="container">
  <section id="playZone">
    <div class="row">
      <Cell on:ttt_move={play} id="0" />
      <Cell on:ttt_move={play} id="1" />
      <Cell on:ttt_move={play} id="2" last=true />
    </div>
    <div class="row">
      <Cell on:ttt_move={play} id="3" />
      <Cell on:ttt_move={play} id="4" />
      <Cell on:ttt_move={play} id="5" last=true />
    </div>
    <div class="row">
      <Cell on:ttt_move={play} id="6" />
      <Cell on:ttt_move={play} id="7" />
      <Cell on:ttt_move={play} id="8" last=true />
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
