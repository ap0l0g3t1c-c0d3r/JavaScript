export class CollisionAnimation{
    constructor(game, x, y){
        this.game = game;
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.image = document.getElementById("CollisionAnimation");
        this.sizeModifier = Math.random() + 0.5; //variable to modify the size
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frame = 0;
        this.maxFrame = 4;
        this.fps = Math.random() * 10 + 5;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;        
    }
    draw(context){
        context.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    update(deltaTime){
        this.x -= this.game.speed;  //so the collision do not get sticked to the canvas
        if(this.frameTimer > this.frameInterval){
            if(this.frame > this.maxFrame) this.markedForDeletion = true;
            else this.frame++;
            this.frameTimer = 0;
        }else{
            this.frameTimer += deltaTime;
        }
    }
}