
document.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.matches('#login-btn')) {
        var emailInput = document.getElementById('email-input');
        var pwdInput = document.getElementById('pwd-input');
        var loginType = document.getElementById('login-type');

        var loginUrl = '/api/auth/login';
        if (loginType.value === 'seller') {
            loginUrl = '/api/seller/auth/login';
        }

        var data = {
            email: emailInput.value,
            password: pwdInput.value,
            loginType: loginType.value,
        };
        Http.Post(loginUrl, data)
            .then(() => {
                window.location.href = '/users';
            })
    }
}, false)
