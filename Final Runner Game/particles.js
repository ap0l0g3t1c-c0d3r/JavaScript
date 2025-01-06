class Particles{
    constructor(game){
        this.game = game;
        this.markedForDeletion = false;
    }
    update(){
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.90;  //we want size of each particle to decrease by 5%
        if(this.size < 0.05) this.markedForDeletion = true;
    }
}

export class Dust extends Particles{
    constructor(game, x, y){
        super(game);
        this.size = Math.random() * 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = "rgb(0, 0, 0, 0.2)";
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0,  Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}

export class Splash extends Particles{
    constructor(game, x, y){
        super(game);
        this.size = Math.random() * 100 + 100;
        this.x = x - this.size * 0.4; 
        this.y = y - this.size * 0.5;
        this.image = document.getElementById("fire");
        this.speedX = Math.random() * 6 - 4; //for both sides particles would be visible
        this.speedY = Math.random() * 2 + 2;
        this.gravity = 0;
    }
    update(){
        super.update();
        this.gravity += 0.1;
        this.y += this.gravity;

    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}

export class Fire extends Particles{
    constructor(game, x, y){
        super(game);
        this.image = document.getElementById("fire");
        this.x = x;
        this.y = y;
        this.size = Math.random() * 100 + 50;
        this.speedY = 1;
        this.speedX = 1;
        //helper variables to rotate the image
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1; //velocity of angle btw 0.1 and -0.1;
    }
    update(){
        super.update();
        this.angle += this.va;
        this.x += Math.sin(this.angle * 10); 
    }
    draw(context){
        context.save(); //to avoid bubling effect
        context.translate(this.x , this.y + this.game.player.height * 0.5);  //this would move the relative position or origin from (0,0) to this.x, this.y 
        context.rotate(this.angle);
        context.drawImage(this.image, 0, -this.game.player.height * 0.5, this.size, this.size);
        // context.drawImage(this.image, this.x, this.y, this.size, this.size); //since the origin has moved the x and y co-ordinates needs to be refactored to 0 and 0
        context.restore();
    }
}