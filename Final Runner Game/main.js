import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js"
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemy.js";
import { UI } from "./UI.js";


window.addEventListener("load", function(e){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    
    canvas.width = 900;
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
            this.enemies = [];      //to hold all the enemy
            this.particles = [];    //to hold all the particles
            this.collisions = [];    //to hold all the collisions
            this.floatingMessages = [];  //to hold all floating messages
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.winningScore = 40;
            this.fontColor = "black";
            this.ui = new UI(this);
            this.maxParticles = 50;
            this.time = 0;
            this.timeInterval = 30000;
            this.gameOver = false;
            this.lives = 5;
            //this.groundMargin = 5; //over here this is not working because the player instance is being created before this
            this.player.currentState = this.player.states[0]; // we put it here and not on player class because these properties were not getting loaded
            this.player.currentState.enter();  //when a player object is created we want to initialize its default state 
        }
        update(deltaTime){
            this.time += deltaTime;
            if( this.time > this.timeInterval) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            //handle enemies will add enemies to the array in timely manner
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            }else{
                this.enemyTimer += deltaTime;
            }
            //handle enemies
            this.enemies.forEach( enemy => {
                enemy.update(deltaTime);
                // if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });
            //handle particles
            this.particles.forEach( (particle, index) => {
                particle.update();
                // if( particle.markedForDeletion) this.particles.splice(index , 1);
            });
            if(this.particles.length > this.maxParticles){
                this.particles = this.particles.slice(0, this.maxParticles);
            }
            //handle collision
            this.collisions.forEach((collision,index) => {
                collision.update(deltaTime);
                // if(collision.markedForDeletion) this.collisions.splice(index, 1);
            });

            this.floatingMessages.forEach((message,index) => {
                message.update();
                // if(message.markedForDeletion) this.floatingMessages.splice(index, 1);
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);            
        }

        draw(context){
            this.background.draw(context); //so the background is drawn before the player
            this.player.draw(context);
            this.enemies.forEach( enemy => {
                enemy.draw(context);
            });
            
            this.particles.forEach( (particle) => {
                particle.draw(context);
            });

            this.collisions.forEach( collision => {
                collision.draw(context);
            });
            this.floatingMessages.forEach((message) => {
                message.draw(context);
            });
            this.ui.draw(context);
        }
        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));  //only add enemies when game speed is not zero and there is a 50% chance of adding a plant
            else if ( this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
            // console.log(this.enemies);           
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
        if(!game.gameOver) requestAnimationFrame(animate);
    }

    animate();

});