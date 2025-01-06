import { Dust } from "./particles.js";

const states = {
    SITTING: 0, 
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6,
}

class state{
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends state{
    constructor(game){
        super("SITTING", game);   //calling parent class and setting the name of the parent class     
    }
    enter(){
        this.game.player.frameX = 0; //sometimes it might happen on changing state one might have many frames and the other very less, so we want to reset the frames
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 5;
    }
    handleInput(input){ //switch game.player to different state through the defined input 
        if(input.includes("ArrowLeft") || input.includes("ArrowRight")){
            this.game.player.setState(states.RUNNING, 1);  
        }else if(input.includes("Enter")){
            this.game.player.setState(states.ROLLING, 2); //changing the speed to 2 on rolling on pressing enter  
        }
    }

}

export class Running extends state{
    constructor(game){
        super("RUNNING", game);   //calling parent class and setting the name of the parent class
        
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 3;
    }
    handleInput(input){ //switch game.player to different state through the defined input 
        if(input.includes("ArrowDown")){
            this.game.player.setState(states.SITTING, 0);
        }else if(input.includes("ArrowUp")){
            this.game.player.setState(states.JUMPING, 1); //game.player can jump when running
        }else if(input.includes("Enter")){
            this.game.player.setState(states.ROLLING, 2); //changing the speed to 2 on rolling on pressing enter  
        }
    }

}

export class Jumping extends state{
    constructor(game){
        super("JUMPING", game);   //calling parent class and setting the name of the parent class
        
    }
    enter(){
        this.game.player.frameX = 0;
        if(this.game.player.onGround()) this.game.player.vy -= 25;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 1;
    }
    handleInput(input){ //switch game.player to different state through the defined input 
        if(this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING, 1);
        }else if(input.includes("Enter")){
            this.game.player.setState(states.ROLLING, 2); //changing the speed to 2 on rolling on pressing enter  
        }
    }

}

export class Falling extends state{
    constructor(game){
        super("FALLING", game);   //calling parent class and setting the name of the parent class
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 2;
    }
    handleInput(input){ //switch game.player to different state through the defined input 
        if(this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        }
    }

}

export class Rolling extends state{
    constructor(game){
        super("ROLLING", game);   //calling parent class and setting the name of the parent class
        
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
    }
    handleInput(input){ //switch game.player to different state through the defined input 
        if(!input.includes("Enter") && this.game.player.onGround()){  //if enter is not on last keys and game.player is on ground we would switch to running stage
            this.game.player.setState(states.RUNNING, 1);
        }else if(!input.includes("Enter") && !this.game.player.onGround()){  //if enter is not on last keys and game.player is not on ground we would switch to Falling stage
            this.game.player.setState(states.FALLING, 1);
        }else if(input.includes("ArrowUp") && this.game.player.onGround() && input.includes("Enter")){
            this.game.player.vy -= 25;
        }
    }

}