document.getElementById('login_btn').addEventListener('click', e => {
    const uname = document.getElementById('uname').value;
    const password = document.getElementById('password').value;
    ajaxLogin(uname, password);

});

async function ajaxLogin(uname, password) {
    console.log(uname,password)
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/jason'
        },
        body: JSON.stringify({
            'username' : uname,
            'password' : password
        }),
    })
    
    if (ajaxLogin.status == 200) {
        alert('Login succesfull!');
    } else {
        const json = await response.json();
        alert(`Failure to login ${json.error}`)
        console.log(ajaxLogin.status);
    }
}