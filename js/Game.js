class Game {
  constructor() {
    this.resetButton =createButton("");
   
    this.resetTitle = createElement("h2");
   
    this.leaderboardTitle = createElement("h2");
   
    this.liderUm = createElement("h2");
   
    this.liderDois = createElement("h2");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
   
    this.resetTitle.html("Clique para reiniciar");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width/2+200, 40); 
   
    this.resetButton.class("resetButton");
    this.resetButton.position(width/2+230, 100); 

    this.leaderboardTitle.html("Leaderboard");
    this.leaderboardTitle.class("resetText");
    this.leaderboardTitle.position(width/3-60, 40);

    this.liderUm.class("leadersText");
    this.liderUm.position(width/3-50, 80); 

    this.liderDois.class("leadersText");
    this.liderDois.position(width/3-50, 130); 

  }

  play() {
    this.handleElements();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      this.showLeaderboard();

      var indice = 0;

      for (var plr in allPlayers){
        indice+= 1;

        var carX = allPlayers[plr].positionX;
        var carY = height- allPlayers[plr].positionY;

        cars[indice-1].position.x = carX;
        cars[indice-1].position.y = carY;
      }

      this.handlePlayerControls();

      this.handleResetButton();
    
      drawSprites();
    }
  }
  handlePlayerControls(){
    if (keyIsDown(UP_ARROW)){
      player.positionY += 10;
      player.update();
    }
  }

  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (allPlayers[0].rank === 0 && allPlayers[1].rank === 0) ||
      allPlayers[0].rank === 1
    ) {
      
      leader1 =
        allPlayers[0].rank +
        "&emsp;" +
        allPlayers[0].name +
        "&emsp;" +
        allPlayers[0].score;

      leader2 =
        allPlayers[1].rank +
        "&emsp;" +
        allPlayers[1].name +
        "&emsp;" +
        allPlayers[1].score;
    }

    if (allPlayers[1].rank === 1) {
      leader1 =
        allPlayers[1].rank +
        "&emsp;" +
        allPlayers[1].name +
        "&emsp;" +
        allPlayers[1].score;

      leader2 =
        allPlayers[0].rank +
        "&emsp;" +
        allPlayers[0].name +
        "&emsp;" +
        allPlayers[0].score;
    }

    this.liderUm.html(leader1);
    this.liderDois.html(leader2);
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }


}
