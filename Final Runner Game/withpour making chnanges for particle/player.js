import { Sitting, Running, Jumping, Falling, Rolling } from "./playerStates.js";

export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById("player");
        this.vy = 0;
        this.weight = 1; 
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 0; //maxmimum horizontal frames for sprite
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;     //horizontal speed
        this.maxSpeed = 5; //supporter variable for speed
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game)];   //array to store the different states of the object
        
    }
    update(input, deltaTime){
        this.checkCollision(); //to constantly check the collision
        this.currentState.handleInput(input);
        // horizontal movement
        this.x += this.speed;
        if(input.includes("ArrowRight")) this.speed = this.maxSpeed;
        else if(input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if(this.x < 0) this.x = 0;
        else if( this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        //vertical movement
        // if(input.includes("ArrowUp") && this.onGround()) this.vy -= 2;
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        //sprite animation
        if(this.frameTimer >= this.frameInterval){
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
            this.frameTimer = 0;
        }else{
            this.frameTimer += deltaTime;
        }
    }
    draw(context){
        if(this.game.debug) context.strokeRect(this.x, this.y , this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;  //we also want to change the speed of the background when the states are changing
        this.currentState.enter();
    }
    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if( (enemy.x < this.x + this.width) && 
            (enemy.x + enemy.width > this.x) &&
            (enemy.y < this.y + this.height) &&
            (enemy.y + enemy.height > this.y)
        ){
            enemy.markedForDeletion = true;
            this.game.score++;
            }else{

            }
        });
    }
}