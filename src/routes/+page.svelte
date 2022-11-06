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

  let scores
  const denounce = () => scores.denounce()
  const announce = (outcome) => scores.announce(outcome)

  let new_difficulty = 0
  let last_played

  function resetGame() {
    clearGame()
    wins = losses = ties = 0
  }

  function newGame() {
    clearGame()
    if (new_difficulty > 0) {
      difficulty = new_difficulty
    }
  }

  function clearGame() {
    document.querySelectorAll('.cell').forEach((n) => n.innerHTML = '')
    denounce()
    board.splice(0)
    board = new Array(9)
    board.fill('_')
    difficulty = 1
  }

  function changeDifficulty(e) {
    if (board.every((cell) => cell === '_')) {
      difficulty = e.detail.level
    } else {
      new_difficulty = e.detail.level
      announce('difficulty_change')
    }
  }

  function play(e) {
    board[e.detail.position] = 'x'
    last_played = e.detail.position
    if (won()) {
      let winner = lines().find(in_win_form)[0]
      if (winner === 'x') {
        wins += 1
        announce('win')
      } else {
        losses += 1
        announce('loss')
      }
    } else if (full_board()) {
      ties += 1
      announce('tie')
    } else {
      cpu_play()
    }
  }

  function cpu_play() {
    let cpu_move = think(difficulty)
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
    } else if (full_board()) {
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
      Object.values(horizontals()),
      Object.values(verticals()),
      Object.values(diagonals())
    ].flat()
  }

  const to_2d = (i) => ({x: i % 3, y: Math.floor(i / 3)})
  const to_1d = (x, y) => x + 3 * y
  const full_board = () => !board.some(cell => cell === '_')
  const almost_lost = () => lines().some(lose_potential)
  const lose_potential = (line) => !line.some((cell) => cell === 'o') && line.filter((cell) => cell === 'x').length == 2
  const in_win_form = (line) => line.every(cell => cell === line[0] && !line.some(cell => cell === '_'))

  function horizontals() {
    return {
      h1: board.slice(0, 3),
      h2: board.slice(3, 6),
      h3: board.slice(6)
    }
  }

  function verticals() {
    return {
      v1: [board[0], board[3], board[6]],
      v2: [board[1], board[4], board[7]],
      v3: [board[2], board[5], board[8]],
    }
  }

  function diagonals() {
    return {
      d1: [board[0], board[4], board[8]],
      d2: [board[2], board[4], board[6]],
    }
  }

  function look_around(last_played) {
    let { x, y } = to_2d(last_played)

    let result = []

    // Left
    if (x - 1 >= 0) {
      result.push({x: x - 1, y: y})
      if (y - 1 >= 0) {
        result.push({x: x - 1, y: y - 1})
      }
      if (y + 1 < 3) {
        result.push({x: x - 1, y: y + 1})
      }
    }

    // Centre
    if (y - 1 >= 0) {
      result.push({x: x, y: y - 1})
    }
    if (y + 1 < 3) {
      result.push({x: x, y: y + 1})
    }

    // Right
    if (x + 1 < 3) {
      result.push({x: x + 1, y: y})
      if (y - 1 >= 0) {
        result.push({x: x + 1, y: y - 1})
      }
      if (y + 1 < 3) {
        result.push({x: x + 1, y: y + 1})
      }
    }

    return result.map(({x, y}) => to_1d(x, y))
  }

  function randomly_pick({ from }) {
    return from[Math.floor(Math.random() * from.length)]
  }

  function find_blanks() {
    function getAllIndexes(arr, val) {
      var indexes = [], i = -1;
      while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
      }
      return indexes;
    }
    return getAllIndexes(board, '_')
  }

  /**
   * Ensure the player does not win on this line
   * @param {string} line_id - the key of the line we're concerned about
   */
  function defend(line_id) {
    let decision
    let components = line_id.split('')
    let groupings = {
      d: diagonals(),
      v: verticals(),
      h: horizontals()
    }
    let line = groupings[components[0]][line_id]
    let space = line.findIndex((e) => e != 'x')
    let offset = Number(components[1]) - 1
    switch (components[0]) {
      case 'h':
        decision = (offset * 3) + space
        break
      case 'v':
        decision = (space * 3) + offset
        break
      case 'd':
        if (components[1] === '1') {
          decision = space * 4
        } else if (components[1] === '2') {
          decision = (space + 1) * 2
        } else {
          console.log('Unreachable code has been reached 😱')
        }
        break
      default:
        console.log("Something went wrong.")
    }
    return decision
  }

  function clingy() {
    let result

    if (last_played) {
      let around = look_around(last_played)
      let possible_plays = around.filter((cell) => board[cell] === '_')
      if (possible_plays === undefined || possible_plays.length == 0) {
        let current_blanks = find_blanks()
        result = randomly_pick({ from: current_blanks })
      } else {
        result = randomly_pick({ from: possible_plays })
      }
    } else {
      // Play somewhere random
    }

    // Override if there's a potential to lose
    if (almost_lost()) {
      let concerns = []
      Array(horizontals(), verticals(), diagonals()).forEach((line_group) => {
        Object.entries(line_group).forEach(([id, line]) => {
          if (lose_potential(line)) {
            concerns.push(id)
          }
        })
      })
      result = defend(concerns[0]) // Make it blindly greedy
    }

    return result
  }

  function think(difficulty) {
    let decision
    switch (difficulty) {
      case '1':
        /* The Ignorant */
        decision = board.findIndex((element) => element === '_')
        break
      case '2':
        /* The Clingy */
        decision = clingy()
        break
      case '3':
        // For the first move…
        // Aggressively take the centre if it's free.
        // Else take one of the corners
        if (board.filter((cell) => cell != '_').length == 1) {
          if (board[4] === '_')
            decision = 4
          else
            decision = randomly_pick({ from: [0, 2, 6, 8] })
        } else {
          // Mid game play can be clingy for now
          decision = clingy()
        }
        break
      default:
        console.log("Unknwown Difficulty")
    }
    return decision
  }

  function updateCell({ where }) {
    board[where] = 'o'
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
