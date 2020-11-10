$(document).ready(function() {
    // word options
    const wordOptions = [
        "peaceful",
        "same",
        "ethereal",
        "happen",
        "remove",
        "match",
        "travel",
        "bit",
        "scatter",
        "next",
        "earthy",
        "theory",
        "hat",
        "thing",
        "load",
        "plausible",
        "sound",
        "noise",
        "crawl",
        "mundane",
        "tempt",
        "knit",
        "cowardly",
        "trains",
        "adhesive",
        "punch",
        "grate",
        "prevent",
        "awesome",
        "afterthought",
        "weight",
        "steady",
        "tame",
        "skirt",
        "crash",
        "female",
        "theory",
        "open",
        "awesome",
        "sofa",
        "cultured",
        "inform",
        "sharp",
        "furniture",
        "flow",
        "responsible",
        "unequaled",
        "snow",
        "football",
        "baseball",
        "soccer",
        "blue",
        "pineapple",
        "banana"
    ];
    
    let misses = 0;
    
    // helper functions
    
    // create button for each letter of alphabet
    const drawAlphabet = () => {
        for (let i = 0; i < 26; i++) {
            let letter = String.fromCharCode(97 + i);
            $('#letters').append(`<button class="btn btn-primary">${letter}</button>`);
        }
    }
    
    // create div element for each letter of secret word
    const drawSecretWord = (word) => {
        for (let i = 0; i < word.length; i++) {
            $('#container').append(`<div class="letter"></div>`);
            $('#container').find(`:nth-child(${i + 1})`).text(word[i]);
            $(".letter").css("color", "#dc3545");
        }
    };
    
    // check if letter is in secret word
    const checkLetter = (letter, word) => {
        let containsLetter = false;
        for (let i = 0; i < word.length; i++) {
            if (word.charAt(i) === letter) {
                console.log('ADDING CLASS ')
                $('#container').find(`:nth-child(${i + 1})`).css("color", "#EFEFEF").addClass("correct");
                containsLetter = true;
            }
        }
        return containsLetter;
    };
    
    // user lost
    const gameOver = () => {
        $("button").prop("disabled", "true");
        $("#message").text(`Better luck next time! The secret word was ${secretWord}`);
        $("#message").append(`<br><button enabled id="restart" class="btn btn-success">Play again</button>`);
    }
    
    
    // randomly select secret word
    let secretWord = wordOptions[Math.floor((Math.random() * wordOptions.length))];
    
    drawSecretWord(secretWord);
    
    // draw letter buttons
    drawAlphabet();
    
    // attach event listener to each letter button
    $("button").on("click", function() {
        $(this).attr("class", "btn btn-dark");
        $(this).prop("disabled", "true");

        // Check if clicked letter is in secret word
        let userGuess = $(this).text();
        let foundLetter = checkLetter(userGuess, secretWord);
        
        // did the user win?
        const correctLetters = [];
        $(".letter").each(function( index ) {
            if ( $(this).hasClass("correct") ) {
                correctLetters.push(index);
                if (correctLetters.length === secretWord.length) {
                    $("button").prop("disabled", "true");
                    $("#message").text("You won!");
                    $("#message").append(`<br><button enabled id="restart" class="btn btn-success">Play again</button>`);
                }
            }
        });

        // if the user guesses wrong, display next hangman image
        if (foundLetter === false) {
            misses++;
            $("#hangman").attr("src", `img/${misses}.png`);
        }

        // User has 7 chances to guess the word
        if (misses === 7) {
            gameOver();
        }

        // Refresh if user wants to play again
        $("#restart").on("click", function() {
            location.reload();
        });

    }); 

});
