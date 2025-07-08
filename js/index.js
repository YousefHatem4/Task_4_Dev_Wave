// Enhanced version of your existing JavaScript with modern features

document.addEventListener('DOMContentLoaded', function() {
    // Password toggle functionality
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.closest('.input-with-icon').querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Password strength indicator (for signup page)
    const passwordInput = document.getElementById('inputPass');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const strengthBars = document.querySelectorAll('.strength-bar');
            const strengthText = document.querySelector('.strength-text');
            const password = this.value;
            
            // Reset
            strengthBars.forEach(bar => bar.style.backgroundColor = '#e2e8f0');
            
            if (password.length === 0) {
                strengthText.textContent = 'Password strength';
                return;
            }
            
            let strength = 0;
            
            // Length check
            if (password.length > 7) strength += 1;
            // Contains number
            if (/\d/.test(password)) strength += 1;
            // Contains special char
            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
            // Contains upper and lower case
            if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
            
            // Update UI
            for (let i = 0; i < strength; i++) {
                if (i === 0) strengthBars[i].style.backgroundColor = '#ef4444';
                else if (i === 1) strengthBars[i].style.backgroundColor = '#f59e0b';
                else if (i === 2) strengthBars[i].style.backgroundColor = '#3b82f6';
                else strengthBars[i].style.backgroundColor = '#10b981';
            }
            
            if (strength === 0) strengthText.textContent = 'Very weak';
            else if (strength === 1) strengthText.textContent = 'Weak';
            else if (strength === 2) strengthText.textContent = 'Moderate';
            else if (strength === 3) strengthText.textContent = 'Strong';
            else strengthText.textContent = 'Very strong';
        });
    }
});

// Your existing functions with some improvements
const formContainer = JSON.parse(localStorage.getItem('FormLists')) || [];

function addForm() {
    const inputName = document.getElementById('inputNameBtn');
    const inputEmail = document.getElementById('inputEmail');
    const inputPass = document.getElementById('inputPass');
    const incorrect = document.getElementById('incorrect');
    const correct = document.getElementById('correct');
    const infoExist = document.getElementById('infoExist');
    
    const FormLists = {
        name: inputName.value.trim(),
        email: inputEmail.value.trim(),
        pass: inputPass.value
    };
    
    // Validate inputs
    if (!FormLists.name || !FormLists.email || !FormLists.pass) {
        showFeedback(incorrect, 'All inputs are required');
        return;
    }
    
    // Check if email exists
    const emailExists = formContainer.some(user => user.email === FormLists.email);
    if (emailExists) {
        showFeedback(infoExist, 'Email already exists');
        return;
    }
    
    // Add to storage
    formContainer.push(FormLists);
    localStorage.setItem('FormLists', JSON.stringify(formContainer));
    
    // Show success and redirect
    showFeedback(correct, 'Account created successfully!');
    clearForm();
    
    setTimeout(() => {
        window.location.href = './index.html';
    }, 1500);
}

function check() {
    const inputEmail = document.getElementById('inputEmail');
    const inputPass = document.getElementById('inputPass');
    const incorrect = document.getElementById('incorrect');
    const correct = document.getElementById('correct');
    
    const email = inputEmail.value.trim();
    const password = inputPass.value;
    
    if (!email || !password) {
        showFeedback(incorrect, 'All inputs are required');
        return;
    }
    
    const user = formContainer.find(user => 
        user.email === email && user.pass === password
    );
    
    if (user) {
        localStorage.setItem('currentUser', user.name);
        showFeedback(correct, 'Login successful!');
        
        setTimeout(() => {
            window.location.href = './home.html';
        }, 1000);
    } else {
        showFeedback(incorrect, 'Invalid email or password');
    }
}

function clearForm() {
    document.getElementById('inputNameBtn').value = '';
    document.getElementById('inputEmail').value = '';
    document.getElementById('inputPass').value = '';
}

function showFeedback(element, message) {
    // Hide all feedback messages first
    document.querySelectorAll('.error-message, .success-message').forEach(el => {
        el.classList.add('d-none');
    });
    
    // Show the specific one
    element.textContent = message;
    element.classList.remove('d-none');
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        element.classList.add('d-none');
    }, 3000);
}