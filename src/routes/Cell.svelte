<script>
  import x_pic from '$lib/images/x_pic.png'
  /* import o_pic from '$lib/images/o_pic.png' */

  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let id, last = false

  function placeIcon(e) {
    e.preventDefault()
    let node = e.target
    const x = document.createElement('img')
    x.src = x_pic
    node.appendChild(x)

    dispatch('ttt_move', {
      position: e.target.id
    })
  }
</script>

<div class="cell {last ? 'last' : ''}" id={id} on:keydown={placeIcon} on:click={placeIcon}></div>

<style>
  .cell {
    border-right: 2px solid #cc6;
    width: 130px;
    height: 130px;
    float: left;
    text-align: center;
    vertical-align: bottom;
  }

  .last {
    border-right: none;
  }
</style>
