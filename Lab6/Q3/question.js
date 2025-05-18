document.getElementById("quizForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        sessionStorage.setItem("quizAnswer", selectedAnswer.value);
        window.location.href = "result.html";
    } else {
        alert("Please select an answer before submitting.");
    }
});