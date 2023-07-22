

// Define function to toggle visibility of sections based on their IDs
function toggleSection(sectionId) {
  // Get all section elements and hide them
  const sections = document.getElementsByTagName('section');
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove('active');
  }
  // Show the selected section
  const selectedSection = document.getElementById(sectionId);
  selectedSection.classList.add('active');
}


const navLinks = document.querySelectorAll('nav ul li a');

// Add event listener to each anchor element
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor behavior (scrolling)

    // Remove "active" class from all anchor elements
    navLinks.forEach(link => link.classList.remove('active'));

    // Add "active" class to the clicked anchor element
    link.classList.add('active');

    // Perform any additional actions when the link is clicked (e.g., scroll to the section)
    // ...
  });
});
