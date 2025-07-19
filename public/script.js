document.getElementById("studentForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const student = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    rollNumber: document.getElementById("rollNumber").value.trim(),
    gender: document.getElementById("gender").value
  };

  fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById("message").innerHTML =
          `<div class="alert alert-danger">${data.error}</div>`;
      } else {
        document.getElementById("message").innerHTML =
          `<div class="alert alert-success">Student created successfully!</div>`;
        document.getElementById("studentForm").reset();
      }
    })
    .catch(err => {
      document.getElementById("message").innerHTML =
        `<div class="alert alert-danger">Something went wrong</div>`;
    });
});
