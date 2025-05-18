document.getElementById("form1").addEventListener("submit", function (event) {
  event.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var course = document.getElementById("course").value;

  var tableBody = document.getElementById("tableBody");
  var newRow = tableBody.insertRow();
  var nameCell = newRow.insertCell(0);
  var emailCell = newRow.insertCell(1);
  var courseCell = newRow.insertCell(2);

  nameCell.textContent = name;
  emailCell.textContent = email;
  courseCell.textContent = course;

  document.getElementById("form1").reset();

  alert("Form Submitted Successfully!");
});
