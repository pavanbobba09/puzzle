 var start = new Date();
 var startTime; // Variable to store the start time
var timerInterval; // Variable to store the interval function for the timer
        var moves = 0;
        var ids = [
    "one",      "two",      "three",   "four",
    "five",     "six",      "seven",   "eight",
    "nine",     "ten",      "eleven",  "twelve",
    "thirteen", "fourteen", "fifteen", ""
];
var winSound = new Audio('gameover.mp3'); // Replace 'win_sound.mp3' with your winning sound file
var marioSound = new Audio('shuffle_sound.mp3'); // Replace 'mario_sound.mp3' with your Mario sound file

// Since we're going to shuffle the divs, copy the ids into the shuffled array
var shuffled = ids.slice();
        var shuffled = [
            //... Your shuffled array values here
        ];
        // var ids = [
        //     //... Your ids array values here
        // ];
        //... Rest of your existing variables and functions
        var ids_numeric = {
    "one":1,       "two":2,       "three":3,    "four":4,
    "five":5,      "six":6,       "seven":7,    "eight":8,
    "nine":9,      "ten":10,      "eleven":11,  "twelve":12,
    "thirteen":13, "fourteen":14, "fifteen":15, "sixteen":16
};

// Once the person changes the background, the current background is stored here
var selected_background;

// Maps the available movement. Looking at the ids array above, you can see that at array 0, value one,
// if the empty block was currently there, it can't move to the top or left, but it can move to the right and the bottom.
// top right bottom left
//[ 0,   1,    1,    0  ]
var movement = [
    [0, 1, 1, 0], //0: one
    [0, 1, 1, 1], //1: two
    [0, 1, 1, 1], //2: three
    [0, 0, 1, 1], //3: four
    [1, 1, 1, 0], //4: five
    [1, 1, 1, 1], //5: six
    [1, 1, 1, 1], //6: seven
    [1, 0, 1, 1], //7: eight
    [1, 1, 1, 0], //8: nine
    [1, 1, 1, 1], //9: ten
    [1, 1, 1, 1], //10: eleven
    [1, 0, 1, 1], //11: twelve
    [1, 1, 0, 0], //12: thirteen
    [1, 1, 0, 1], //13: fourteen
    [1, 1, 0, 1], //14: fifteen
    [1, 0, 0, 1]  //15: sixteen
];
// The available backgrounds
var background = ["super-mario", "luigi", "bowser", "toad"];

        function countMoves() {
            moves++;
            document.getElementById('movesDisplay').innerText = moves;
        }

        function swapPieces(clickable_id, empty_id) {
            animateMovement(clickable_id, empty_id);

            setTimeout(function() {
                var temp = shuffled[empty_id];
                shuffled[empty_id] = shuffled[clickable_id];
                shuffled[clickable_id] = temp;

                countMoves(); // Increment moves count
                displayBoard();
                checkIfWon();
            }, 600);
        }
        function startTimer() {
    startTime = new Date(); // Record the start time
    timerInterval = setInterval(updateTimer, 1000); // Update the timer every second
}
// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval); // Stop the timer
    var endTime = new Date(); // Record the end time
    var elapsedSeconds = (endTime - startTime) / 1000; // Calculate elapsed time in seconds

    // Display the number of moves and time taken to solve the puzzle
    document.getElementById('win').innerHTML = '<p>Total time taken: ' + elapsedSeconds + ' seconds</p>' +
        '<p>Total number of moves: ' + moves + '</p>';
}

// Function to update the timer display
function updateTimer() {
    var currentTime = new Date();
    var elapsedTime = (currentTime - startTime) / 1000; // Calculate elapsed time in seconds
    document.getElementById('timerInterval').innerText = elapsedTime.toFixed(0) + ' seconds';
}
        function initializeGame() {
            marioSound.play();
            function changePuzzleSize() {
                var newSize = parseInt(document.getElementById('puzzleSize').value);
                generateNewPuzzle(newSize);
                startTimer();

            }
             // Start the timer when the game initializes
            //... Your existing initialization code
    var background_id = Math.floor((Math.random() * 4));
    selected_background = background[background_id];

    document.getElementById(background[background_id]).selected = true; // Grab the selected option and mark it as selected

    for (var i = 0; i < ids.length - 1; i++) {
        document.getElementById(ids[i]).className = "tile " + background[background_id];
    }
     }
     function changeBackground() {
    var class_name = document.getElementById("characters").value;

    if (background.indexOf(class_name) < 0) {
        return;
    }

    selected_background = class_name;

    document.getElementById("main").innerHTML = "";

    for (var i = 0; i < ids.length; i++) {
        if (ids[i] == "") {
            document.getElementById("main").innerHTML += '<div id="sixteen" class="tile"></div>';
        } else {
            var id_name = ids[i];
            document.getElementById("main").innerHTML += '<div id="' + ids[i] + '" class="tile' + " " + selected_background + '">' + ids_numeric[id_name] + '</div>';
        }
    }
}
function shuffleBoard() {
    startTimer();
    var audio = new Audio('shuffle_sound.mp3'); // Replace 'shuffle_sound.mp3' with your audio file
    audio.play();

    shuffled = ids.slice(); // Reinitialize the shuffled array
    var sixteen = 15;

    // Set a loop to go through 500 times
    for (var i = 0; i < 500; i++) {

        var movement_id = Math.floor((Math.random() * 4));

        while(movement[sixteen][movement_id] != 1) {
            movement_id = Math.floor((Math.random() * 4));
        }

        // The index id where the blank space will go to
        var move_to;

        switch(movement_id) {
            case 0:
                move_to = sixteen - 4;
                break;
                // subtract 4 to go to the top
            case 1:
                move_to = sixteen + 1;
                break;
                // add 1 to go to the right
            case 2:
                move_to = sixteen + 4;
                break;
                // subtract 4 to go to the bottom
            case 3:
                move_to = sixteen - 1;
                break;
                // subtract 1 to go to the left
        }

        // swap sixteen and move_to
        var temp = shuffled[sixteen];
        shuffled[sixteen] = shuffled[move_to];
        shuffled[move_to] = temp;

        sixteen = move_to;
    }

    displayBoard();
}
function displayBoard() {
    document.getElementById("main").innerHTML = "";

    for (var i = 0; i < shuffled.length; i++) {
        if (shuffled[i] == "") {
            document.getElementById("main").innerHTML += '<div id="sixteen" class="tile"></div>';
        } else {
            var id_name = shuffled[i];
            document.getElementById("main").innerHTML += '<div id="' + shuffled[i] + '" class="tile' + " " + selected_background + '">' + ids_numeric[id_name] + '</div>';
        }
    }

    var clickable_id;

    if (movement[shuffled.indexOf("")][0] == 1) {
        clickable_id = shuffled.indexOf("") - 4;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][1] == 1) {
        clickable_id = shuffled.indexOf("") + 1;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][2] == 1) {
        clickable_id = shuffled.indexOf("") + 4;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][3] == 1) {
        clickable_id = shuffled.indexOf("") -1;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }
}
function animateMovement(clickable_id, empty_id) {
    if (clickable_id - 4 == empty_id) {
        console.log(shuffled[clickable_id]);
        document.getElementById(shuffled[clickable_id]).className += " animate-up";
    } else if (clickable_id + 1 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " animate-right";
    } else if (clickable_id + 4 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " animate-down";
    } else if (clickable_id - 1 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " animate-left";
    }
}   

function checkIfWon() {
    var isSolved = true;
    for (var i = 0; i < ids.length; i++) {
        if (ids[i] !== shuffled[i]) {
            isSolved = false;
            break;
        }
    }
    if (isSolved) {
        stopTimer();
        winSound.pause(); // Stop the previous sound
        marioSound.currentTime = 0; // Reset the Mario sound to the beginning
        marioSound.play(); // Play the Mario sound
        //  clearInterval(timerInterval);
        // var end = new Date();
        // var elapsed_ms = end - start;
        // var seconds = Math.round(elapsed_ms / 1000);
        var html = "";
        html += "<img src='win.gif' alt='You win' />";
        // html += "<p>Total time it took you to solve this puzzle (in seconds): " + seconds + "</p>";
        // html += "<p>Total number of moves it took you to solve this puzzle: " + moves + "</p>";

        document.getElementById("win").innerHTML = html;
        document.body.style.backgroundImage = "url('bg.png')"; // Replace 'bg.png' with your image URL
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.getElementById("main").style.animation = "spin 2s linear infinite"; // Add your animation or class for animation here
    }
}
function cheat() {
        checkIfWon();
            shuffled = ids.slice(); // Reset the puzzle to the original order
            displayBoard(); // Display the solved puzzle
            document.getElementById('win').innerText = 'Cheater!';
        }