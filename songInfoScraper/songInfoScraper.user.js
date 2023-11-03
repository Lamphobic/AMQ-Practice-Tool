// ==UserScript==
// @name         AMQ Anime And Song Info Outputter
// @namespace   https://github.com/Lamphobic/AMQ-Practice-Tool/raw/main/songInfoScraper/
// @version      0.5
// @description  Prints anime info to console.
// @author       Lamphobic
// @match        https://animemusicquiz.com/*
// @downloadURL  https://github.com/Lamphobic/AMQ-Practice-Tool/raw/main/songInfoScraper/songInfoScraper.user.js
// @updateURL    https://github.com/Lamphobic/AMQ-Practice-Tool/raw/main/songInfoScraper/songInfoScraper.user.js
// @grant        none
// ==/UserScript==

/* global Listener */
if (window.quiz) {
  setup();
}

function typeConverter(type) {
  if (type == 1) {
    return "Opening"
  }
  if (type == 2) {
    return "Ending"
  }
  return "Insert"
}

function answersRecieved(result) {
    let songInfo = result.songInfo;
    let songName = songInfo.songName;
    let artist = songInfo.artist;
    let type = typeConverter(songInfo.type);
    let number = songInfo.typeNumber;
    let videoTargetMap = songInfo.videoTargetMap;
    let siteIds = songInfo.siteIds;
    let vintage = songInfo.vintage;
    let difficulty = songInfo.animeDifficulty;
    console.log("Song name: ", songName);
    console.log("Artist: ", artist);
    console.log("Type: ", type);
    console.log("Number: ", number);
    console.log("Links: ", videoTargetMap);
    console.log("Ids: ", siteIds);
    console.log("Year/Season: ", vintage);
    console.log("Song Difficulty: ", difficulty);
}

function setup() {
  new Listener("answer results", answersRecieved).bindListener();
}
