const test = (script) => {
  try{
    const scriptReturn = script()

    if (typeof scriptReturn !== 'number') return console.error('ERROR: The return is not a number')
    if (scriptReturn > 8) return console.error('ERROR: Number is too big')
    if (scriptReturn < 0) return console.error('ERROR: Number is too small')
    if (scriptReturn % 1 !== 0) return console.error('ERROR: The number is not an integer')

  } catch {
    console.error('The script broke')
  }
}

export default test