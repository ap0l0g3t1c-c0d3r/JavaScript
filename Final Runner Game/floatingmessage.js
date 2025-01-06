export class FloatingMessage{
    constructor(value, x, y, targetX, targetY){
        this.value = value;
        this.x = x; 
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.markedForDeletion = false;
        this.timer = 0;
    }
    update(){
        this.x += (this.targetX - this.x) * 0.01; //we are reducing the difference to only 1% since right now the value is moving very fast 
        this.y += (this.targetY - this.y) * 0.01;   // by * by 0.01 the text would move towards the target position by 3% of the distance per animation frame 
        this.timer++;
        if(this.timer > 100) this.markedForDeletion = true;
    }
    draw(context){
        context.font = '20px Creepster';
        context.fillStyle = 'white';
        context.fillText(this.value, this.x, this.y);
        context.fillStyle = 'black';
        context.fillText(this.value, this.x - 2, this.y - 2);
    }
}