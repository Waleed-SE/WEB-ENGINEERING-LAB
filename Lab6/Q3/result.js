document.addEventListener("DOMContentLoaded", function () {
  const answer = sessionStorage.getItem("quizAnswer");
  if (answer) {
    document.getElementById(
      "resultText"
    ).textContent = `You selected: ${answer}`;
  } else {
    document.getElementById("resultText").textContent =
      "No answer selected. Please go back and try again.";
  }
});
