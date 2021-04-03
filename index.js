import test from './index.test.js'

const sceneryTest = ['X', 'O', '', 
                      '', 'X', 'X', 
                      '', '', 'O']

const evailsonScript = (scenery, myMove) => {
  let playIndex = 0
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

  // Win on imminence
  let intScenery = toIntegerScenery(scenery, myMove)
  let intAbstract = abstractScenery(intScenery)

  Object.keys(intAbstract).forEach(key => {
    if(intAbstract[key].reduce((a, b) => a + b, 0) === 2) {
      playIndex = abstractSceneryMap[key][intAbstract[key]?.indexOf(0)]
    } 
  })

  // Don't lose on iminence
  intScenery = toIntegerScenery(scenery, invertPointOfView(myMove))
  intAbstract = abstractScenery(intScenery)

  Object.keys(intAbstract).forEach(key => {
    if(intAbstract[key].reduce((a, b) => a + b, 0) === 2) {
      playIndex = abstractSceneryMap[key][intAbstract[key]?.indexOf(0)]
    }
  })

  function toIntegerScenery(scenery, pointOfView) {
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
    if(myMove === '') return ''

    if(myMove === "X") {
      return "O"
    } else {
      return "X"
    }
  }

  return playIndex
}

console.log(evailsonScript(sceneryTest, 'O'))

test(() => evailsonScript(sceneryTest, 'X'))