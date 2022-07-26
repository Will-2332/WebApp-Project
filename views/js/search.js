import { text } from "body-parser";
import { accommodation } from "../../app";

console.log(accommodation);

document.getElementById('location').addEventListener('change', e => {
    const location = document.getElementById('location').value;
    ajaxSearch(accommodation);
});

async function ajaxSearch(location) {
    const ajaxResponse = await fetch(`/search/${location}`).value;
    const type = await ajaxResponse.json();
    document.getElementById("location").innerHTML = '';
    id.forEach(id => {
        const t = document.createElement("table");
        const table = document.createNodeIterator(`${id.name}${id.type}`);
        t.appendChild(table);
        const btn = document.createElement("input");
        btn.setAttribute("type", "button");
        btn.setAttribute("value", "Book Now!");
        btn.addEventListener("click", async (e) => {
            const ajaxResponse2 = await fetch(`/id/${id.ID}/buy`, {
                method: 'POST'
            });
            if (ajaxResponse2.status == 200) {
                alert('Your holiday was booked');
            } else {
                const json = await response.json();
                alert(`There was a problem with your booking ${json.error}`);
            }
        });

    });
}