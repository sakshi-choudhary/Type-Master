let text_to_type = [
  `In this world, everything is governed by balance. There is what you stand to gain and what you stand to lose. And when you think you have got nothing to lose, you become overconfident.`,
  `You know what else is scary? Walking home alone at night. But us women keep doing it. Take fear by the hand and keep living. Because you have to live, gentlemen! You have to live until the end!`,
  `First times are special. Unique. But the last times are beyond comparison. They are priceless. But people don’t know it’s their last time.`,
  " When someone is in love, they look through rose-tinted glasses. Everything’s wonderful. They transform into a soft teddy bear that’s smiling all the time.",
  "If you can imagine a furry humanoid seven feet tall, with the face of an intelligent gorilla and the braincase of a man, you'll have a rough idea of what they looked like -- except for their teeth. The canines would have fitted better in the face of a tiger, and showed at the corners of their wide, thin-lipped mouths, giving them an expression of ferocity.",
  "The cab arrived late. The inside was in as bad of shape as the outside which was concerning, and it didn't appear that it had been cleaned in months. The green tree air-freshener hanging from the rearview mirror was either exhausted of its scent or not strong enough to overcome the other odors emitting from the cab. The correct decision, in this case, was to get the hell out of it and to call another cab, but she was late and didn't have a choice.",
  "What was beyond the bend in the stream was unknown. Both were curious, but only one was brave enough to want to explore. That was the problem. There was always one that let fear rule her life.",
  "You can decide what you want to do in life, but I suggest doing something that creates. Something that leaves a tangible thing once you're done. That way even after you're gone, you will still live on in the things you created.",
  "He knew what he was supposed to do. That had been apparent from the beginning. That was what made the choice so difficult. What he was supposed to do and what he would do were not the same. This would have been fine if he were willing to face the inevitable consequences, but he wasn't.",
  "It's always good to bring a slower friend with you on a hike. If you happen to come across bears, the whole group doesn't have to worry. Only the slowest in the group do. That was the lesson they were about to learn that day.",
];

////// lots of defining  //////////

let timertext = document.querySelector(".curr_time");
let texttotype_text = document.querySelector(".texttotype");
let inputfield = document.querySelector(".inputfield");
let playagain_btn = document.querySelector(".playagain_btn");
let startbtn = document.getElementById("startbtn");
let resumebtn = document.getElementById("resumebtn");
let stopbtn = document.getElementById("stopbtn");
let errorgp = document.querySelector(".errors");
let accuracygp = document.querySelector(".accuracy");
let accuracytext = document.querySelector(".accuracy_rn");
let errortext = document.querySelector(".errors_rn");
let finishbtn = document.getElementById("finishbtn");

let timeLeft = 60;
let timepassed = 0;
let letterTyped = 0;
let current_texttotype = "";
let texttotypeNo = 0;
let timer = null;
let total_errors = 0;
let errors = 0;
let accuracy = 0;

////////////////////////////////////////////////////////////////////
// This is the function to update the para the user is gonna type //
///////////////////////////////////////////////////////////////////

function updatetexttotype() {
  timeLeft = 60;
  texttotype_text.textContent = null;
  current_texttotype = text_to_type[texttotypeNo];

  // here we separate each letter to make an element out of each of them to individually style them red green later
  current_texttotype.split("").forEach((letter) => {
    const letterSpan = document.createElement("span");
    letterSpan.innerText = letter;
    texttotype_text.appendChild(letterSpan);
  });

  // get back to the first texttotype
  if (texttotypeNo < text_to_type.length - 1) texttotypeNo++;
  else texttotypeNo = 0;
}

//////////////////////////////////////////////////////////////////////////////
// This is the function to process the texts as letters and part it correct //
// n incorrect letter wise at the moment user is typing                   ///
/////////////////////////////////////////////////////////////////////////////

function runtext_rn() {
  // take current input text by user and split it
  curr_input = inputfield.value;
  curr_input_array = curr_input.split("");

  // increment total letters typed
  letterTyped++;

  errors = 0;

  texttotypeSpanArray = texttotype_text.querySelectorAll("span");
  texttotypeSpanArray.forEach((letter, index) => {
    let typedletter = curr_input_array[index];

    // letters not currently typed
    if (typedletter == null) {
      letter.classList.remove("correct_letter");
      letter.classList.remove("incorrect_letter");

      // correct letters
    } else if (typedletter === letter.innerText) {
      letter.classList.add("correct_letter");
      letter.classList.remove("incorrect_letter");

      // incorrect letters
    } else {
      letter.classList.add("incorrect_letter");
      letter.classList.remove("correct_letter");

      // increment number of errors
      errors++;
    }
  });

  if (curr_input.length == current_texttotype.length) {
    updatetexttotype();

    // update total errors
    total_errors += errors;

    // empty the input area
    inputfield.value = "";
  }
}

////////////////////////////////////////////////////////////////////
//      This is the function to update the timer                  //
///////////////////////////////////////////////////////////////////

function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;

    // increase the time passed
    timepassed++;

    // update the timer text
    timertext.textContent = timeLeft + "s";
  } else {
    // end the game
    gameend();
  }
}

////////////////////////////////////////////////////////////////////
//         This is the function to end the game                  //
//////////////////////////////////////////////////////////////////

function gameend() {
  // stop the timer
  clearInterval(timer);

  inputfield.disabled = true;
  stopbtn.style.display = "none";
  finishbtn.style.display = "none";
  // to display restart button after game ends
  playagain_btn.style.display = "block";
  // display the number of errors at last
  errortext.textContent = total_errors + errors;

  // update accuracy text
  let correctletters = letterTyped - (total_errors + errors);
  let accuracyVal = (correctletters / letterTyped) * 100;
  accuracytext.textContent = `${Math.round(accuracyVal)}%`;

  accuracygp.style.display = "block";
  errorgp.style.display = "block";
}

////////////////////////////////////////////////////////////////////
//           This is the function to start the game              //
//////////////////////////////////////////////////////////////////

function startgame() {
  resetdata();
  updatetexttotype();
  stopbtn.style.display = "block";
  finishbtn.style.display = "block";
  playagain_btn.style.display = "block";
  // to hide start btn when the game is going on
  startbtn.style.display = "none";
  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

////////////////////////////////////////////////////////////////////
//           This is the function to stop the game               //
//////////////////////////////////////////////////////////////////

function stopgame() {
  // stop the timer
  clearInterval(timer);

  inputfield.disabled = true;
  resumebtn.style.display = "block";
  // to display restart button after game ends
  playagain_btn.style.display = "block";
  //hide stop btn
  stopbtn.style.display = "none";
}

////////////////////////////////////////////////////////
// this the func to resume game after user stops it  //
//////////////////////////////////////////////////////

function resumegame() {
  // to hide start btn when the game is going on
  resumebtn.style.display = "none";
  // clear old and start a new timer
  inputfield.disabled = false;
  timer = setInterval(updateTimer, 1000);
  //show stop btn
  stopbtn.style.display = "block";
  finishbtn.style.display = "block";
}

////////////////////////////////////////////////////////////////////
// This is the function to reset all data after game ends        //
//////////////////////////////////////////////////////////////////

function resetdata() {
  timeLeft = 60;
  timepassed = 0;
  letterTyped = 0;
  texttotypeNo = 0;
  inputfield.disabled = false;
  inputfield.value = "";
  timertext.textContent = timeLeft + "s";
  playagain_btn.style.display = "none";
  startbtn.style.display = "block";
  stopbtn.style.display = "none";
  finishbtn.style.display = "none";
  resumebtn.style.display = "none";
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  accuracytext.textContent = 100;
  errortext.textContent = 0;
  accuracygp.style.display = "none";
  errorgp.style.display = "none";
}
