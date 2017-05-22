'use strict'

class Bullet{

  constructor(location, bImg, angle){
    // issue#1 use preloaded bullet image instead of loadImage
    this.loc = location;
    this.speed = 12;
    this.angle = angle;
    this.img = bImg;
    this.vel=vector2d( Math.cos(this.angle)*this.speed, Math.sin(this.angle)*this.speed)
  }

  run(){
    this.render();
    this.update();
  }
  render(){

    var ctx = towerGame.context;
    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.img, -this.img.width/2,-this.img.height/2);

    ctx.restore();
  }

  update(){
    this.loc.y += this.vel.y;
    this.loc.x += this.vel.x;

  }
}//  end Bullet class
class funBullet extends Bullet{
  constructor(location, bImg, angle){
    super(location, bImg, angle)
  }
  run(){
    this.render()
    this.update()
    this.fun()
  }
  fun(){
    towerGame.bullets.push(new Bullet(this.loc.copy(),this.img,Math.random()*360))
  }
}
