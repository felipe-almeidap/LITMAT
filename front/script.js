const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const API_URL_LOGIN = 'http://127.0.0.1:8000/api/auth/login/';
const API_URL_REGISTER = 'http://127.0.0.1:8000/api/auth/register/'; 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function displayError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = message;
    }
}

function clearLoginErrors() {
    displayError('error-login-email', '');
    displayError('error-login-password', '');
}

function clearRegisterErrors() {
    displayError('error-register-name', '');
    displayError('error-register-email', '');
    displayError('error-register-password', '');
    displayError('error-register-confirm_password', '');
}

showRegisterLink.addEventListener('click', (event) => {
    event.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
});

showLoginLink.addEventListener('click', (event) => {
    event.preventDefault();
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
});

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    clearLoginErrors();
    let isValid = true;

    const formData = new FormData(loginForm);
    const email = formData.get('email').trim();
    const password = formData.get('password');

    if (!email) {
        displayError('error-login-email', 'O campo E-mail não pode ficar vazio.');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        displayError('error-login-email', 'E-mail inválido. Verifique o formato.');
        isValid = false;
    }

    if (!password) {
        displayError('error-login-password', 'O campo Senha não pode ficar vazio.');
        isValid = false;
    }

    if (!isValid) return;

    const submitBtn = loginForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
        const response = await fetch(API_URL_LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            const userType = data.user.tipo;

            if (userType === 'admin') {
                window.location.href = '/dashboard/admin.html';
            } else if (userType === 'professor') {
                window.location.href = '/dashboard/professor.html';
            } else {
                window.location.href = '/dashboard/aluno.html';
            }
        } else {
            if (data.detail) {
                displayError('error-login-password', 'Credenciais inválidas. Verifique e-mail e senha.');
            } else if (data.email) {
                displayError('error-login-email', data.email[0]);
            }
        }
    } catch (error) {
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Entrar';
    }
});

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    clearRegisterErrors();
    let isValid = true;

    const formData = new FormData(registerForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm_password');

    if (!name) {
        displayError('error-register-name', 'O campo Nome não pode ficar vazio.');
        isValid = false;
    }

    if (!email) {
        displayError('error-register-email', 'O campo E-mail não pode ficar vazio.');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        displayError('error-register-email', 'E-mail inválido. Verifique o formato.');
        isValid = false;
    }

    if (!password) {
        displayError('error-register-password', 'O campo Senha não pode ficar vazio.');
        isValid = false;
    }

    if (!confirmPassword) {
        displayError('error-register-confirm_password', 'Confirme a senha.');
        isValid = false;
    } else if (password !== confirmPassword) {
        displayError('error-register-confirm_password', 'As senhas não coincidem.');
        isValid = false;
    }

    if (!isValid) return;

    const submitBtn = registerForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Cadastrando...';

    try {
        const response = await fetch(API_URL_REGISTER, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            showLoginLink.click();
            registerForm.reset();
        } else {
            if (data.detail) {
                displayError('error-register-email', data.detail);
            }
            if (data.email) {
                displayError('error-register-email', data.email[0]);
            }
            if (data.name) {
                displayError('error-register-name', data.name[0]);
            }
            if (data.password) {
                displayError('error-register-password', data.password[0]);
            }
        }
    } catch (error) {
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Cadastrar';
    }
});
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open')

    if(mainNav.classList.contains('open')) {
       menuToggle.textContent = 'X';
       document.body.style.overflow = 'hidden';
    } else  {
        menuToggle.textContent = '☰';
        document.body.style.overflow = '';
    }
});
 
mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.textContent = '☰';
        document.body.style.overflow = '';
    });
});