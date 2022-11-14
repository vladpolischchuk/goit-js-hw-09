import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Будь ласка, виберіть дату в майбутньому');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};


const text = document.querySelector('#datetime-picker');
const timer = document.querySelector('.timer');
const startButton = document.querySelector('button[data-start]');
const seconds = document.querySelector('span[data-seconds]');
const minutes = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
const days = document.querySelector('span[data-days]');

startButton.disabled = true;

flatpickr(text, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};

startButton.addEventListener('click', () => {
  let counter = setInterval(() => {
    let countdown = new Date(text.value) - new Date();
    startButton.disabled = true;

    if (countdown >= 0) {
      let timeObj = convertMs(countdown);

      days.textContent = addLeadingZero(timeObj.days);
      hours.textContent = addLeadingZero(timeObj.hours);
      minutes.textContent = addLeadingZero(timeObj.minutes);
      seconds.textContent = addLeadingZero(timeObj.seconds);

      if (countdown <= 10000) {
        timer.style.color = 'red';
      }
    } else {
      Notiflix.Notify.success('Зворотний відлік завершено');
      timer.style.color = 'black';
      clearInterval(timer);
    }
  }, 1000);
});