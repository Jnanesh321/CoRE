// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
});

// Fetch status from API and update message
async function fetchStatus() {
  try {
    const response = await fetch('/api/status');
    const data = await response.json();
    
    const messageElement = document.getElementById('message');
    messageElement.textContent = data.message;
  } catch (error) {
    console.error('Error fetching status:', error);
  }
}

// Load status on page load
fetchStatus();
