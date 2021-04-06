import test from './index.test.js'

const sceneryTest = ['X', 'O', '', 
                      '', 'X', 'X', 
                      '', '', 'O']

const evailsonScript = (scenery, myMove) => {
  console.clear()

  let playIndex = 0
  let intScenery
  let intAbstract
  const abstractSceneryMap = {
    firstDia: [0, 4, 8],
    secondDia: [2, 4, 6],
    firstRow: [0, 1, 2],
    secondRow: [3, 4, 5],
    thirdRow: [6, 7, 8],
    firstCol: [0, 3, 6],
    secondCol: [1, 4, 7],
    thirdCol: [2, 5, 8],
  }

  intScenery = toIntegerScenery(myMove)
  intAbstract = abstractScenery(intScenery)

  // Play strategy
  const playStrategy = {
    false: () => {
      const onRound = {
        1: () => {
          playIndex = 4

          if(intScenery[4] !== 0) {
            playIndex = playOnKey(getFreeKey(['firstDia', 'secondDia']))
          }
        },
        2: () => {
          playIndex = playOnKey(getFreeKey(['secondRow', 'secondCol']))
        },
      }

      onRound[currentRound().toString()]?.()
    },

    true: () => {
      playIndex = 0

      if(intScenery[0] !== 0) {
        playIndex = playOnKey(getFreeKey(['firstDia', 'secondDia']))
      }
    }
  }

  playStrategy[isFirstToPlay().toString()]()

  // Don't lose on iminence
  intScenery = toIntegerScenery(invertPointOfView(myMove))
  intAbstract = abstractScenery(intScenery)

  Object.keys(intAbstract).forEach(key => {
    if(intAbstract[key].reduce((a, b) => a + b, 0) === 2) {
      playIndex = abstractSceneryMap[key][intAbstract[key]?.indexOf(0)]
    }
  })

  // Win on imminence
  intScenery = toIntegerScenery(myMove)
  intAbstract = abstractScenery(intScenery)

  Object.keys(intAbstract).forEach(key => {
    if(intAbstract[key].reduce((a, b) => a + b, 0) === 2) {
      playIndex = abstractSceneryMap[key][intAbstract[key]?.indexOf(0)]
    } 
  })

  // Helper functions
  function toIntegerScenery(pointOfView) {
    const intScenery = []

    scenery.forEach(element => {
      if(element === pointOfView) {
        intScenery.push(1)
        return
      }

      if(element === invertPointOfView(pointOfView)) {
        intScenery.push(3)
        return
      }

      intScenery.push(0)
    })

    return intScenery
  }

  function abstractScenery(scenery) {
    const sceneryAbstraction = {
      firstDia: [scenery[0], scenery[4], scenery[8]],
      secondDia: [scenery[2], scenery[4], scenery[6]],
      firstRow: [scenery[0], scenery[1], scenery[2]],
      secondRow: [scenery[3], scenery[4], scenery[5]],
      thirdRow: [scenery[6], scenery[7], scenery[8]],
      firstCol: [scenery[0], scenery[3], scenery[6]],
      secondCol: [scenery[1], scenery[4], scenery[7]],
      thirdCol: [scenery[2], scenery[5], scenery[8]],
    }

    return sceneryAbstraction
  }

  function invertPointOfView(myMove) {
    let invertedMove = ''

    const invertedMoveMap = {
      X: function()  {
        invertedMove =  "O"
      },
      O: function() {
        invertedMove =  "X"
      }
    }

    invertedMoveMap[myMove]()

    return invertedMove
  }

  function isFirstToPlay() {
    const myMoveQtd = scenery.filter(el => el === myMove).length
    const opMoveQtd = scenery.filter(el => el === invertPointOfView(myMove)).length

    if(myMoveQtd >= opMoveQtd || opMoveQtd === 0) {
      return true
    }

    return false
  }

  function currentRound() {
    return scenery.reduce((acc, cur) => {
      if(cur === myMove) {
        return acc + 1
      }

      return acc
    }, 1)
  }

  function getFreeKey(keys) {
    let freeIndexes = []

    keys.forEach(key => {
      if(intAbstract[key].reduce((a, b) => a + b, 0) < 5) {
        freeIndexes.push(key)
      }
    })
    console.log(keys)
    console.log(freeIndexes[Math.floor(Math.random() * freeIndexes.length)])

    return freeIndexes[Math.floor(Math.random() * freeIndexes.length)]
  }

  function playOnKey(key) {
    if(!key) return 0

    let move = abstractSceneryMap[key][Math.floor(Math.random() * 3)]

    if(intScenery[move] !== 0) {
      return playOnKey(key)
    }

    return move
  }
  
  while(scenery[playIndex] !== '') {
    playIndex++
  }

  return playIndex
}

console.log(evailsonScript(sceneryTest, 'O'))

test(() => evailsonScript(sceneryTest, 'X'))