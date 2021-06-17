// the maximum page of the comic
const maxPage = 2475;

//  set button link functions
function setNextBtn(id) {
  let btnNext = document.querySelector(`#next`);
  // if next page is out of page, then link is nothing, else link is next page
  btnNext.href = id + 1 > maxPage ? "#" : `/${id + 1}/page`;
}
function setPrevBtn(id) {
  let btnPrev = document.querySelector(`#previous`);
  // if previous page is out of page, then link is nothing, else link is previous page
  btnPrev.href = id - 1 < 1 ? "#" : `/${id - 1}/page`;
}
function setRandomBtn(max) {
  let btnRandom = document.querySelector(`#random`);
  // random age from 1 to maxPage
  let randomPage = Math.floor(Math.random() * (max - 1) + 1);
  btnRandom.href = `/${randomPage}/page`;
}
function setBtn(id) {
  setNextBtn(id);
  setPrevBtn(id);
  setRandomBtn(maxPage);
}

// window load function
window.onload = async () => {
  // find the page number, by the url of the page
  let comicID =
    window.location.pathname === "/"
      ? 0
      : parseInt(window.location.pathname.match(/(\d+)/)[0]);
  console.log(comicID);
  let successCheck = false;
  setBtn(comicID); // call set button function

  // try GET data
  try {
    // request to GET comic data
    let res = await fetch(`/info.0.json`);

    // code if has multiple comic pages from document
    // let res =
    //   comicID === 0
    //     ? await fetch(`/info.0.json`)
    //     : await fetch(`/${i}/info.0.json`);

    // if fetch from website
    // let res =
    //   comicID === 0
    //     ? await fetch(`https://xkcd.com/info.0.json`)
    //     : await fetch(`https://xkcd.com/${comicID}/info.0.json`);
    let dataString = await res.text();
    let data = JSON.parse(dataString); // change it to pure JSON.

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    document.querySelector(`#title`).innerHTML = data.title; // page title

    let dataComicPic = document.querySelector(`#comic-pic`);
    dataComicPic.src = data.img; // comic picture
    dataComicPic.title = data.title; // comic picture title
    dataComicPic.alt = data.alt; // comic picture subtitle

    document.querySelector(`#comic-name`).innerHTML = data.title; // comic title
    document.querySelector(`#transcript`).innerHTML = data.transcript //comic transcript
      .replace(/\n/g, "</br>") // replace every \n to </br>(newline)
      .replace(/{.*}/g, ""); // replace the content inside {} to nothing

    document.querySelector(`#comic-date`).innerHTML = // comic created date (month/day/year)
      monthNames[parseInt(data.month) - 1] + "/" + data.day + "/" + data.year; // parseInt(data.month) - 1 = change number to word

    successCheck = true;
  } catch (error) {
    console.error(error);
    alert(`Error! Comic loading failed!`);
  }

  document.querySelector(".loading-container").classList.remove("loading"); // remove loading status
};
