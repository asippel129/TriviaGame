$(document).ready(function() {
//creating a variable to track the question & slide numbers
var questionCounter = 0;

//timeout after the question has been presented (3 seconds)
var ansTimeout = 3000;

//score variables
var correct = 0;
var incorrect = 0;
var missed = 0;

//creating an array of the user's answers (that we will eventually push)
var userAns = [];

//creating an array of our questions, our answer options, and the corrects answers(indicated by the index that it appears in the array), in object form
var questions = [
    {
    question: "what is the type of car that Michael Scott drives?",
    choices: ["Chevy Corvette", "Chrysler Sebring", "Toyota Camry", "Honda Accord"],
    choicesAnswer: 1
    },
    {
        question: "In S1E1 'Pilot', who started their first day at Dunder Mifflin Scranton?",
        choices: ["Michael Scott", "Jim Halpert", "Erin Hannon", "Ryan Howard"],
        choicesAnswer: 3
    },
    {
        question: "In S1E3 'Health Care': Which of these is NOT one of Jim and Pam's made up diseases?",
        choices: ["Killer Nanorobots", "Hot Dog Fingers", "Spontaneous Dental Hydroplosion", "Hair Cancer"],
        choicesAnswer: 3
    },
    {
        question: "In the episode 'Office Olympics,' what does Pam name her 'Box of Paper Shoe Racing' game?",
        choices: ["Flonkerton", "Icelandic Snowshoe Racing", "Bixing", "Pegerhosen"],
        choicesAnswer: 0
    },
    {
        question: "Dwight Schrute is a man of many trades. What is the main product of his highly successful family farm?",
        choices: ["Pumpkins", "Livestock", "Beets", "Corn"],
        choicesAnswer: 2
    },
    {
        question: "Who is Michael Scott's BFF?",
        choices: ["Jim Halpert", "Todd Packer", "Toby Flenderson", "Stanley Hudson"],
        choicesAnswer: 1
    },
    {
        question: "What is the name of the security guard at the Scranton branch?",
        choices: ["Louie", "Derek", "Dave", "Hank"],
        choicesAnswer: 3
    },
    {
        question: "What a capella group did Andy Bernard sing in at Cornell?",
        choices: ["Pitch Slapped", "Here Comes Treble", "Chord on Blues", "Shirley Tempos"],
        choicesAnswer: 1
    },
    {
        question: "Which Office member won an event at the World Series of Poker?",
        choices: ["Kevin Malone", "Oscar Martinez", "Kelly Kapoor", "Creed Bratton"],
        choicesAnswer: 0
    }];

//function to submit answers
function submitAns() {
    $("#submit").on("click", function(e) {
        e.preventDefault();
        //we do this to stop the default action of an element from happening (submit will reload the page if we dont do this)
        userAns.length = 0;
        //record user answer to a question
        var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
        userAns.push(userSelection);
        console.log(userAns);
        nextQ();
        //this function will be defined later on
    });

};

//creating question timer variables and functions
var timeLeft = 10;
var increment;

function runTimer() {
    increment = setInterval(decrement, 1000);
};

function decrement() {
    //we will be subtracting by one every second
    timeLeft--;
    $("#time-left").html("Time Remaining: " + timeLeft + " seconds");

    if (timeLeft === 0){
        stopTimer();
        userAns.length = 0;
        //record user answer to the question
        var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
        userAns.push(userSelection);
        console.log(userAns);
        nextQ();
    };
};

//we will reset the timer at each question
function resetTimer() {
    timeLeft = 10;
    $("#time-left").html("Time Remaining: " + timeLeft + " seconds");
};

function displayTimer() {
    $("#time-left").html("Answer Review");
};
function stopTimer() {
    clearInterval(increment);
};

//function to display the given response options (using radio buttons)
function createRadios() {
    var responseOptions = $("#responses");
    //empty array for user answer
    responseOptions.empty();
//function for each member in our array, append a radio button to it
    for (var i = 0; i < questions[questionCounter].choices.length; i++) {
        responseOptions.append('<label><input type="radio" name="optionsRadios" id="optionsRadios2" value="' + [i] +'"><div class="twd-opt">' + questions[questionCounter].choices[i] + '</div></input><br></label>');
    };
};

//function to display the given question
function displayQ() {
    clearQ();
    resetTimer();
    $(".questionX").html(questions[questionCounter].question);
    //calling the function to display the response options
    createRadios();
    //creating the submit button
	$("#submit-div").append('<button type="submit" class="btn btn-default" id="submit">' + "Submit" + '</button>');
    runTimer();
    submitAns();
    
};

//display start page
function displayStart() {
    $("#content").append('<a href="#" class="btn btn-primary btn-lg" id="start-button">' + "Start" + '</a>');
    //start game
    $("#start-button").on("click", function(event) {
        event.preventDefault();
        //display the first question
        firstQ();
        resetTimer();
    });
};

//reset for end of game
function reset() {
    questionCounter = 0;
    correct = 0;
    incorrect = 0;
    missed = 0;
    userAns = [];
    resetTimer();
};

//display end page
function displayEnd() {
    clearQ();
    $("#content").append('<h3>' + "Correct answers: " + correct + '</h3><br><h3>' + "Incorrect answers: " + incorrect + '</h3><br><h3>' + "Skipped questions: " + missed + '</h3><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' + "Restart Game" + '</a>');
    //restart the game
    $("#restart-button").on("click", function(event) {
        event.preventDefault();
        //displays the first question
        reset();
        clearQ();
        displayStart();
    });
};

//function to clear the question
function clearQ() {
    var questionDiv = $(".questionX");
    questionDiv.empty()

    var responseDiv = $("#responses");
    responseDiv.empty();

    var submitDiv = $("#submit-div");
    submitDiv.empty();

    var contentDiv = $("#content");
    contentDiv.empty();

    stopTimer();
};

//showing whether the answer is right/wrong
function checkQ() {
	clearQ();
	var correctAnswer = questions[questionCounter].choicesAnswer;
	if (userAns[0] == questions[questionCounter].choicesAnswer) {
		$("#content").append('<h3>'+"Congratulations! You chose the right answer!" + '</h3>');
		correct++;
		displayTimer();
	}
	else if (userAns[0] === undefined) {
		$("#content").append('<h3>'+"Time's up!" + '</h3><br><br><h3>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
		missed++;
		displayTimer();
	}
	else {
		$("#content").append('<h3>'+"You chose the wrong answer." + '</h3><br><br><h3>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
		incorrect++;
		displayTimer();
	};
};

//function to change the question
function nextQ() {
	checkQ();
	//Incrementing the count by 1
	questionCounter++;
	//If the count is the same as the length of the question array, the counts reset to 0
	if (questionCounter === questions.length) {
		setTimeout(displayEnd, ansTimeout);
	} 
	else {
		setTimeout(displayQ, ansTimeout);
	};
};

//Function to call the first question
function firstQ() {
	var startContent = $("#content");
	startContent.empty(); 
	displayQ();
};

//Displays the start page
displayStart();

});
