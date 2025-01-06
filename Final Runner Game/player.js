import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from "./playerStates.js";
import { CollisionAnimation } from "./collisionAnimation.js";
import { FloatingMessage } from "./floatingmessage.js";

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
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];   //array to store the different states of the object
        
    }
    update(input, deltaTime){
        this.checkCollision(); //to constantly check the collision
        this.currentState.handleInput(input);
        // horizontal movement
        this.x += this.speed;
        if(input.includes("ArrowRight") && this.currentState !== this.states[6] ) this.speed = this.maxSpeed;   // to diable left and right movement when the player is hit
        else if(input.includes("ArrowLeft") && this.currentState !== this.states[6]) this.speed = -this.maxSpeed;
        else this.speed = 0;
        //horizontal boundaries
        if(this.x < 0) this.x = 0;
        else if( this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        //vertical movement
        // if(input.includes("ArrowUp") && this.onGround()) this.vy -= 2;
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        //vertical boundaries
        if(this.y < 0) this.y = 0;
        else if (this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;
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
            this.game.collisions.push( new CollisionAnimation(this.game, enemy.x, enemy.y));
            if(this.currentState === this.states[4] || this.currentState === this.states[5]){
                this.game.score++;
                this.game.floatingMessages.push(new FloatingMessage('+1', enemy.x, enemy.y, 120, 20));
            }else{
                this.setState(6,0);         //play the hit animation on collision and game spped will become 0
                this.game.lives--;
                if(this.game.lives <= 0) this.game.gameOver = true;
            } 
          }
        });
    }
}