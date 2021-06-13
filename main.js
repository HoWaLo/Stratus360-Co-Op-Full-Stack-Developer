// jump to page 1 automatically when at home page
if (window.location.pathname === "/") window.location.pathname = "/1/page";

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

// counting visitor function
function count(id, onOff) {
  // get counting from localStorage of the comic page
  let n = localStorage.getItem(id);

  if (n === null) n = 0; // if no result, set n to 0
  if (onOff) n++; // if comic load successfully
  localStorage.setItem(id, n); // save the visitor counting to the localStorage

  document.querySelector("#counter").innerHTML =
    n <= 1
      ? `The strip has been viewed ${n} time.`
      : `The strip has been viewed ${n} times.`;
}

// window load function
window.onload = async () => {
  // find the page number, by the url of the page
  let comicID = parseInt(window.location.pathname.match(/(\d+)/)[0]);
  let successCheck = false;
  setBtn(comicID); // call set button function

  // try GET data
  try {
    // request to GET comic data
    let res = await fetch(`https://xkcd.com/${comicID}/info.0.json`);
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

  count(comicID, successCheck); // count the visitor if comic load successfully
  document.querySelector(".loading-container").classList.remove("loading"); // remove loading status
};
