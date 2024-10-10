document.addEventListener("DOMContentLoaded", function() {
    const typewriteElement = document.querySelector('.typewrite');
    const dataText = JSON.parse(typewriteElement.getAttribute('data-type'));
    const period = parseInt(typewriteElement.getAttribute('data-period'), 10) || 2000;
    const wrapElement = typewriteElement.querySelector('.wrap');
    
    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;

    function type() {
        // Update the current text based on the index
        currentText = dataText[currentIndex];
        
        // If deleting, remove a character
        if (isDeleting) {
            wrapElement.textContent = currentText.substring(0, wrapElement.textContent.length - 1);
        } else {
            // If not deleting, add a character
            wrapElement.textContent = currentText.substring(0, wrapElement.textContent.length + 1);
        }

        // Determine the typing speed
        let typingSpeed = isDeleting ? 50 : 100; // Adjust typing speed here

        // If the current text is fully typed or deleted, toggle the deleting state
        if (!isDeleting && wrapElement.textContent === currentText) {
            typingSpeed = period; // Pause at the end of typing
            isDeleting = true; // Start deleting
        } else if (isDeleting && wrapElement.textContent === '') {
            isDeleting = false; // Start typing the next string
            currentIndex = (currentIndex + 1) % dataText.length; // Move to the next string
            typingSpeed = 500; // Pause before typing the next string
        }

        // Call the type function again after the calculated delay
        setTimeout(type, typingSpeed);
    }

    // Start the typing effect
    type();
});
