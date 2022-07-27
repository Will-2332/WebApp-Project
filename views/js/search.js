const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require("body-parser");
const cors = require("cors");
const ejs = require("ejs");
var urlencodedParser = require('urlencoded-parser')
const { response } = require("express");

document.getElementById('accommodation_search').addEventListener('click', e => {
    const location = document.getElementById('accommodation_location').value;
    ajaxSearch(location);
});

async function ajaxSearch(location) {
    const ajaxResponse = await fetch(`/location/${location}`);
    const accommodation = await ajaxResponse.json();
    document.getElementById('accommodation_results').innerHTML = '',
        accommodation.forEach(accommodation => {
            const p = document.createElement('p');
            const text = document.createTextNode(`${accommodation.name}${accommodation.location}${accommodation.type}`);
            p.appendChild(text);
            const btn = document.createElement('input');
            btn.setAttribute('type', 'button');
            btn.setAttribute('value', 'Book now!');
            btn.addEventListener('click', async(e) => {
                const ajaxReservation = await fetch(`/book/${accommodation.ID}`, {
                    method: 'POST'
                })
        if(ajaxReservation.status == 200){
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