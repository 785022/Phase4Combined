
class Wave {
  constructor(game,waveJson) {
    this.game=game
    this.waveJson=waveJson
    console.log(this.waveJson)
    this.enemyId=[0,0]
    this.referenceTime=this.game.gameTime+this.waveJson.waveIncrement
    this.spawnOver=false
  }
  run() {
    if(!this.spawnOver){
      while(this.game.gameTime>this.referenceTime){
        if(this.enemyId[0]<this.waveJson.packets.length){
          if(this.enemyId[1]<this.waveJson.packets[this.enemyId[0]].num){
            this.game.enemies.push(this.enemySelector(this.game,this.waveJson.packets[this.enemyId[0]].enemy))
            this.referenceTime+=this.waveJson.packets[this.enemyId[0]].enemyIncrement
            this.enemyId[1]+=1
          }else{
            this.referenceTime+=this.waveJson.packets[this.enemyId[0]].packetIncrement
            this.enemyId[1]=0
            this.enemyId[0]+=1
          }
        }else{
          this.spawnOver=true
          break
        }
      }
    }
  }
  isWaveOver() {
    if(!this.game.enemies[0] && this.spawnOver){
      return true
    }else{
      return false
    }
  }
    //parses JSON
    enemySelector(game,enemyJSON) {
      for(i = 0; i < 3; i++) { // try 3 times to find valid start cell
        // will caculate row and column within the range specified by JSON file
        let row = Math.floor(Math.floor(Math.random()*(game.rows*(enemyJSON.enemyPosition[1][1]-enemyJSON.enemyPosition[1][0])))+game.rows*enemyJSON.enemyPosition[1][0]);
        let col = Math.floor(Math.floor(Math.random()*(game.cols*(enemyJSON.enemyPosition[0][1]-enemyJSON.enemyPosition[0][0])))+game.cols*enemyJSON.enemyPosition[0][0]);
        startCell = game.grid[col][row];
        if(startCell && startCell.parent)   // must have a parent to have any path
        break;
      }
      if(i < 3) { // if we found a valid cell to start the enemy
        //create an array of the arguments for the enemy class
        var args=[null,game,startCell].concat(enemyJSON.additionalEnemyArguments)
        //apply the argument array to the specified enemy class
        var tempEnemy= enemyJSON.enemy.bind.apply(enemyJSON.enemy,args)
        return new tempEnemy
      }
    }
}
//so yeah,theres stuff here
//AllWaves is an array of waves. each wave has a name and a wave increment. the wave increment is the amount of time before a wave begins.
//waves are seperated into packets. each packet specifies the enemy type, enemy increment, packet increment, and number of enemies.
//enemyIncrement is amount of time between two enemy spawns. if enemy increment is less than 1, multiple enemies will spawn at the same time.
//packetIncrement is the amount of time that must pass before the next packet can begin.
//num is the number of enemies that will be spawned before the packet is over
//enemy is a JSON object that specifes the exact type of enemy to be spawned and is parsed by the enemySelector function
//enemy contains enemy, enemyPosition, and additionalEnemyArguments.
//enemy within enemy specifies the enemy class to be called
//enemyPosition is a 2d array that spefies the area in whicch an enemt will be randomly spawned
//the numbers are formated as fractions of the total grid with the smaller number coming first
//additionalEnemyArguments specifies any additional arguments that might be added to an enemy class
AllWaves=[
  {
    "packets":[
      {
        "enemy":{
          "enemy":Enemy1,
          "enemyPosition":[
            [
              0,1
            ],
            [
              0,.5
            ]
          ],
          "additionalEnemyArguments":[
            1
          ]
        },
        "num":10,
        "enemyIncrement":1,
        "packetIncrement":1
      },
      {
        "enemy":{
          "enemy":Enemy,
          "enemyPosition":[
            [
              0,1
            ],
            [
              0,.5
            ]
          ],
          "additionalEnemyArguments":[
            0
          ]
        },
        "num":10,
        "enemyIncrement":.3,
        "packetIncrement":1
      }
    ],
    "name":"wave1",
    "waveIncrement":3
  },
  {
    "packets":[
      {
        "enemy":{
          "enemy":Enemy,
          "enemyPosition":[
            [
              0,1
            ],
            [
              0,.5
            ]
          ],
          "additionalEnemyArguments":[
            1
          ]
        },
        "num":10,
        "enemyIncrement":.1,
        "packetIncrement":1
      },
      {
        "enemy":{
          "enemy":Enemy,
          "enemyPosition":[
            [
              0,1
            ],
            [
              0,.5
            ]
          ],
          "additionalEnemyArguments":[
            0
          ]
        },
        "num":10,
        "enemyIncrement":1,
        "packetIncrement":1
      }
    ],
    "name":"wave2",
    "waveIncrement":3
  },
  {
    "packets":[
      {
        "enemy":{
          "enemy":Enemy,
          "enemyPosition":[
            [
              0,1
            ],
            [
              0,1
            ]
          ],
          "additionalEnemyArguments":[
            1
          ]
        },
        "num":Infinity,
        "enemyIncrement":.1,
        "packetIncrement":1
      },
      {
        "enemy":{
          "enemy":Enemy,
          "enemyPosition":[
            [
              0,1
            ],
            [
              0,.5
            ]
          ],
          "additionalEnemyArguments":[
            0
          ]
        },
        "num":10,
        "enemyIncrement":1,
        "packetIncrement":1
      }
    ],
    "name":"infinite wave",
    "waveIncrement":3,
    "info":"this wave should always be the last wave"
  }
]
