
const page = document;

var animalArray = ['eagle', 'cow', 'kangaroo']
var guessArray = []; // keeps track of letters guessed 
var animal; // the animal currently being guessed
var gameTimer; // amount of time left in game
var totalGameTime = 60; 
var liveGame = true;

$(function() {
  timer(totalGameTime)
  newAnimal();
  setNumGuesses(animal.length + 2);
  setUnderscores();

  $(this).keypress(function(key) {
    if (liveGame) {
      var letter = key.originalEvent.key.toLowerCase();
      var keycode = key.originalEvent.keyCode;
      if (((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123)) // if legal key
        && !(guessArray.includes(letter))) { // and letter hasn't been guessed before
        guessArray.push(letter);
        var i;
        var numGuesses = parseInt($('.guess-num').text()); // read how many guesses left from html
        decrementNumGuesses(numGuesses);
        var currentText = $('.guess-word').text(); // read currently guessed letters
        if (numGuesses > 0) {
          changeGuessedText(letter.toLowerCase());
          for (i = 0; i < animal.length; i++) {
            if (animal[i] === letter) {
              currentText = setCharAt(currentText, i*2, letter);
              $('.guess-word').text(currentText);
            }
          }
        }
      }
    }
  });

  $("#reset").click(function() {
    resetWord();
    var losses = parseInt($('.loss-counter').text());
    $('.loss-counter').text(losses + 1)
  })
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
  numGuesses -= 1;
  if (numGuesses >= 0) {
    $('.guess-num').text(numGuesses);
    if (numGuesses === 0) {
      loseGuesses();
    }
  }
}

function loseGuesses() {
  $('.toast').toast({delay: 2000});
  $('.toast-no-guesses').toast('show');
  $('.toast-lose').toast('show');
  //TODO
  //Change toast-lose to toast-no-guesses
  liveGame = false;
}

function loseTime() {
  $('.toast').toast({delay: 2000});
  $('.toast-no-time').toast('show');
  liveGame = false;
}

function setNumGuesses(num) {
  $('.guess-num').text(num);
}

function timer(time) {
  var time = time - 1;
  var min = time >= 59 ? (time + 1) / 60 : 0;
  gameTimer = setInterval(function() {
    if (liveGame) {
      var sec = time % 60;
      if (sec === 59) {
        min--
      }
      if (sec.toString().length == 1) {
        sec = '0' + sec;
      }
  
      $('.timer-counter').text(min + ':' + sec);
      time--;
      if (time < 0) {
        $('.timer-counter').text('0:00');
        loseTime();
        clearInterval(gameTimer)
      }
    }
  }, 1000)
}

function resetTimer() {
  clearInterval(gameTimer)
  timer(totalGameTime)
}

function newAnimal() {
  var randIndex = Math.random() * animalArray.length;
  animal = animalArray[Math.floor(randIndex)]
}

function setUnderscores() {
  var j;
  var underscores = '';
  for (j = 0; j < animal.length; j++) {
    underscores += '_ '
  }
  $(".guess-word").text(underscores) //changes text of elements of class "guess-word"
}

function resetWord() {
  newAnimal();
  setUnderscores();
  setNumGuesses(animal.length + 2);
  $('.been-guessed').text(' ');
  guessArray = [];
  $('.toast').toast('hide');
}