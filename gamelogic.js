
const page = document;

var animalArray = ['eagle', 'cow', 'kangaroo']
var guessArray = [];

$(function() {
  var randIndex = Math.random() * animalArray.length;
  var animal = animalArray[Math.floor(randIndex)]
  setNumGuesses(animal.length + 2);
  var j;
  var underscores = '';
  for (j = 0; j < animal.length; j++) {
    underscores += '_ '
  }
  $(".guess-word").text(underscores)

  $(this).keypress(function(key) {
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
      loseMessage();
    }
  }
}

function loseMessage() {
  alert('reepa reepa');
  alert('LAOSKI')
}

function setNumGuesses(num) {
  $('.guess-num').text(num);
}