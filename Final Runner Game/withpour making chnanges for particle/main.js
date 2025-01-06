import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js"
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemy.js";
import { UI } from "./UI.js";

window.addEventListener("load", function(e){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    
    canvas.width = 500;
    canvas.height = 500;

    class Game{
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 1;
            this.maxSpeed = 2;
            this.player = new Player(this); //since the player class takes game object we are passing this as argument
            this.input = new InputHandler(this);    //the game is passed as a parameter so we can toggle debug mode
            this.background = new Background(this);
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = true;
            this.score = 0;
            this.fontColor = "black";
            this.ui = new UI(this);
            //this.groundMargin = 5; //over here this is not working because the player instance is being created before this
            
        }
        update(deltaTime){
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            //handle enemies will add enemies to the array in timely manner
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            }else{
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach( enemy => {
                enemy.update(deltaTime);
                if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });
        }

        draw(context){
            this.background.draw(context); //so the background is drawn before the player
            this.player.draw(context);
            this.enemies.forEach( enemy => {
                enemy.draw(context);
            });
            this.ui.draw(context);
        }
        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));  //only add enemies when game speed is not zero and there is a 50% chance of adding a plant
            else if ( this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
            console.log(this.enemies);           
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);
    let LastTime = 0;

    function animate(timeStamp = 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - LastTime;
        LastTime = timeStamp;
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate();

});