window.onload = function() {
    const navLinks = document.querySelectorAll('nav > a'); // All navigation links
    const sections = document.querySelectorAll('main > section[id]'); // Updated to select all sections with an ID
    const hamburger = document.getElementById('hamburger'); // Hamburger menu button
    const navMenu = document.getElementById('nav-menu'); // Mobile navigation menu
    const scrollDown = document.querySelector('.scroll-down a'); // Scroll down button
    const aboutLink = document.querySelector('nav > a[href="#jump-about"]'); // "About" link
    
    // Options for the IntersectionObserver
    const options = {
        root: null, // Viewport as root
        threshold: 0.2, // Trigger when 20% of a section is visible
        rootMargin: '-50px' // Offset for sticky header, adjust as needed
    };

    // Function to remove active class from all navigation links
    function removeActiveClasses() {
        navLinks.forEach(link => link.classList.remove('active'));
    }

    // Function to set the active class based on the visible section
    function setActiveSection(sectionId) {
        const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
        if (activeLink) {
            removeActiveClasses();
            activeLink.classList.add('active');
        }
    }

    // IntersectionObserver to detect section visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id); // Set active class based on visible section
            }
        });
    }, options);

    // Observe each section for scroll detection
    sections.forEach(section => {
        observer.observe(section); // Observe each section
    });

    // Event listener for clicking on navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior for smooth scrolling

            const targetId = this.getAttribute('href').substring(1); // Get the section id from href
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth' // Smooth scroll to section
                });
            }

            removeActiveClasses();
            this.classList.add('active'); // Set active class on the clicked link

            // Close the mobile menu when a link is clicked (for mobile view)
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active'); // Ensures the hamburger icon is updated
            }
        });
    });

    // Toggle the mobile menu when hamburger is clicked
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Scroll-down button functionality to make the "About" section active
    scrollDown.addEventListener('click', function(event) {
        event.preventDefault();  // Prevent default anchor behavior

        removeActiveClasses();  // Remove active class from all links
        aboutLink.classList.add('active');  // Add active class to the "About" link

        document.querySelector('#jump-about').scrollIntoView({
            behavior: 'smooth' // Smooth scroll to the "About" section
        });
    });
};
