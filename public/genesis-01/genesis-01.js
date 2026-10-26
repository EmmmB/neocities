import geneResponse from './modules/geneResponses.mjs'


// vars
  var buttonsPressed = 0 // How many buttons have been pressed during a question
  var buttonPhrase = '' // The phrase that appears on screen from the buttons you press
  var hasResponse = false // [DEPRECATED] If a response is on screen or not
  var isThinking = false // If a response is loading
  var screenResponse = '' // The unique response that displays after a question
  // var test = true // test var to test things, you know how it is
  
  // audio
    const sndYOU = new Audio('./sounds/buttons/YOU.ogg') // YOU
    const sndTHEY = new Audio('./sounds/buttons/THEY.ogg') // THEY
    const sndME = new Audio('./sounds/buttons/ME.ogg') // ME
    const sndTO = new Audio('./sounds/buttons/TO.ogg') // TO
    const sndLET = new Audio('./sounds/buttons/LET.ogg') // LET
    const sndGO = new Audio('./sounds/buttons/GO.ogg') // GO
    const sndTALK = new Audio('./sounds/buttons/TALK.ogg') // TALK
    const sndHELP = new Audio('./sounds/buttons/HELP.ogg') // HELP
    const sndWORK = new Audio('./sounds/buttons/WORK.ogg') // WORK
//    const sndLoad = new Audio('./sounds/Load.ogg') // load sounds that doesn't work or is too quiet


  // img
    const gifLoad = new Image(400) 
      gifLoad.src = './img/LOAD.gif' // The animation for the load bar, currently broken thanks to caching and not being able to restart a gif
  
  // responses
   /* const response = [ 
      'I can help with that',
      'Another Response I don\'t want to look up other responses right now',
      'and a third one for good measure'
    ]
      */

// funcs

// Early example of how it'll fetch unique responses. WIP
  function getResponse() {
    screenResponse = geneResponse[buttonPhrase] 
    buttonPhrase = ''
    document.getElementById('screen').innerHTML = screenResponse
  }

// Once Triggered, removes the load bar, tells the system that it has a response, fetches the response, sets the amount of buttons pressed to zero, and tells the system that it's not "thinking" anymore.
  function loadResponse() {
    document.body.removeChild(gifLoad)
    hasResponse = true
    document.getElementById('screen').innerHTML = buttonPhrase
    getResponse()
    buttonsPressed = 0
    isThinking = false
  }

// Checks to see if enough buttons have been pressed, and if so, tells the system that it's "thinking", displays the load bar (broken) and triggers the loadResponse func with a delay
  function responseCheck() {
    
    if (buttonsPressed > 2) {
      isThinking = true
      document.body.appendChild(gifLoad)
      setTimeout(loadResponse, 2000)
      
    }
  }

// This is the function for pressing a button. If you press a button, this happens, unless it's the reset button. That one is different =)
  function buttonPress(button, snd) {

  // Checks if there's room for another word, and if the word you just pressed isn't already on screen. If both are true then it adds the word the the screen, adds to the amount of buttons pressed for this question, and adds a space if it needs to. 
    if (buttonsPressed <= 2 && !buttonPhrase.includes(button)) {

      buttonsPressed += 1

      if (buttonPhrase != '') {
        buttonPhrase += ' '
      }
      buttonPhrase += button
      document.getElementById('screen').innerHTML = buttonPhrase
      responseCheck()
    }

// This little bit is so you can spam the sound even if it doesn't accept another input. It forces the sound to cut itself off.
    snd.pause()
    snd.currentTime = 0
    snd.play()
    
  }

  // Each button sends what string is should display, and what sound file it should play over to buttonPress
  function sayYOU() {
    buttonPress('YOU', sndYOU)
    
  }

  function sayTHEY() {
    buttonPress('THEY', sndTHEY)

  }

  function sayME() {
    buttonPress('ME', sndME)

  }

  function sayTO() {
    buttonPress('TO', sndTO)

  }

  function sayLET() {
    buttonPress('LET', sndLET)
  }

  function sayGO() {
    buttonPress('GO', sndGO)

  }

  function sayTALK() {
    buttonPress('TALK', sndTALK)

  }

  function sayHELP() {
    buttonPress('HELP', sndHELP)

  }

  function sayWORK() {
    buttonPress('WORK', sndWORK)

  }
//  resest button. Checks if it's "thinking" so it doesn't reset when it shouldn't
  function reset() {
    if(isThinking == false) {
      buttonsPressed = 0
      buttonPhrase = ''
      document.getElementById('screen').innerHTML = buttonPhrase
    }
  }


