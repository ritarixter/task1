import "./index.css";
const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const createTimerAnimator = (seconds) => {
  buttonEl.disabled = true;
  let maxSec = 0;
  let sec = 0;
  let min = 0;
  let hour = 0;
  const interval = 1000;
  let estimated = Date.now() + interval;
  const timer = setTimeout(function func() {
    const drift = Date.now() - estimated;
    if (maxSec >= seconds) {
      buttonEl.disabled = false;
      clearTimeout(timer);
    } else {
      sec++;
      if (sec === 60) {
        min++;
        sec = 0;
      } else if (min === 60) {
        hour++;
        min = 0;
      }
      timerEl.textContent = `${hour < 10 ? "0" + hour : hour}:${
        min < 10 ? "0" + min : min
      }:${sec < 10 ? "0" + sec : sec}`;
      maxSec++;
      estimated += interval;
      setTimeout(func, Math.max(0, interval - drift));
    }
  }, interval);
};

inputEl.addEventListener("input", () => {
  if (inputEl.value.match(/[^0-9]/g)) {
    inputEl.value = inputEl.value.replace(/[^0-9]/g, "");
  }
});

buttonEl.addEventListener("click", () => {
  timerEl.textContent = "00:00:00";
  const seconds = Number(inputEl.value);
  createTimerAnimator(seconds);
  inputEl.value = "";
});
