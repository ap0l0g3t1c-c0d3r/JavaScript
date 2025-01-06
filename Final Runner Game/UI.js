export class UI{
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = "Creepster";
        this.livesImage = document.getElementById('lives');
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlue = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = "left";
        context.fillStyle = this.game.fontColor;
        context.fillText(`Score: ${this.game.score}`, 20, 50); 

        //timer
        context.font = this.fontSize * 0.80 + "px " + this.fontFamily;
        context.fillText(`Time: ${(this.game.time * 0.001).toFixed(1)}`, 20, 80);
        
        //lives
        for(let j = 0; j < this.game.lives; j++){
            context.drawImage(this.livesImage, 20 * j, 95, 25, 25);
        }
        
        //Game Over message
        if(this.game.gameOver){
            context.textAlign = "center";
            
            if( this.game.score > this.game.winningScore){
                context.font = this.fontSize * 1.5 + "px " + this.fontFamily;
                context.fillText(`Boo-ya `, this.game.width * 0.5 , this.game.height * 0.5);
                context.font = this.fontSize * 0.70 + "px " + this.fontFamily;
                context.fillText(`What are the creatures in night afraid of !!! BATMAN`, this.game.width * 0.5 , this.game.height * 0.5 + 20);
            }else{
                context.font = this.fontSize * 1.5 + "px " + this.fontFamily;
                context.fillText(`Game-Over Bozoo`, this.game.width * 0.5 , this.game.height * 0.5);
                context.font = this.fontSize * 0.70 + "px " + this.fontFamily;
                context.fillText(`Better luck next time`, this.game.width * 0.5 , this.game.height * 0.5 + 20);
            }
            
        }
        context.restore();
    }
}