$(document).ready(function () {
    var questionArray = [
        {
            question: "What does CSS stand for?",
            choice: [
                "Cascading Script Sheets",
                "Creative Style Sheets",
                "Cascading Style Sheets",
                "Cascading Style Sheeps"],
            answer: 2,
            image: "assets/images/css.png"
        },
        {
            question: "What does HTML stand for?",
            choice: [
                "Hyper Text Markup Language", 
                "Hiper Text Markup Language", 
                "Hyper Text Makeup Language", 
                "Hyper Test Markup Language"],
            answer: 0,
            image: "assets/images/html.png"
        },
        {
            question: "What does XML stand for?",
            choice: [
                "Extensible Markup Language", 
                "Extensible Markdown Language", 
                "Extensive Markup Language", 
                "Extension Markup Language"],
            answer: 0,
            image: "assets/images/xml.png"
        },
        {
            question: "What does JSON stand for?",
            choice: [
                "Javascript Objective Notation", 
                "Javascript Other Notation", 
                "JQuery Object Novention", 
                "Javascript Object Notation"],
            answer: 3,
            image: "assets/images/json.png"
        },
        {
            question: "What does URL stand for?",
            choice: [
                "Uniform Resource Location", 
                "Uniform Report Locator", 
                "Uniform Resource Locator", 
                "Unique Resource Locator"],
            answer: 2,
            image: "assets/images/url.png"
        },
        {
            question: "What does API stand for?",
            choice: [
                "apple's programming interface", 
                "application programming interface", 
                "application programming information", 
                "application problems interface"],
            answer: 1,
            image: "assets/images/api.png"
        },
        {
            question: "What do we usually do when the class start?",
            choice: [
                "triple clap", 
                "baby clap", 
                "baby snap", 
                "double snap"],
            answer: 0,
            image: "assets/images/tripleclap.gif"
        }];

    var timer = 15;
    var intervalId;
    var correctCount = 0;
    var incorrectCount = 0;
    var unansweredCount = 0;
    var userGuess = "";
    var running = false;
    var questionCount = questionArray.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    $("#reset").hide();
    // Click start button to display the questions
    $("#start").on("click", function () {
        // Hide Start button and instruction
        $("#start").hide();
        $("#instruction").hide();
        // Display questions and start timer
        displayQuestion();
        runTimer();
        for (var i = 0; i < questionArray.length; i++) {
            holder.push(questionArray[i]);
        }
    })
    // Function: Timer start
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    // Function: Timer countdown
    function decrement() {
        $("#timeRemaining").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        // Stop timer if reach 0
        if (timer === 0) {
            unansweredCount++;
            stop();
            $("#answerblock").html("<p>Time's up! The correct answer is: <br>" + pick.choice[pick.answer] + "</p>");
            hideimage();
        }
    }

    // Function: Timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    // Function: Display question
    // Randomly pick question in array if not already shown
    function displayQuestion() {
        // Pick from random index in array
        index = Math.floor(Math.random() * questionArray.length);
        pick = questionArray[index];
        if (pick.shown) {
            displayQuestion();
        } else {
            // console.log(pick.question)
        };

        //iterate through answer array and display
        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
        }

        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                hideimage();

            } else {
                stop();
                incorrectCount++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: <br>" + pick.choice[pick.answer] + "</p>");
                hideimage();
            }
        })
    }

    function hideimage() {
        $("#answerblock").append("<img src=" + pick.image + ">");
        newArray.push(pick);
        questionArray.splice(index, 1);

        var hideimage = setTimeout(function () {
            $("#answerblock").empty();
            timer = 15;

            //run the score screen if all questions answered
            if ((incorrectCount + correctCount + unansweredCount) === questionCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<p>Game Over!</p>");
                $("#answerblock").append("<p> Correct: " + correctCount + "</p>");
                $("#answerblock").append("<p> Incorrect: " + incorrectCount + "</p>");
                $("#answerblock").append("<p> UnansweredCount: " + unansweredCount + "</p>");
                $("#reset").show();
                correctCount = 0;
                incorrectCount = 0;
                unansweredCount = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 3000);


    }

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            questionArray.push(holder[i]);
        }
        runTimer();
        displayQuestion();

    })

})