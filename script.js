//function to find todays date for then display at top of page
function displayDay() {
  let todaySchedule = moment().format("MMMM, Do, YYYY");
  console.log(todaySchedule);
  let currentDate = document.querySelector("#currentDay");

  currentDate.innerHTML = todaySchedule;
}
displayDay();

function renderRows() {
  //add number id for row
  let timeElements = document.querySelectorAll(".row");

  let userTime = moment().hour();

  //loop to loop through the dom timeslots and sort the time properties by colour
  for (let i = 0; i < timeElements.length; i++) {
    //convert id information into a string
    let timeNumber = parseInt(timeElements[i].dataset.time, 10);
    console.log(timeNumber);
    let textarea = document.querySelector(
      `[data-time="${timeNumber}"] > textarea`
    );
    let saveButton = document.querySelector(
      `[data-time="${timeNumber}"] > button`
    );
    saveButton.addEventListener("click", onClickSave);
    console.log(textarea);

    if (userTime > timeNumber) {
      textarea.className = "past";
    } else if (timeNumber > userTime) {
      textarea.className = "future";
    } else {
      textarea.className = "present";
    }

    // add events from ls to dom
    let userEvent = localStorage.getItem(createKey(timeNumber));
    textarea.value = userEvent;
  }
}
// Create key to save in localstorage
function createKey(hour) {
  let dateString = moment().format("DD, MM, YY");

  return `${dateString}-${hour}`;
}

function onClickSave(event) {
  let targetTime = event.target.parentElement.dataset.time;

  // pass entered information as a string into textbox
  let textArea = document.querySelector(
    `[data-time="${targetTime}"] > textarea`
  );
  let text = textArea.value;
  let key = createKey(targetTime);

  localStorage.setItem(key, text);
}
renderRows();
