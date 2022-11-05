import x_pic from '../lib/images/x_pic.png'
import o_pic from '../lib/images/o_pic.png'

/** @type {import('./$types').PageServerLoad} */
export const load = ({ cookies }) => {
  const game = new TTT(cookies.get('ttt'))
  game.reset()

  return {
    wins: game.wins,
    losses: game.losses,
    ties: game.ties
  };
};

class TTT {
  /**
   * Create the game object from cookie, or initialize a new game
   * @param {string | undefined} serialized
   */
  constructor(serialized) {
    if (serialized) {
      const stats = serialized.split('-')
      this.board = new Board()
      this.spots = {
        'cpu': [],
        'user': []
      }
      this.wins = stats[0]
      this.ties = stats[1]
      this.losses = stats[2]
      this.difficulty = stats[3]
    } else {
      this.board = new Board()

      this.spots = {
        'cpu': [],
        'user': []
      }

      this.wins = 0
      this.ties = 0
      this.losses = 0
      this.difficulty = 1
    }
  }

  /**
   * Wipe the board clean.
   */
  reset() {
    this.emptySpots = this.board.length
    Object.values(this.spots).forEach((s) => s.splice(0, s.length))
  }

  serialize() {
    return `${this.wins}-${this.ties}-${this.losses}-${this.difficulty}`
  }
}

const BOARD_ROWS = 3
const BOARD_COLUMNS = 3

class Board {
  /**
   * Initialize board
   */
  constructor() {
    this._data = new Array(BOARD_ROWS * BOARD_COLUMNS)
  }

  length() {
    return this._data.length
  }
}
