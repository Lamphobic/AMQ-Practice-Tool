// ==UserScript==
// @name         AMQ Anime And Song Info Outputter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Prints Anime info to console.
// @author       Lamphobic
// @match        https://animemusicquiz.com/*
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
  console.log("Song name: ", artist);
  console.log("Song name: ", type);
  console.log("Song name: ", typeNumber);
  console.log("Song name: ", urls);
  console.log("Song name: ", siteIds);
  console.log("Song name: ", vintage);
  console.log("Song name: ", animeDifficulty);
  console.log("Song name: ", altAnimeNames);
  console.log("Song name: ", altAnimeNamesAnswers);
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
    console.log("Song name: ", songName);
    console.log("Song name: ", artist);
    console.log("Song name: ", type);
    console.log("Song name: ", typeNumber);
    console.log("Song name: ", urls);
    console.log("Song name: ", siteIds);
    console.log("Song name: ", vintage);
    console.log("Song name: ", animeDifficulty);
    console.log("Song name: ", altAnimeNames);
    console.log("Song name: ", altAnimeNamesAnswers);
    console.log(
      songName,
      artist,
      type,
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
