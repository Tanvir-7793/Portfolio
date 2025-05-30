document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    const formContainer = document.querySelector('.contact-form');
    
    // Add animation to form elements
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.animationDelay = `${index * 0.2}s`;
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showError('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Send email using EmailJS
        emailjs.sendForm('service_wo343z3', 'template_h4a1iwo', form)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showSuccess('Thank you for your message! I will get back to you soon.');
                form.reset();
            }, function(error) {
                console.log('FAILED...', error);
                showError('Failed to send message. Please try again later.');
            })
            .finally(function() {
                // Reset button state
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
            });
    });

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        // Remove any existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        formContainer.appendChild(errorDiv);
        
        // Animate error message
        errorDiv.style.animation = 'shake 0.5s ease-in-out';
        
        // Remove error message after 3 seconds
        setTimeout(() => {
            errorDiv.style.opacity = '0';
            setTimeout(() => {
                errorDiv.remove();
            }, 500);
        }, 3000);
    }

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        
        // Remove any existing success messages
        const existingSuccess = document.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }
        
        // Add new success message
        formContainer.appendChild(successDiv);
        
        // Animate success message
        successDiv.style.animation = 'fadeIn 0.5s ease-in-out';
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successDiv.style.opacity = '0';
            setTimeout(() => {
                successDiv.remove();
            }, 500);
        }, 3000);
    }
}); 