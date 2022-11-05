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

  /** Are all cells played out? */
  $: full_board = !data.board.some(cell => cell === '_')

  let scores
  const denounce = () => scores.denounce()
  const announce = (outcome) => scores.announce(outcome)

  function resetGame() {
    clearGame()
    wins = losses = ties = 0
  }

  function newGame() {
    clearGame()
  }

  function clearGame() {
    document.querySelectorAll('.cell').forEach((n) => n.innerHTML = '')
    denounce()
    board.splice(0)
    board = new Array(9)
    board.fill('_')
  }

  function changeDifficulty(e) {
    difficulty = e.detail.level
  }

  function play(e) {
    board[e.detail.position] = 'x'
    if (won()) {
      let winner = lines().find(in_win_form)[0]
      if (winner === 'x') {
        wins += 1
        announce('win')
      } else {
        losses += 1
        announce('loss')
      }
    } else if (full_board) {
      ties += 1
      announce('tie')
    } else {
      cpu_play()
    }
  }

  function cpu_play() {
    let cpu_move = think()
    updateCell({where: cpu_move})
    if (won()) {
      let winner = lines().find(in_win_form)[0]
      if (winner === 'x') {
        wins += 1
        announce('win')
      } else {
        losses += 1
        announce('loss')
      }
    } else if (full_board) {
      ties += 1
      announce('tie')
    }
  }

  function won() {
    return lines().some(in_win_form)
  }

  /**
   * Lines on the board we care about
   * @returns {Array}
   */
  function lines() {
    return [
      horizontals(),
      verticals(),
      diagonals()
    ].flat()
  }

  const in_win_form = (line) => line.every(cell => cell === line[0] && !line.some(cell => cell === '_'))

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

<Nav on:ttt_reset={resetGame} on:ttt_new={newGame} />

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
    <Scores bind:this={scores} wins={wins} ties={ties} losses={losses} />

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
