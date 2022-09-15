document.getElementById('login_btn').addEventListener('click', e => {
    const uname = document.getElementById('uname').value;
    const password = document.getElementById('password').value;
    ajaxLogin(uname, password);

});

async function ajaxLogin(uname, password) {
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": uname,
            "password": password
        }),
    });

    if (response.status == 200) {
        alert(`User ${uname} logged in!`);
        document.getElementById('logged')
        const p = document.createElement('p');
        const text = document.createTextNode(`User ${uname} is now logged in!`);
        p.appendChild(text);
        document.getElementById('logged').appendChild(p);
        console.log('done')
    }
    if (response.status == 401) {
        alert('Invalid Details')
    }
    else {
        const json = await response.json();
        alert(`Error during reservation : ${json.error}`);
        document.getElementById('logged').innerHTML = "";
        console.log * +('not done')
    }
}