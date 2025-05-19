// Установка целевой даты - 8 июня 2025 года
const targetDate = new Date(2025, 5, 8, 0, 0, 0);
const startDate = new Date(2025, 3, 22, 0, 0, 0); // Дата начала отсчёта (текущая дата)

// Обновляем отображение целевой даты
document.getElementById("target-date-display").textContent =
  targetDate.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

document.getElementById("bilets-date-display").textContent =
  startDate.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// Элементы для анимации
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const progressBar = document.getElementById("progress-bar");

// Состояние предыдущих значений
let prevDays, prevHours, prevMinutes, prevSeconds;

function updateTimer() {
  const now = new Date();
  const totalDuration = targetDate - startDate;
  const remainingTime = targetDate - now;

  // Рассчёт прогресса (в процентах)
  const progress = Math.min(100 - (remainingTime / totalDuration) * 100, 100);
  progressBar.style.width = `${progress}%`;

  if (remainingTime <= 0) {
    // Если время истекло
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    progressBar.style.width = "100%";
    return;
  }

  // Рассчёт дней, часов, минут и секунд
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  // Анимация при изменении значений
  if (days !== prevDays) {
    daysElement.textContent = days.toString().padStart(2, "0");
    daysElement.classList.add("animate");
    setTimeout(() => daysElement.classList.remove("animate"), 500);
  }

  if (hours !== prevHours) {
    hoursElement.textContent = hours.toString().padStart(2, "0");
    hoursElement.classList.add("flip-animate");
    setTimeout(() => hoursElement.classList.remove("flip-animate"), 600);
  }

  if (minutes !== prevMinutes) {
    minutesElement.textContent = minutes.toString().padStart(2, "0");
    minutesElement.classList.add("animate");
    setTimeout(() => minutesElement.classList.remove("animate"), 500);
  }

  if (seconds !== prevSeconds) {
    secondsElement.textContent = seconds.toString().padStart(2, "0");
    secondsElement.classList.add("flip-animate");
    setTimeout(() => secondsElement.classList.remove("flip-animate"), 600);
  }

  // Сохраняем текущие значения для следующего сравнения
  prevDays = days;
  prevHours = hours;
  prevMinutes = minutes;
  prevSeconds = seconds;
}

// Инициализация
updateTimer();
setInterval(updateTimer, 1000);

