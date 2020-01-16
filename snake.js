const cvs=document.getElementById("snake");
const ctx=cvs.getContext("2d");

const box=32;

let snake= [];
snake[0] = {
    x:9*box,
    y:10*box
} 

let food={
x:0,
y:0
}

let score=0;
let stop=true;
function collusion(head,arr){
    for(let i = 0; i<arr.length;i++){
        if(head.x==arr[i].x&&head.y==arr[i].y){
            return true;
        }
    }
return false;
}
function control(){
    food.x=Math.floor(Math.random()*17+1)*box;
    food.y=Math.floor(Math.random()*17+1)*box;
    for(let i = 0; i<snake.length;i++){
        if(food.x==snake[i].x&&food.y==snake[i].y){
            return true;
        }
    }
    stop=false;
    return false;
}
let d="";
document.addEventListener("keydown",direction);

function direction(event){
if(event.keyCode == 37 && d !="RIGHT"){
d="LEFT";
}
else if(event.keyCode == 38 && d !="DOWN"){
d="UP";
}
else if(event.keyCode == 39 && d !="LEFT"){
d="RIGHT";
}
else if(event.keyCode == 40 && d !="UP"){
d="DOWN";
}


}
function draw(){



    ctx.fillStyle ="black";
    ctx.fillRect(0,0,608,608);

    ctx.fillStyle ="yellow";
    ctx.fillRect(box,box,608-2*box,608-2*box);
    for(let i = 0; i<snake.length;i++){
        ctx.fillStyle = (i==0)? "red": "blue";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
    }
    while(stop){
        control();
    }
    ctx.fillStyle ="purple";
    ctx.fillRect(food.x,food.y,box,box);

    let snakeX=snake[0].x;
    let snakeY=snake[0].y;

    

    if(d== "LEFT") snakeX-=box;
    if(d== "RIGHT") snakeX+=box;
    if(d== "UP") snakeY-=box;
    if(d== "DOWN") snakeY+=box;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        stop=true;
        while(stop){
            control();
        }
    }else{
        snake.pop();
    }

    

    let newHead={
        x:snakeX,
        y:snakeY
    }


    if(snakeX <box || snakeX > 17*box || snakeY < box || snakeY > 17*box|| collusion(newHead,snake)){
        clearInterval(game);
    }
    snake.unshift(newHead);
    ctx.fillStyle="white";
    ctx.font="45px Changa one";
    ctx.fillText(score,box,box);
}

let game = setInterval(draw,120);