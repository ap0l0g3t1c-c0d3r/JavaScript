class Layer{
    constructor(game, width, height, speedModifier, image){   
        /*we want the game the width,height at which we want to show the background
         the speed at which the background would be moving and the image for the background
        */ 
        this.game = game;
        this.width = width; //width of the image
        this.height = height; //height of the image
        this.speedModifier = speedModifier; //speed at which the background would move
        this.image = image;
        this.x = 0;     //where to draw the canvas x
        this.y = 0;     //where to draw the canvas y
    }
    update(){ //to update the movement of background and seeting of the background
        if(this.x < -this.width) this.x = 0;
        else this.x -= this.speedModifier * this.game.speed;
    }
    draw(context){ //to draw the background
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
    
}

//we only created one class for background since multiple bg images have same width and height else we could have extended those
export class Background{
    constructor(game){
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.layer1Image = document.getElementById('layer1');
        this.layer2Image = document.getElementById('layer2');
        this.layer3Image = document.getElementById('layer3');
        this.layer4Image = document.getElementById('layer4');
        this.layer5Image = document.getElementById('layer5');


        this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1Image);
        this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2Image);
        this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3Image);
        this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4Image);
        this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5Image);
        
        this.backgroundLayer = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];   //array to store all layer
    }
    update(){
        this.backgroundLayer.forEach(layer => {
            layer.update();
        });
    }
    draw(context){
        this.backgroundLayer.forEach(layer => {
            layer.draw(context);
        });
    }
}