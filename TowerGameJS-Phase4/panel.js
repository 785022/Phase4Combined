"use strict"
class Panel{
  constructor(game, x,y, id){
      this.x = x
      this.y = y
      this.pImg = new Image();
      this.pImg.addEventListener('error', function() { console.log(this.imgName + " failed to load"); }, false);
      this.game=game
      this.imgName = 'woodPanel.jpg'; // large image for menu tile
      this.pImg.src = this.imgName;
      this.thing = document.createElement("div")
      this.thing.id = id
      this.thing.style.width = 1024+"px"
      this.thing.style.height = 768+"px"
      this.thing.style.position = "absolute"
      this.thing.style.backgroundImage = 'url("woodPanel.jpg")'
      this.thing.style.top = this.y+"px"
      this.thing.style.left = this.x+"px"
      this.wrapper = document.getElementById('wrapperDiv')
      this.wrapper.appendChild(this.thing)
      //this.thing.appendChild(this.pImg);
      this.temp = 0
      this.intcrament  = 0
      this.go = false
  }

  render(){
    //console.log(this.y)
    this.temp = this.lerp(this.y,0,.05)
    this.thing.style.top = this.y+"px"
    this.thing.style.left = this.x+"px"
    if(this.y <= 100){
      if(this.temp <-1){
        this.y = this.temp
      }
    }
    //this.ctx.drawImage(this.pImg, this.pLoc.x, this.pLoc.y)
    //this.pLoc.vec.y += 1
  }

  ceatebutton(texts, thing, id){
    this.button = document.createElement("button")
    this.button.addEventListener('click',thing, false)
    this.button.innerHTML = texts
    this.button.id = id
    this.thing.appendChild(this.button)
  }

  lerp( a,  b,  f){
  //console.log(a + f * (b - a))
    return a + f * (b - a)
  }

}
