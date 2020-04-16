// let bearer = localStorage.getItem("token");

function ajaxLogin(email, password) {
    $.ajax({
        url: `http://${appConfig.mudBack}/api/login`,
        type: "POST",
        data: {
            'email': email,
            'password': password,
        },
        success: function (response) {
            console.log('login:');
            console.log(response);
            if (response.token) {
                localStorage.setItem("token", response.token);
                document.location.href = '/';
            }

        },
    });
}

/**/
//эту оставить
function ajaxLogin1(email, password) {

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    fetch(`http://${appConfig.mudBack}/api/login`, {
        method: "POST",
        body: formData,
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);

            if (data.token) {
                localStorage.setItem("token", data.token);
                console.log('redirect');
                // document.location.href = '/';
            }
        });

    console.log('ajaxLogin1');
}

async function ajaxLogin2(email, password) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch(`http://${appConfig.mudBack}/api/login`, {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (data.token) {
                localStorage.setItem("token", data.token);
                console.log('redirect');
                // document.location.href = '/';
            }
        });
    console.log('ajaxLogin2');
}

/**/

function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

document.addEventListener("DOMContentLoaded", function (event) {

    $(document).on("click", "#login-button", function (event) {
        let userEmail = $("#user_email").val();
        let userPassword = $("#user_password").val();

        let validatedEmail = validateEmail(userEmail);

        if (!validatedEmail) {
            $('.alert-danger-email').css({"display": "block"});
            setTimeout(function () {
                $('.alert-danger-email').css({"display": "none"});
            }, 3000);
        }
        if (!userPassword) {
            $('.alert-danger-password').css({"display": "block"});
            setTimeout(function () {
                $('.alert-danger-password').css({"display": "none"});
            }, 3000);
        }
        if (!validatedEmail || !userPassword) {
            console.log("return");
            return;
        }

        // console.log("ajax");
        ajaxLogin1(userEmail, userPassword)
    });

});
