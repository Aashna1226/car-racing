var ball;
var hypotheticball, database, position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    hypotheticball = createSprite(250,250,10,10);
    hypotheticball.shapeColor = "red";
    var hypoballPos = database.ref('ball/position');
    hypoballPos.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function rightPosition(x,y){
    database.ref('ball/position').set({
        'x' : position.x + x,
        'y' : position.y + y

    })
}

function readPosition(data){
    position = data.val();
    hypotheticball.x = position.x;
    hypotheticball.y = position.y;
}

function showError(){
    console.log("ERROR in database")
}