// Wait for the DOM to load
window.onload = function() {
    // NEW CODE: Manage the active class for the nav links
    const navLinks = document.querySelectorAll('nav > a');

    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove the 'active' class from all links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add the 'active' class to the clicked link
            this.classList.add('active');
        });
    });
};
