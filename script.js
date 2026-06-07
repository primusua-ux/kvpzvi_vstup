// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Theme Toggle Logic
       ========================================================================== */
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
        updateThemeIcon(savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-theme')) {
                body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme', 'light-theme');
                updateThemeIcon('light-theme');
            } else {
                body.classList.replace('light-theme', 'dark-theme');
                localStorage.setItem('theme', 'dark-theme');
                updateThemeIcon('dark-theme');
            }
        });
    }

    function updateThemeIcon(theme) {
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                if (theme === 'light-theme') {
                    icon.className = 'fa-solid fa-sun';
                } else {
                    icon.className = 'fa-solid fa-moon';
                }
            }
        }
    }


    /* ==========================================================================
       Mobile Navigation Drawer
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('open')) {
                    icon.className = 'fa-solid fa-xmark';
                } else {
                    icon.className = 'fa-solid fa-bars';
                }
            }
        });
    }

    // Close menu when clicking link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('open');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        });
    });


    /* ==========================================================================
       Stepper (Admissions Wizard)
       ========================================================================== */
    const stepButtons = document.querySelectorAll('.step-nav-item');
    const stepPanes = document.querySelectorAll('.step-pane');

    stepButtons.forEach(button => {
        button.addEventListener('click', () => {
            const stepNum = button.getAttribute('data-step');
            
            // Set active state on button
            stepButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Set active state on pane
            stepPanes.forEach(pane => pane.classList.remove('active'));
            const targetPane = document.getElementById(`stepPane${stepNum}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }

            // Scroll so that the stepper navigation remains at the top of the viewport
            const stepperNav = document.querySelector('.stepper-nav');
            if (stepperNav) {
                const targetScrollY = stepperNav.getBoundingClientRect().top + window.scrollY - 95;
                window.scrollTo({
                    top: targetScrollY,
                    behavior: 'smooth'
                });
            }
        });
    });




    /* ==========================================================================
       Audit UI Enhancements Handlers
       ========================================================================== */
    
    // Step Pane Transitional Navigation
    const nextStepButtons = document.querySelectorAll('.btn-next-step');
    nextStepButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const nextStepNum = button.getAttribute('data-next');
            const targetTab = document.querySelector(`.step-nav-item[data-step="${nextStepNum}"]`);
            if (targetTab) {
                targetTab.click();
            }
        });
    });

    // Test Checklist Toggle Checkboxes
    const checkButtons = document.querySelectorAll('.btn-check-test');
    checkButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('checked');
            const parentRow = btn.closest('.method-row');
            if (parentRow) {
                parentRow.classList.toggle('completed');
            }
            
            const icon = btn.querySelector('i');
            if (icon) {
                if (btn.classList.contains('checked')) {
                    icon.className = 'fa-solid fa-square-check';
                } else {
                    icon.className = 'fa-regular fa-square';
                }
            }
        });
    });

});
