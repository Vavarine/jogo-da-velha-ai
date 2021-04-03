import test from './index.test.js'

const sceneryTest = ['X', 'O', '', 
                      '', 'O', 'X', 
                      '', '', '']

const evailsonScript = (scenery, myMove) => {
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

  if(aboutToWin(scenery, myMove).isAboutToWin) {
    return aboutToWin(scenery, myMove).onIndex
  }

  if(aboutToLose(scenery, myMove).isAboutToLose) {
    return aboutToLose(scenery, myMove).onIndex
  }
  
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

  function aboutToWin(scenery, myMove) {
    const intScenery = toIntegerScenery(scenery, myMove)
    const intAbstract = abstractScenery(intScenery)
    let isAboutToWin = false
    let onKey = ''
    let onIndex;
    
    Object.keys(intAbstract).forEach(key => {
      if(intAbstract[key].reduce((a, b) => a + b, 0) === 2) {
        isAboutToWin = true
        onIndex = abstractSceneryMap[key][intAbstract[key]?.indexOf(0)]
      } 
    })

    return {isAboutToWin, onIndex}
  }

  function aboutToLose(scenery, myMove) {
    const intScenery = toIntegerScenery(scenery, invertPointOfView(myMove))
    const intAbstract = abstractScenery(intScenery)
    let isAboutToLose = false
    let onKey = ''
    let onIndex

    Object.keys(intAbstract).forEach(key => {
      if(intAbstract[key].reduce((a, b) => a + b, 0) === 2) {
        isAboutToLose = true
        onIndex = abstractSceneryMap[key][intAbstract[key]?.indexOf(0)]
      }
    })

    return {isAboutToLose, onIndex}
  }

  function invertPointOfView(myMove) {
    if(myMove === '') return ''

    if(myMove === "X") {
      return "O"
    } else {
      return "X"
    }
  }

  function getCurrRound(scenery) {
    return scenery.join('')
  }

  return 0
}

//evailsonScript(sceneryTest, 'X')

test(() => evailsonScript(sceneryTest, 'X'))