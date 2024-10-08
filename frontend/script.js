// Signup handler
document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  const response = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const messageElement = document.createElement('p'); // Element to display the response message
  if (response.ok) {
    alert('Signup successful! You can now login.');
    document.getElementById('signupForm').reset(); // Reset the form
    messageElement.textContent = 'Signup successful! You can now log in.'; // Success message
    messageElement.style.color = 'green'; // Success message color
  } else {
    const errorData = await response.json();
    messageElement.textContent = 'Signup failed: ' + errorData.error; // Error message
    messageElement.style.color = 'red'; // Error message color
  }
  document.body.appendChild(messageElement); // Append message to body
});

// Login handler
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const messageElement = document.createElement('p'); // Element to display the response message
  if (response.ok) {
    const data = await response.json();
    alert(data.message); // Display success message
    messageElement.textContent = data.message; // Show server message
    messageElement.style.color = 'green'; // Success message color
    document.getElementById('loginForm').reset(); // Reset the form
    displaySubjects(data.subjects); // Display subjects
    document.getElementById('addSubjectForm').style.display = 'block'; // Show add subject form
    document.getElementById('loginForm').style.display = 'none'; // Hide login form
  } else {
    const errorData = await response.json();
    messageElement.textContent = 'Login failed: ' + errorData.error; // Error message
    messageElement.style.color = 'red'; // Error message color
  }
  document.body.appendChild(messageElement); // Append message to body
});

// Add Subject handler
document.getElementById('addSubjectForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value; // Using the logged-in email
  const subject = document.getElementById('subject').value;

  const response = await fetch('http://localhost:3000/add-subject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, subject }),
  });

  const messageElement = document.createElement('p'); // Element to display the response message
  if (response.ok) {
    alert('Subject added successfully!');
    document.getElementById('subject').value = ''; // Clear the input field
    const data = await response.json(); // Get updated subjects
    displaySubjects(data.subjects); // Update displayed subjects
    messageElement.textContent = 'Subject added successfully!'; // Success message
    messageElement.style.color = 'green'; // Success message color
  } else {
    const errorData = await response.json();
    messageElement.textContent = 'Failed to add subject: ' + errorData.error; // Error message
    messageElement.style.color = 'red'; // Error message color
  }
  document.body.appendChild(messageElement); // Append message to body
});

// Display subjects function
function displaySubjects(subjects) {
  const subjectList = document.getElementById('subjectList');
  subjectList.innerHTML = '<h3>Your Subjects</h3>';
  subjects.forEach(subject => {
    const subjectItem = document.createElement('div');
    subjectItem.textContent = subject;
    subjectList.appendChild(subjectItem);
  });
}
