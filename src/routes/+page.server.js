import x_pic from '../lib/images/x_pic.png'
import o_pic from '../lib/images/o_pic.png'

/** @type {import('./$types').PageServerLoad} */
export const load = ({ cookies }) => {
  const game = new TTT(cookies.get('ttt'))
  game.reset()
}

class TTT {
  /**
   * Create the game object from cookie, or initialize a new game
   * @param {string | undefined} serialized
   */
  constructor(serialized) {
    if (serialized) {
      this.board = new Board()
      this.spots = {
        'cpu': [],
        'user': []
      }
    } else {
      this.board = new Board()

      /* @type {Object.<String, Array>} */
      this.spots = {
        'cpu': [],
        'user': []
      }
    }
  }

  /**
   * Wipe the board clean.
   */
  reset() {
    // document.querySelectorAll('.cell').forEach((n) => n.innerHTML = '')
    this.emptySpots = this.board.length
    Object.values(this.spots).forEach((s) => s.splice(0, s.length))

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
