<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function changeDifficulty(e) {
    e.preventDefault()

    let current_difficulty = document.querySelector('.selected')
    current_difficulty.classList.remove('selected')
    e.target.classList.add('selected')

    dispatch('ttt_difficulty', {
      level: e.target.id
    })
  }
</script>

<section id="difficulty">
  <p><strong>Tick-Tack Attitude</strong></p>
  <li on:click={changeDifficulty} on:keydown={changeDifficulty} id="1" class="selected">The Ignorant</li>
  <li on:click={changeDifficulty} on:keydown={changeDifficulty} id="2">The Clingy</li>
  <li on:click={changeDifficulty} on:keydown={changeDifficulty} id="3">iGbanam iGravity</li>
</section>

<style>
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
