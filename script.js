function start() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle="black";
    ctx.fillRect(0,0,640,480);
}

zd = (Math.random()<0.5) ? -1 : 1; 
zy = (Math.random()<0.5) ? -1 : 1; 

//animacja pilki zmienne
ball = {
    x: 320,
    y: 240,
    dx: zd,
    dy: zy,
    move: function (){
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }
}

pad1 = {
    y: 240-25, 
    dy: 0 
}

pad2 = {
    y: 240-25,
    dy: 0
}

var score1 = 0;
var score2 = 0;

function backgroundMusic(){
    audio = document.getElementById("background");
    audio.play();
}


function drawLine () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(320,0);
    ctx.lineTo(320,480);
    ctx.setLineDash([10, 15]);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function stopTheBall(){
    dxx = ball.dx;
    dyy = ball.dy;
    ball.dx = 0;
    ball.dy = 0;
}

function moveTheBall(){
    ball.dx = dxx;
    ball.dy = dyy;
}

function reset (){
    score1 = 0;
    score2 = 0;
    ball.x = 320; 
    ball.y = 240;
    pad1.y = 215; 
    pad2.y = 215;
    ball.dx = (Math.random()<0.5) ? -1 : 1;
    ball.dy = (Math.random()<0.5) ? -1 : 1;
    stopTheBall();
}

function drawScore() {
    ctx.font = "20px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText(score1+"       "+score2, 288, 30);
}

function drawBall() {
    
    ball.move();
    
    if(ball.y>475){
        ball.dy = -ball.dy;
        ball.y = 475;
        audio = document.getElementById("wall");
        audio.play();
    }
    
    if(ball.x>635){ 
        score1++;
        ball.x = 320;
        ball.y = 240;
        pad1.y = 215; 
        pad2.y = 215;
        ball.dx = (Math.random()<0.5) ? -1 : 1;
        ball.dy = (Math.random()<0.5) ? -1 : 1; 
        audio = document.getElementById("point");
        audio.play();
    } 
    
    if(ball.y<5){
        ball.dy = -ball.dy;
        ball.y = 5;
        audio = document.getElementById("wall");
        audio.play();
    }
    
    if(ball.x<5){ 
        score2++;
        ball.x = 320;
        ball.y = 240;
        pad1.y = 215; 
        pad2.y = 215;
        ball.dx = (Math.random()<0.5) ? -1 : 1;
        ball.dy = (Math.random()<0.5) ? -1 : 1; 
        audio = document.getElementById("point");
        audio.play();
    } 
    
    if (ball.dx<0){
        if((ball.x>12+15)&&(ball.x<=15+15)){
                if((pad1.y<=ball.y)&&(ball.y<=pad1.y+50)){
                    ball.dx = -ball.dx;
                    ball.x=15+15; 
                    audio = document.getElementById("pad");
                    audio.play();
                }
           }
    }
    
    if (ball.dx>0){
        if((ball.x<640-(12+15))&&(ball.x>=640-(15+15))){
                if((pad2.y<=ball.y)&&(ball.y<=pad2.y+50)){
                    ball.dx = -ball.dx;
                    ball.x=640-(15+15); 
                    audio = document.getElementById("pad");
                    audio.play();
                }
           }
    }
    
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.arc(ball.x, ball.y, 5, 0, 2*Math.PI);
    ctx.fill();
}

function drawPad(){
    pad1.y = pad1.y + pad1.dy; 
    pad2.y = pad2.y + pad2.dy;
    
    if(pad1.y>430){
        pad1.y = 430;
    }
    
    if(pad1.y<0){
        pad1.y = 0;
    }
    
    if(pad2.y>430){
        pad2.y = 430;
    }
    
    if(pad2.y<0){
        pad2.y = 0;
    }
    
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.fillRect(20, pad1.y, 5, 50); 
    
    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.fillRect(635-20, pad2.y, 5, 50); 
}

function keyDown(event){
    console.log(event);
    if(event.keyCode==90){
        pad1.dy = 1;
    }
    if(event.keyCode==65){
        pad1.dy = -1;
    }
    if(event.keyCode==38){ 
        pad2.dy = -1;
    }
    if(event.keyCode==40){ 
        pad2.dy = 1;
    }
}

function keyUp(event){
    if(event.keyCode==90){
        pad1.dy = 0;
    }
    if(event.keyCode==65){ 
        pad1.dy = 0;
    }
    if(event.keyCode==38){
        pad2.dy = 0;
    }
    if(event.keyCode==40){
        pad2.dy = 0;
    }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function startGame(){
    sleep(1000);
    moveTheBall();
}

start(); 
stopTheBall();

setInterval (function(){
    start();
    drawBall();
    drawPad();
    drawScore();
    drawLine();
}, 6);

