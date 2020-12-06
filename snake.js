function init(){
canvas=document.getElementById("mycanvas");
canvas.width=canvas.height=w=h=600;
pen= canvas.getContext('2d');
cs=35;
speed=200;
game_over="false";
food=getRandomFood();
game_score=0;

food_img=new Image();
food_img.src="images/apple2.png";
trophy=new Image();
trophy.src="images/trophy1.png";

snake={
    init_len:5,
    color:"blue",
    cells:[],
    direction:"Right",

    createsnake:function(){
         for(var i=this.init_len;i>0;i--)
         this.cells.push({x:i,y:0});
    },
    drawsnake:function(){
        for(var i=0;i<this.cells.length;i++){
            pen.fillStyle = this.color;
            pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-1,cs-3);
        }
    },
    updatesnake:function(){
        var headX=this.cells[0].x;
        var headY=this.cells[0].y;
        if(headX==food.x&&headY==food.y)
        {
            console.log("food eaten");
            food=getRandomFood();
            game_score++;
        }
        else{
            this.cells.pop();
        }

var nextX,nextY;

if(this.direction=="Right")
{
var nextX=headX+1;
var nextY=headY;
}
else if(this.direction=="Left")
{
var nextX=headX-1;
var nextY=headY;
}
else if(this.direction=="Down")
{
var nextX=headX;
var nextY=headY+1;
}
else if(this.direction=="Up"){
    var nextX=headX;
var nextY=headY-1;
}
this.cells.unshift({x:nextX,y:nextY});

last_x=Math.round(w/cs);
last_y=Math.round(h/cs);
if(this.cells[0].x<0||this.cells[0].y<0||this.cells[0].x>last_x-1||this.cells[0].y>last_y-1)
{
   game_over="true";
}

    },
    
};
snake.createsnake();

function keyPressed(e){

    if(e.key=="ArrowRight")
    {
        snake.direction="Right";
    }
    else if(e.key=="ArrowLeft")
    {
        snake.direction="Left";
    }
    else if(e.key=="ArrowDown")
    {
        snake.direction="Down";
    }
    else{
        snake.direction="Up";
    }

}
document.addEventListener('keydown',keyPressed);

}


function draw(){
    pen.clearRect(0,0,w,h);
    snake.drawsnake();
    pen.fillStyle=food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(trophy,5,5,cs,cs);
    pen.fillStyle="red";
    pen.font="30px roboto";
    pen.fillText(game_score,42,32);

}


function update(){
   snake.updatesnake();
}

function getRandomFood(){

foodX=Math.round(Math.random()*(w-cs)/cs);
foodY=Math.round(Math.random()*(h-cs)/cs);
var food={
 x:foodX,
 y:foodY,
 color:"red",
};
return food;

}

function gameLoop(){
    if(game_over=="true")
    {
        clearInterval(f);
        alert("Game Over!");
    }
    update();
    draw();

}

init();

var f= setInterval(gameLoop,speed);
