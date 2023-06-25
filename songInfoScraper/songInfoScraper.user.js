// ==UserScript==
// @name         AMQ Anime And Song Info Outputter
// @namespace   https://github.com/Lamphobic/AMQ-Practice-Tool/raw/main/songInfoScraper/
// @version      0.3
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

function songOutput(
    songName,
    artist,
    type,
    typeNumber,
    urls,
    siteIds,
    vintage,
    animeDifficulty,
    altAnimeNames,
    altAnimeNamesAnswers) {
  console.log("Song name: ", songName);
  console.log("Artist: ", artist);
  console.log("Type: ", type);
  console.log("Number: ", typeNumber);
  console.log("Links: ", urls);
  console.log("Ids: ", siteIds);
  console.log("Year/Season: ", vintage);
  console.log("Song Difficulty: ", animeDifficulty);
  console.log("Alt Names: ", altAnimeNames);
  console.log("Alt Name Answers: ", altAnimeNamesAnswers);
}

function onQuizReady(data) {
  QuizInfoContainer.prototype.showInfo = function(
    animeNames,
    songName,
    artist,
    type,
    typeNumber,
    urls,
    siteIds,
    animeScore,
    animeType,
    vintage,
    animeDifficulty,
    animeTags,
    animeGenre,
    altAnimeNames,
    altAnimeNamesAnswers
  ) {
    songOutput(
      songName,
      artist,
      typeConverter(type),
      typeNumber,
      urls,
      siteIds,
      vintage,
      animeDifficulty,
      altAnimeNames,
      altAnimeNamesAnswers
    );
    
    let diffString = typeof animeDifficulty === "number" ? Math.round(animeDifficulty) : animeDifficulty;
    this.$extraAnimeContent = $(
      format(
        this.EXTRA_INFO_TEMPLATE,
        vintage,
        animeScore,
        animeType,
        diffString,
        animeTags.join(", "),
        animeGenre.join(", ")
      )
    );
    let animeName;
    if (options.useRomajiNames) {
      animeName = animeNames.romaji;
    } else {
      animeName = animeNames.english;
    }

    let altNames = [];
    altAnimeNames.forEach((name) => {
      if (animeName != name) {
        altNames.push(name);
      }
    });

    let altAnswers = [];
    altAnimeNamesAnswers.forEach((answer) => {
      if (animeName != answer && !altNames.includes(answer)) {
        altAnswers.push(answer);
      }
    });

    this.displayAnimeName(animeName, altNames, altAnswers);

    this.$songName.text(songName);
    this.$songArtist.text(artist);
    this.$songType.text(convertTypeInfoToText(type, typeNumber));

    let targetHost = quizVideoController.getCurrentHost();
    let targetResolution = quizVideoController.getCurrentResolution();

    let hostUrls;
    if (urls[targetHost]) {
      hostUrls = urls[targetHost];
    } else {
      console.log(
        "debug: " +
        JSON.stringify({
          targetHost,
          urls,
        })
      );
      hostUrls = Object.values(urls)[0];
    }

    let sourceUrl;
    if (hostUrls[targetResolution]) {
      sourceUrl = hostUrls[targetResolution];
    } else {
      console.log(
        "debug: " +
        JSON.stringify({
          targetResolution,
          urls,
        })
      );
      sourceUrl = Object.values(hostUrls)[0];
    }

    this.$songVideoLink.attr("href", sourceUrl);

    this.$songAnimeLink.attr("href", generateAnimeSiteUrl(siteIds));

    this.$songInfoLinkRow.removeClass('hideLinks');

    this.showContent();
  };
}

function setup() {
  new Listener("quiz ready", onQuizReady).bindListener();
}
