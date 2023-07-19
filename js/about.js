// Array to store feedback
let feedbackData = [];
let selectedRating = 0;

// Function to handle rating
function rate(rating) {
  selectedRating = rating;
  const ratingStars = document.querySelectorAll("#ratingStars span");

  for (let i = 0; i < ratingStars.length; i++) {
    if (i < ratingStars.length - rating) {
      ratingStars[i].classList.remove("selected");
    } else {
      ratingStars[i].classList.add("selected");
    }
  }
}

// Function to open popup
function openPopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "block";
}

// Function to close popup
function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
  resetForm();
}

// Function to reset form
function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("feedback").value = "";
  selectedRating = 0;
  const ratingStars = document.querySelectorAll("#ratingStars span");
  ratingStars.forEach((star) => {
    star.classList.remove("selected");
  });
}

// Function to submit feedback
function submitFeedback(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const feedback = document.getElementById("feedback").value;

  if (name !== "" && feedback !== "" && selectedRating !== 0) {
    const feedbackObj = {
      name: name,
      feedback: feedback,
      rating: selectedRating,
      timestamp: new Date().toLocaleString() // Add timestamp
    };
    feedbackData.push(feedbackObj);
    displayFeedback();
    closePopup();
  }
}

// Function to save feedback data to Excel file


// Function to display feedback
function displayFeedback() {
  const feedbackList = document.getElementById("feedbackList");
  feedbackList.innerHTML = "";
  feedbackData.forEach((feedback) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <img src="https://shorturl.at/isxX8" alt="Profile Photo">
      <div>
        <strong>${feedback.name}</strong><br>
        <span class="rating">${"★".repeat(feedback.rating)}</span>
        <p>${feedback.feedback}</p>
        <span class="timestamp">${feedback.timestamp}</span> <!-- Display timestamp -->
      </div>
    `;
    feedbackList.appendChild(listItem);
  });
}

// Initial display of feedback
displayFeedback();
