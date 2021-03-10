
const page = document;

var animalArray = ['eagle', 'cow', 'kangaroo']
var guessArray = [];
var animal;
var gameTimer;
var totalGameTime = 10;
var liveGame = true;

$(function() {
  var self = this;
  timer(totalGameTime)
  var randIndex = Math.random() * animalArray.length;
  animal = animalArray[Math.floor(randIndex)]
  setNumGuesses(animal.length + 2);
  var j;
  var underscores = '';
  for (j = 0; j < animal.length; j++) {
    underscores += '_ '
  }
  $(".guess-word").text(underscores) //changes text of elements of class "guess-word"

  $(self).keypress(function(key) {
    if (liveGame) {
      var letter = key.originalEvent.key.toLowerCase();
      var keycode = key.originalEvent.keyCode;
      if (((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123))
        && !(guessArray.includes(letter))) {
        guessArray.push(letter);
        var i;
        var numGuesses = parseInt($('.guess-num').text());
        decrementNumGuesses(numGuesses);
        var currentText = $('.guess-word').text();
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
    $('.timer-counter').text('1:00'); //have to get rid of this hard code
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
    resetTimer();
    liveGame = true;
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
  numGuesses -= 1;
  if (numGuesses >= 0) {
    $('.guess-num').text(numGuesses);
    if (numGuesses === 0) {
      loseGuesses();
    }
  }
}

function loseGuesses() {
  $('.toast').toast({delay: 5000});
  $('.toast-no-guesses').toast('show');
  $('.toast-lose').toast('show');
  //TODO
  //Change toast-lose to toast-no-guesses
  liveGame = false;
}

function loseTime() {
  $('.toast').toast({delay: 3500});
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