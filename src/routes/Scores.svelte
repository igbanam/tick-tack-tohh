<script>
  export let wins, ties, losses
</script>

<section id="information">
  <strong>Information</strong>
  <p>Wins: <span id="wins">{wins}</span></p>
  <p>Losses: <span id="losses">{losses}</span></p>
  <p>Ties: <span id="ties">{ties}</span></p>
  <p id="announcement">You win!</p>
</section>

<style>
  #information {
    background-color: rgba(0, 0, 0, 0.3);
    padding: 15px;
    margin-top: 20px;
    width: 200px;
    color: white;
    font-size: 1.05em;
    text-shadow: 0 -1px 1px black;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px 10px;
    -webkit-border-radius: 10px 10px;
    -moz-border-radius: 10px 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5), inset 0 1px rgba(255, 255, 255, 0.3),
      inset 0 10px rgba(255, 255, 255, 0.2), inset 0 10px 20px rgba(255, 255, 255, 0.25),
      inset 0 -15px 30px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5), inset 0 1px rgba(255, 255, 255, 0.3),
        inset 0 10px rgba(255, 255, 255, 0.2), inset 0 10px 20px rgba(255, 255, 255, 0.25),
        inset 0 -15px 30px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5), inset 0 1px rgba(255, 255, 255, 0.3),
          inset 0 10px rgba(255, 255, 255, 0.2), inset 0 10px 20px rgba(255, 255, 255, 0.25),
          inset 0 -15px 30px rgba(0, 0, 0, 0.3);
  }

  #information > #announcement {
    font-weight: 900;
    font-size: 22px;
    font-variant: small-caps;
    text-align: center;
    border: 2px solid rgba(255, 10, 10, 0.8);
    background-color: rgba(200, 0, 0, 0.3);
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    display: none;
  }
</style>
