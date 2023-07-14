

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