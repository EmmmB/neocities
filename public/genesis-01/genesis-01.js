 import { geneResponse } from './modules/geneResponses.mjs'


// vars
  var buttonsPressed = 0 // How many buttons have been pressed during a question
  var buttonPhrase = [] // Logging each button phrase as separate sting
  var hasResponse = false // [DEPRECATED] If a response is on screen or not
  var isThinking = false // If a response is loading
  var screenResponse = '' // The unique response that displays after a question
  const response = document.querySelector('.response')
  var fullPhrase = ''
  // var test = true // test var to test things, you know how it is
  
  // audio
    const oggYOU = new Audio('./sounds/buttons/YOU.ogg') // YOU
    const oggTHEY = new Audio('./sounds/buttons/THEY.ogg') // THEY
    const oggME = new Audio('./sounds/buttons/ME.ogg') // ME
    const oggTO = new Audio('./sounds/buttons/TO.ogg') // TO
    const oggLET = new Audio('./sounds/buttons/LET.ogg') // LET
    const oggGO = new Audio('./sounds/buttons/GO.ogg') // GO
    const oggTALK = new Audio('./sounds/buttons/TALK.ogg') // TALK
    const oggHELP = new Audio('./sounds/buttons/HELP.ogg') // HELP
    const oggWORK = new Audio('./sounds/buttons/WORK.ogg') // WORK
    const oggRespond = new Audio('./sounds/Response.ogg') // Response Bloop
    const oggPressOn = new Audio('./sounds/PressOn.ogg') // Button Click
    const oggPressOff = new Audio('./sounds/pressOff.ogg') // Button UnClick
    const oggLoad = new Audio('./sounds/Load.ogg') // load sounds 

    oggPressOn.volume = 0.15
    oggPressOff.volume = 0.15
    oggLoad.volume = 1

// funcs
  window.onmousedown = () => {
    document.documentElement.style.cursor = "url('./hand/cursor_closed.ico'), default"
  }
  
  window.onmouseup = () => {
    document.documentElement.style.cursor = "url('./hand/cursor.ico'), default"
  } 

  document.querySelector(".buttons").onmousedown = () => {
    oggPressOn.pause()
    oggPressOn.currentTime = 0
    oggPressOn.play()

  }

  document.querySelector(".buttons").onmouseup = () => {
    oggPressOff.pause()
    oggPressOff.currentTime = 0
    oggPressOff.play()
  }

  function resetPhrase() {
    buttonPhrase = []
    for (let i = 1; i <= 3; i++) {
      document.getElementById(i).innerHTML = ''
    }
  }

  function fetchPhrase() {
    fullPhrase = buttonPhrase.join(" ")
    console.log(fullPhrase)
  }

  

  
  function getResponse() {
    if (geneResponse[fullPhrase] != undefined) {
      screenResponse = geneResponse[fullPhrase]
      oggRespond.play()
    } else {
      screenResponse = ''
    }
    buttonPhrase = []
    response.innerHTML = screenResponse
  }

// Once Triggered, removes the load bar, tells the system that it has a response, fetches the response, sets the amount of buttons pressed to zero, and tells the system that it's not "thinking" anymore.
  function loadResponse() {
    oggLoad.pause()
    oggLoad.currentTime = 0
    resetPhrase()
    document.getElementById("loadBar").style.display = "none"
    document.querySelector('.phrases').style.display = "flex"
    hasResponse = true
    getResponse()
    buttonsPressed = 0
    isThinking = false
  }

// Checks to see if enough buttons have been pressed, and if so, tells the system that it's "thinking", displays the load bar (broken) and triggers the loadResponse func with a delay
  function responseCheck() {
    
    if (buttonsPressed > 2) {
      isThinking = true
      setTimeout(() => {document.getElementById("loadBar").style.display = "flex"}, 1800)
      setTimeout(() => {document.querySelector('.phrases').style.display = "none"}, 1800)
      setTimeout(() => {oggLoad.play()}, 1800)
      setTimeout(loadResponse, 3100)
      
    }
  }

  console.log()

// This is the function for pressing a button. If you press a button, this happens, unless it's the reset button. That one is different =)
  function buttonPress(button, ogg) {

    if (buttonsPressed <= 2 && !buttonPhrase.includes(button)) {
        buttonPhrase[buttonsPressed] = button
        buttonsPressed += 1
        document.getElementById(buttonsPressed).innerHTML = button
        responseCheck()
        fetchPhrase()
        screenResponse = ''
        response.innerHTML = ''
    }
    ogg.pause()
    ogg.currentTime = 0
    ogg.play()
  }

  // Each button sends what string is should display, and what sound file it should play over to buttonPress
  const buttonYOU = document.querySelector('#sayYOU')
  const buttonTHEY = document.querySelector('#sayTHEY')
  const buttonME = document.querySelector('#sayME')
  const buttonTO = document.querySelector('#sayTO')
  const buttonLET = document.querySelector('#sayLET')
  const buttonGO = document.querySelector('#sayGO')
  const buttonTALK = document.querySelector('#sayTALK')
  const buttonHELP = document.querySelector('#sayHELP')
  const buttonWORK = document.querySelector('#sayWORK')

  buttonYOU.onmousedown = () => buttonPress('YOU', oggYOU)
  buttonTHEY.onmousedown = () => buttonPress('THEY', oggTHEY)
  buttonME.onmousedown = () => buttonPress('ME', oggME)
  buttonTO.onmousedown = () => buttonPress('TO', oggTO)
  buttonLET.onmousedown = () => buttonPress('LET', oggLET)
  buttonGO.onmousedown = () => buttonPress('GO', oggGO)
  buttonTALK.onmousedown = () => buttonPress('TALK', oggTALK)
  buttonHELP.onmousedown = () => buttonPress('HELP', oggHELP)
  buttonWORK.onmousedown = () => buttonPress('WORK', oggWORK)



//  resest button. Checks if it's "thinking" so it doesn't reset when it shouldn't
  const buttonReset = document.querySelector('#reset')

  buttonReset.onmousedown = () => {
      if(isThinking == false) {
        buttonsPressed = 0
        response.innerHTML = ''
        resetPhrase()
        fetchPhrase()
    }
  }


