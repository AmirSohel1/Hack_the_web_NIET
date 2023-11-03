// JavaScript for simple scroll-triggered animations

// Function to check if an element is in the viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add a class for fade-in animation
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach((element) => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

// Attach the scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Call the function on page load
animateOnScroll();

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const responseDiv = document.getElementById("response");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach(function (value, key) {
            formObject[key] = value;
        });

        // Convert the form data to a JSON string
        const jsonData = JSON.stringify(formObject);

        // Create a Blob with the JSON data
        const blob = new Blob([jsonData], { type: 'application/json' });

        // Create a link to download the file
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'contact_data.json';

        // Trigger a click event to download the file
        a.click();

        // Display a response message
        responseDiv.textContent = "Thank you for your message! The data has been saved to a file.";
        
        // Clear the form
        contactForm.reset();
    });
});