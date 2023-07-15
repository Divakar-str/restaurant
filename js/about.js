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
    };
    feedbackData.push(feedbackObj);
    displayFeedback();
    closePopup();
  }
}

// Function to display feedback
function displayFeedback() {
  const feedbackList = document.getElementById("feedbackList");
  feedbackList.innerHTML = "";
  feedbackData.forEach((feedback) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <img src="profile-photo.jpg" alt="Profile Photo">
      <div>
      <strong>${feedback.name}</strong><br>
        <span class="rating">${"★".repeat(feedback.rating)}</span>
        
        <p>${feedback.feedback}</p>
      </div>
    `;
    feedbackList.appendChild(listItem);
  });
}
