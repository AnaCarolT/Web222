/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Ana Caroline Campos Tirolli
 *      Student ID: 122476229
 *      Date:       2023-07-20
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

//Create an event handler to run when the page is loaded.  Make sure you don’t do anything to the DOM until it’s fully loaded.

document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu");
  const listSongs = document.getElementById("songs");
  const specificArtists = document.getElementById("selected-artist");

  //a.	Create all of the buttons for your store’s Artists.
  //Need to be called
  function createButtonsForArtists() {
    artists.forEach((artist) => {
      const button = document.createElement("button");
      button.textContent = artist.name;
      button.addEventListener("click", () => showAuthor(artist));
      menu.appendChild(button);
    });
  }

  function showAuthor(artist) {
    let artistSocial = artist.name + " (";
    let linksHTML = "";

    for (const link of artist.links) {
      linksHTML += `<a href="${link.url}" target="_blank">${link.name}</a>, `;
    }

    linksHTML = linksHTML.slice(0, -2);
    artistSocial += linksHTML + ")";

    specificArtists.innerHTML = artistSocial;

    //b.	Clear the current <tr>…</tr> rows from the <tbody>…</tbody>. HINT: innerHTML = “”
    listSongs.innerHTML = "";

    //b. Show a list of Songs in the <tbody>…</tbody> of your Table.
    //a.	Update the text of the Selected Artist above your table with the Artist’s Name and create anchor elements for all of the Artists Links (i.e., you should be able to open these links to see more info about the artist).
    //c.	Filter your Songs Array (i.e., use Array.prototype.filter()) to get.
    const authorSongs = songs.filter((song) => song.artistId === artist.id && !song.flagged);

    //Write a function that will show a list of songs in the <tbody>…</tbody> based on the chosen Artist.
    //d.	Loop (use Array.prototype.forEach()) over your filtered song list and add them to the table’s body using DOM methods (i.e., not innerHTML).
    authorSongs.forEach((song) => {
      const line = document.createElement("tr");
      line.addEventListener("click", () => console.log(song));

      const nameSong = document.createElement("td");
      nameSong.textContent = song.title;

      const yearSong = document.createElement("td");
      yearSong.textContent = song.year;

      const Time = document.createElement("td");
      const min = Math.floor(song.duration / 60);
      const sec = song.duration % 60;
      Time.textContent = `${min}:${sec.toString().padStart(2, "0")}`;

      line.appendChild(nameSong);
      line.appendChild(yearSong);
      line.appendChild(Time);

      listSongs.appendChild(line);
    });
  }

  //Call when everything is properly loaded
  createButtonsForArtists();
});
