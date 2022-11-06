import x_pic from '../lib/images/x_pic.png'
import o_pic from '../lib/images/o_pic.png'

/** @type {import('./$types').PageServerLoad} */
export const load = ({ cookies }) => {
  const game = new TTT(cookies.get('ttt'))
  game.reset()

  return {
    wins: game.wins,
    losses: game.losses,
    ties: game.ties,
    difficulty: game.difficulty,
    board: game.board
  };
};

class TTT {
  /**
   * Create the game object from cookie, or initialize a new game
   * @param {string | undefined} serialized
   */
  constructor(serialized) {
    if (serialized) {
      const from_cookie = serialized.split('-')
      this.board = new Board()
      this.spots = {
        'cpu': [],
        'user': []
      }
      this.wins = from_cookie[0]
      this.ties = from_cookie[1]
      this.losses = from_cookie[2]
      this.difficulty = from_cookie[3]
      this.board = from_cookie[4].split('+')
    } else {
      this.board = new Board()

      this.spots = {
        'cpu': [],
        'user': []
      }

      this.wins = 0
      this.ties = 0
      this.losses = 0
      this.difficulty = '1'
      this.board = new Array(9)
      this.board.fill('_')
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
    return `${this.wins}-${this.ties}-${this.losses}-${this.difficulty}-${this.board.join('+')}`
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
