let text_to_type = [
  "The wave crashed and hit the sandcastle head-on. The sandcastle began to melt under the waves force and as the wave receded, half the sandcastle was gone. The next wave hit, not quite as strong, but still managed to cover the remains of the sandcastle and take more of it away. The third wave, a big one, crashed over the sandcastle completely covering and engulfing it. When it receded, there was no trace the sandcastle ever existed and hours of hard work disappeared forever.",
  "He wondered if he should disclose the truth to his friends. It would be a risky move. Yes, the truth would make things a lot easier if they all stayed on the same page, but the truth might fracture the group leaving everything in even more of a mess than it was not telling the truth. It was time to decide which way to go.",
  `It was so great to hear from you today and it was such weird timing," he said. "This is going to sound funny and a little strange, but you were in a dream I had just a couple of days ago. I'd love to get together and tell you about it if you're up for a cup of coffee," he continued, laying the trapped he's been planning for years.`,
  "I recollect that my first exploit in squirrel-shooting was in a grove of tall walnut-trees that shades one side of the valley. I had wandered into it at noontime, when all nature is peculiarly quiet, and was startled by the roar of my own gun, as it broke the Sabbath stillness around and was prolonged and reverberated by the angry echoes.",
  "If you can imagine a furry humanoid seven feet tall, with the face of an intelligent gorilla and the braincase of a man, you'll have a rough idea of what they looked like -- except for their teeth. The canines would have fitted better in the face of a tiger, and showed at the corners of their wide, thin-lipped mouths, giving them an expression of ferocity.",
  "The cab arrived late. The inside was in as bad of shape as the outside which was concerning, and it didn't appear that it had been cleaned in months. The green tree air-freshener hanging from the rearview mirror was either exhausted of its scent or not strong enough to overcome the other odors emitting from the cab. The correct decision, in this case, was to get the hell out of it and to call another cab, but she was late and didn't have a choice.",
  "What was beyond the bend in the stream was unknown. Both were curious, but only one was brave enough to want to explore. That was the problem. There was always one that let fear rule her life.",
  " You can decide what you want to do in life, but I suggest doing something that creates. Something that leaves a tangible thing once you're done. That way even after you're gone, you will still live on in the things you created.",
  "Indescribable oppression, which seemed to generate in some unfamiliar part of her consciousness, filled her whole being with a vague anguish. It was like a shadow, like a mist passing across her soul's summer day. It was strange and unfamiliar; it was a mood. She did not sit there inwardly upbraiding her husband, lamenting at Fate, which had directed her footsteps to the path which they had taken. She was just having a good cry all to herself. The mosquitoes made merry over her, biting her firm, round arms and nipping at her bare insteps.",
  "He knew what he was supposed to do. That had been apparent from the beginning. That was what made the choice so difficult. What he was supposed to do and what he would do were not the same. This would have been fine if he were willing to face the inevitable consequences, but he wasn't.",
  "It's always good to bring a slower friend with you on a hike. If you happen to come across bears, the whole group doesn't have to worry. Only the slowest in the group do. That was the lesson they were about to learn that day.",
  `She looked at her student wondering if she could ever get through. "You need to learn to think for yourself," she wanted to tell him. "Your friends are holding you back and bringing you down." But she didn't because she knew his friends were all that he had and even if that meant a life of misery, he would never give them up.`,
];

////// lots of defining  //////////

let timertext = document.querySelector(".curr_time");
let texttotype_text = document.querySelector(".texttotype");
let inputfield = document.querySelector(".inputfield");
let playagain_btn = document.querySelector(".playagain_btn");
let startbtn = document.getElementById("startbtn");
let resumebtn = document.getElementById("resumebtn");
let stopbtn = document.getElementById("stopbtn");

let timeLeft = 60;
let timepassed = 0;
let letterTyped = 0;
let current_texttotype = "";
let texttotypeNo = 0;
let timer = null;

////////////////////////////////////////////////////////////////////
// This is the function to update the para the user is gonna type //
///////////////////////////////////////////////////////////////////

function updatetexttotype() {
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
    }
  });

  if (curr_input.length == current_texttotype.length) {
    updatetexttotype();

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
stopbtn.style.display="none"
  // to display restart button after game ends
  playagain_btn.style.display = "block";
}

////////////////////////////////////////////////////////////////////
//           This is the function to start the game              //
//////////////////////////////////////////////////////////////////

function startgame() {
  resetdata();
  updatetexttotype();
  stopbtn.style.display = "block";

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
}

////////////////////////////////////////////////////////
// this the func to resume game after user stops it  //
//////////////////////////////////////////////////////

function resumegame() {
  updatetexttotype();
  // to hide start btn when the game is going on
  resumebtn.style.display = "none";
  // clear old and start a new timer

  timer = setInterval(updateTimer, 1000);
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
  resumebtn.style.display = "none";
}
