document.getElementById('accommodation_search').addEventListener('click', e => {
    const location = document.getElementById('accommodation_location').value;
    ajaxSearch(location);
});

async function ajaxSearch(location) {
    const ajaxResponse = await fetch(`/location/${location}`);
    const accommodation = await ajaxResponse.json();
    document.getElementById('accommodation_results')
    const local = accommodation[0];
    var map = L.map("map1").setView([local.latitude,local.longitude],9);
    // document.getElementById('accommodation_results').innerHTML = "";
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    accommodation.forEach(accommodation => {
        const p = document.createElement('p');
        const pos = [accommodation.latitude,accommodation.longitude]
        const marker = L.circle(pos, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 2500
        }).addTo(map);
        marker.bindPopup(`Name : ${accommodation.name}<br>
        Type : ${accommodation.type}<br>
        Description : ${accommodation.description}<br>
        `);
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
            } if (ajaxReservation.status == 401) {
                alert('Please login!')
            } 
            else {
                const json = await response.json();
                alert(`Error during reservation : ${json.error}`);
            }
        });
        document.getElementById('accommodation_results').appendChild(p);
        document.getElementById('accommodation_results').appendChild(btn);
    });
}
