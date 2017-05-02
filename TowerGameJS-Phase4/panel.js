"use strict"
class Panel{
  constructor(game, x,y){
      this.x = x
      this.y = y
      this.pImg = new Image();
      this.pImg.addEventListener('error', function() { console.log(this.imgName + " failed to load"); }, false);
      this.game=game
      this.imgName = 'woodPanel.jpg'; // large image for menu tile
      this.pImg.src = this.imgName;
      this.thing = document.createElement("div")
      this.thing.id = "panel"
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
  }

  render(){
    //this.temp = lerp(this.thing.style.top,0,.05)
    this.thing.style.top = this.y+"px"
    this.thing.style.left = this.x+"px"
    if(this.y <= 100)
    this.y += 5
    //this.ctx.drawImage(this.pImg, this.pLoc.x, this.pLoc.y)
    //this.pLoc.vec.y += 1
  }

  ceatebutton(texts){
    this.button = document.createElement("button")
    this.button.panelVar = false
    this.button.addEventListener('click',this.clickedButton, false)
    /*
    this.button.addEventListener('click',
    function(){
      this.panelVar = true;
      console.log(this.panelVar + document.getElementById(this.id).id)
      }, false)
      */
    this.button.innerHTML = texts
    this.button.id = this.intcrament
    this.intcrament += 1
    this.thing.appendChild(this.button)
  }

  clickedButton(){
    console.log(this.panelVar+document.getElementById(this.id).id)
    this.panelVar = !this.panelVar;
    console.log(this.panelVar+document.getElementById(this.id).id)
  }

  lerp( a,  b,  f){
    return a + f * (b - a)
  }

}