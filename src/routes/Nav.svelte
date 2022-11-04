<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function sendResetEvent() {
    dispatch('ttt_reset')
  }
</script>

<nav id="mainNav">
  <li id="mmenu1" name="new game">New Game</li>
  <li id="mmenu2" name="reset" on:click={sendResetEvent} on:keydown={sendResetEvent}>Reset</li>
</nav>

<style>
nav {
  display: block;
  clear: both;
}
#mainNav li {
  width: 100px;
  display: inline-block;
  background-image: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#666666),
    to(#666666),
    color-stop(0.6, #333)
  );
  background-image: -moz-linear-gradient(19% 75% 90deg, #666666, #333 60%, #666666 100%);
  padding: 7px;
  text-align: center;
  color: white;
  font-size: 1.1em;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  text-shadow: 0 -1px 0 black;
  -webkit-box-shadow: 1px 1px 2px black;
  -moz-box-shadow: 1px 1px 2px black;
  -webkit-transition: -webkit-box-shadow 1s linear;
  -moz-transition: -moz-box-shadow 1s linear;
}
#mainNav li:active {
  -webkit-box-shadow: inset 1px 1px 2px black;
  -moz-box-shadow: inset 1px 1px 2px black;
}
</style>
