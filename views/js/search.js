const map = L.map("map1");
L.tileLayer
    ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: attrib }).addTo(map);


document.getElementById('accommodation_search').addEventListener('click', e => {
    const location = document.getElementById('accommodation_location').value;
    ajaxSearch(location);
});

async function ajaxSearch(location) {
    const ajaxResponse = await fetch(`/location/${location}`);
    const accommodation = await ajaxResponse.json();
    var map = L.map("map1");
    L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: attrib }).addTo(map);
    document.getElementById('accommodation_results').innerHTML = "";
    accommodation.forEach(accommodation => {
        const p = document.createElement('p');
        const lat = accommodation.latitude
        const long = accommodation.longitute
        const local = [long,lat]
        L.marker(local).addTo(map)

        const text = document.createTextNode(`Name : ${accommodation.name}
              Type : ${accommodation.type}`);
        p.appendChild(text);
        const btn = document.createElement('input');
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', 'Book now!');
        btn.addEventListener('click', async (e) => {
            const ajaxReservation = await fetch('/book', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, /',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "accID": 1,
                    "npeople": 1,
                    "thedate": 20220801,
                    "ID": accommodation.ID
                }),
            })
            if (ajaxReservation.status == 200) {
                alert('Reservation done');
            } else {
                const json = await response.json();
                alert(`Error during reservation : ${json.error}`);
            }
        });
        document.getElementById('accommodation_results').appendChild(p);
        document.getElementById('accommodation_results').appendChild(btn);
    });
}

const attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence";