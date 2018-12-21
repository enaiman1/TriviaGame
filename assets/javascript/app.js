// Creating Variables

var time = 20;
var intervalId = "";
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var arrayFinder = 0;


// create question.
//each question is an object that includes an array

var question01 = {
    question: "Which country is known as the Pearl of Africa?",
    answers: ["Ethopia", "Morocco", "Uganda", "Tanazania"],
    value: ["incorrect", "incorrect", "correct", "incorrect"],
    correct: "Uganda",
    image: "./assets/images/uganda.jpg"
};

var question02 = {
    question: "A couple celebrating their crystal wedding anniversary have been married for how many years?",
    answers: ["Ten (10)", "Fifteen(15)", "Twenty(20)", "Fifty(50)"],
    value: ["incorrect", "correct", "incorrect", "incorrect"],
    correct: "Fifteen(15)",
    image: "./assets/images/crystal.jpg"
};

var question03 = {
    question: "In which 1979 film was the spaceship called Nostromo?",
    answers: ["Alien", "Star Wars", "Black Hole", "Preditor"],
    value: ["correct", "incorrect", "incorrect", "incorrect"],
    correct: "Alien",
    image: "./assets/images/alien.png"
};

var question04 = {
    question: "Who was once known as the King of Soul, and now known as the Godfather of Soul?",
    answers: ["BB King", "Micheal Jackson", "Artist formally known as Prince", "James Brown"],
    value: ["incorrect", "incorrect", "incorrect", "correct"],
    correct: "James Brown",
    image: "./assets/images/james-brown.jpg"
};


var question05 = {
    question: "How many men have walked on the moon?",
    answers: ["Four(4)", "Two(2)", "Twelve(12)", "Eight(8)"],
    value: ["incorrect", "incorrect", "correct", "incorrect"],
    correct: "Twelve(12)",
    image: "./assets/images/moon.jpg"
};

var question06 = {
    question: "In which country would one find 8 of the world’s 10 highest mountains?",
    answers: ["United States", "China", "Switzerland", "Napal"],
    value: ["incorrect", "incorrect", "incorrect", "correct"],
    correct: "Napal",
    image: "./assets/images/nepal.jpg"
};

var question07 = {
    question: "Which US restaurants chain is named after the first mate in Moby Dick?",
    answers: ["McDonalds", "Starbucks", "Zaxby", "Krispy Kreme"],
    value: ["incorrect", "correct", "incorrect", "incorrect"],
    correct: "Starbucks",
    image: "./assets/images/starbucks.jpeg"
};

var question08 = {
    question: "which mens tennis player has won the highest number of grand slams?",
    answers: ["Rafael Nadal", "Pete Sampras", "Roger Federer", "Novak Djokovic"],
    value: ["incorrect", "incorrect", "correct", "incorrect"],
    correct: "Roger Federer",
    image: "./assets/images/roger.jpeg"
};


var question09 = {
    question: "How many dots are on two dice??",
    answers: ["Fourty two (42)", "Fourty eight(48)", "thirty eight (38)", "fifty(50)"],
    value: ["correct", "incorrect", "incorrect", "incorrect"],
    correct: "Fourty two (42)",
    image: "./assets/images/dice.jpeg"
};

var question10 = {
    question: "What color is a Himalayan poppy?",
    answers: ["yellow", "red", "pink", "blue"],
    value: ["incorrect", "incorrect", "incorrect", "correct"],
    correct: "Blue",
    image: "./assets/images/poppy.jpg"
};

// create new array that will take in all of the questions

var questionArray = [question01, question02, question03, question04, question05, question06, question07, question08, question09, question10];

// create Functions 
// this creates a start button
function start() {
    $(".content-div").empty();  //going in to the div 
    var startButton = $("<button>"); //creates a variable and connect it to a button
    startButton.text("Start"); //make button visiable on the document
    startButton.addClass("start answerBtn"); //add bootstrap class to give the look of the button
    $(".content-div").append(startButton); //puts start button
};

//once button it click, program will start running decrease by one second
function run() {
    intervalId = setInterval(decrement, 1000);
};

// when question is revealed and goes unaswered,
function decrement() {
    time--;
    $(".timer-div").text("Time Remaining: " + time + " Seconds");
    if (time == 0) { //when time goes to zero
        if (arrayFinder < questionArray.length - 1) { 
            setTimeout(function () { questionWrite(questionArray[arrayFinder])}, 2000);
            solutionWrite(questionArray[arrayFinder]);
            $(".question-div").html("Incorrect!"); 
            stop();
            unanswered++; 
        }
        else if (arrayFinder < questionArray.length) {
            setTimeout(function () {endWrite(questionArray[arrayFinder])}, 2000);
            solutionWrite(questionArray[arrayFinder]);
            $(".question-div").html("Incorrect!");  
            stop();
            unanswered++; 
        }
    };
};
// stop and reset the time interval
function stop() {
    clearInterval(intervalId);
};

// displays the question
function questionWrite(obj) {
    time = 20;
    $(".question-div").empty();
    $(".content-div").empty();
    run();
    $(".question-div").html(obj.question);
    for (var i = 0; i < obj.answers.length; i++) {
        var answerButton = $("<button>");
        answerButton.addClass("answer btn btn-default answerBtn");
        answerButton.text(obj.answers[i]);
        answerButton.attr("value", obj.value[i]);
        $(".content-div").append(answerButton);
        $(".content-div").append("<br>");
    };
};
// displays answers from the array
function solutionWrite(obj) {
    $(".question-div").empty();
    $(".content-div").empty();
    $(".content-div").html("The correct question was " + obj.correct + "<br>");
    var gameImage = $("<img>");
    gameImage.attr("height", "250"); //shows image in the object
    gameImage.attr("src", obj.image); 
    gameImage.addClass("picture")
    $(".content-div").append(gameImage);
    arrayFinder++;
};

function startWrite () {
    questionWrite(question01);   
};

// lets you select an answer
function answerSelect() {
    stop();
    if ($(this).attr("value") == "correct") {  //if you select the right answer
        solutionWrite(questionArray[arrayFinder]);
        $(".question-div").html("Correct!"); // text is adds and will display correct
        correct++; //correct column adds a point
        if (arrayFinder < questionArray.length) {
            setTimeout(function () {questionWrite(questionArray[arrayFinder])}, 2000);
        }
        else if (arrayFinder < questionArray.length + 1) {
            setTimeout(function () {endWrite(questionArray[arrayFinder])}, 2000);
        }
    }
    else if ($(this).attr("value") == "incorrect") { // or if you select the wrong answer
        solutionWrite(questionArray[arrayFinder]);
        $(".question-div").html("Incorrect"); //text is adds and will display incorrect
        incorrect++; //incorrect column adds a point
        if (arrayFinder < questionArray.length) {
            setTimeout(function() {questionWrite(questionArray[arrayFinder])}, 2000);
        }
        else if (arrayFinder < questionArray.length+1) {
            setTimeout (function () {endWrite(questionArray[arrayFinder])}, 2000);
        }
        }
    };
// displays results
    function endWrite () {
        $(".question-div").empty();
        $(".content-div").empty();
        $(".question-div").html("Here's how you did!");
        $(".content-div").html("<p> Correct: " + correct + "</p>" + "<p> Incorrect: " + incorrect + "</p>" + "<p> Unanswered: " + unanswered + "</p>");
        var resetButton = $("<button>");
        resetButton.addClass("reset btn btn-default answerBtn");
        resetButton.text("Start Over?");
        $(".content-div").append(resetButton);
    }
//restarts game and sends everything back to zero
    function resetClick () {
        arrayFinder = 0;
        incorrect = 0;
        correct = 0;
        unanswered = 0;
        startWrite()
    }

    $(document).on("click", ".start", startWrite);

    $(document).on("click", ".answer", answerSelect);

    $(document).on("click", ".reset", resetClick);

    start ();







