
const page = document;

var animalArray = ['eagle', 'cow', 'kangaroo']
var guessArray = [];
var animal;
var lettersRemaining;

$(function() {
    var randIndex = Math.random() * animalArray.length;
  animal = animalArray[Math.floor(randIndex)]
  setNumGuesses(animal.length + 2);
  lettersRemaining = animal.length;
  var j;
  var underscores = '';
  for (j = 0; j < animal.length; j++) {
    underscores += '_ '
  }
  $(".guess-word").text(underscores) //changes text of elements of class "guess-word"

  $(this).keypress(function(key) {
    var letter = key.originalEvent.key.toLowerCase();
    var keycode = key.originalEvent.keyCode;
    if (((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123))
      && !(guessArray.includes(letter))) {
      guessArray.push(letter);
      var i;
      var numGuesses = parseInt($('.guess-num').text());
      var currentText = $('.guess-word').text();
      if (numGuesses > 0) {
        changeGuessedText(letter.toLowerCase());
        for (i = 0; i < animal.length; i++) {
          if (animal[i] === letter) {
            currentText = setCharAt(currentText, i*2, letter);
            $('.guess-word').text(currentText);
            lettersRemaining -= 1;
          }
        }
      }
      if (lettersRemaining == 0) {
        incrementWins()
      }
      else {
        decrementNumGuesses(numGuesses);
      }
    }
  });

  //Reset Button
  //Resets letters guessed, current word, # of guesses, wins,
  //losses, and timer
  //Does NOT change to different word
  
  $("#reset").click(function(){
      //Need to see yawnys code to change 'letters already guessed'
      $('#updateModal').modal('show');  //shows modal to confirm rest
  }); 
  $('.confirm-reset').click(function() { //if you confirm to rest the game
    // alert("Reset Done!"); //Can remove this after testing
    $('.win-counter').text(0);
    $('.loss-counter').text(0);
    $('.timer-counter').text('4:00');
    guessArray = []
    $('.been-guessed').text(' ');
    var randIndex = Math.random() * animalArray.length;
    animal = animalArray[Math.floor(randIndex)]
    setNumGuesses(animal.length + 2);
    underscores = '';
    var i;
    //Make this a function (down below)
    for (i = 0; i < animal.length; i++) {
      underscores += '_ '
    }
    $('.guess-word').text(underscores);
    lettersRemaining = animal.length;
  });
});

function setCharAt(str,index,chr) {
  if(index > str.length-1) return str;
  return str.substring(0,index) + chr + str.substring(index+1);
}

function changeGuessedText(letter) {
  var guessedText = $('.been-guessed').text();
  $('.been-guessed').text(guessedText + ' ' + letter);
}

function decrementNumGuesses(numGuesses) {
  numGuesses = numGuesses - 1;
  if (numGuesses >= lettersRemaining) {
      $('.guess-num').text(numGuesses);
  }
  else if (numGuesses < lettersRemaining) {
    incrementLoses()
    loseMessage();
  }
  
}

function loseMessage() {
  $('.toast').toast({delay: 5000});
  $('.toast-lose').toast('show')
}

function setNumGuesses(num) {
  $('.guess-num').text(num);
}

function incrementWins() {
  var WinCounter = parseInt($('.win-counter').text());
  WinCounter = 1 + WinCounter;
  $('.win-counter').text(WinCounter)
}

function incrementLoses() {
  var LoseCounter = parseInt($('.loss-counter').text());
  LoseCounter = 1 + LoseCounter;
  $('.loss-counter').text(LoseCounter)
}