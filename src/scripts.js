// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// console.log("This is the JavaScript entry file - your code begins here.");
// An example of how you tell webpack to use a JS file
// An example of how you tell webpack to use a CSS file

// Imports
import "normalize.css";
import "./css/styles.css";
// import userData from "./data/users";
import User from "./User";
import UserRepository from "./UserRepository";
import Hydration from "./Hydration";
import Sleep from "./Sleep";
import apiCalls from "./apiCalls";
import chart from "./Chart";

// Query Selectors
const welcomeMessage = document.querySelector("#welcomeMessage");
const userAddress = document.querySelector("#userAddress");
const userEmail = document.querySelector("#userEmail");
const dailySteps = document.querySelector("#dailySteps");
const averageSteps = document.querySelector("#averageSteps");
const dailyIntakeCard = document.querySelector("#dailyIntake");
const weeklyIntakeCard = document.querySelector("#weeklyIntake");
const dailyHoursSlept = document.querySelector("#dailyHoursSlept");
const dailySleepQuality = document.querySelector("#dailyQualityHoursSlept");
const weeklyHoursSlept = document.querySelector("#weeklyHoursSlept");
const weeklySleepQuality = document.querySelector("#weeklyQulaityHoursSlept");
const avgHoursSlept = document.querySelector("#averageSleepHours");
const avgSleepQuality = document.querySelector("#averageSleepQuality");
const userName = document.querySelector("#userName");
const newUserButton = document.querySelector(".main__button");

// Class Instances
let user, userRepo, hydration, sleep;

// Functions
const getRandomIndex = array => {
  return Math.floor(Math.random() * array.length + 1);
};

const fetchApiCalls = () => {
  apiCalls.fetchData().then(data => {
    let userData = data[2].userData;
    let hydrationData = data[0].hydrationData;
    let sleepData = data[1].sleepData;
    let randomUser = getRandomIndex(userData);
    userRepo = new UserRepository(userData);
    user = new User(userRepo.findUser(randomUser));
    hydration = new Hydration(user.id, hydrationData);
    sleep = new Sleep(user.id, sleepData);
    loadPage();
  });
};

const loadPage = () => {
  displayUserCard();
  welcomeUser();
  displayAverageStepGoal();
  displayDailyStepGoal();
  displayDailyIntake();
  displayDailySleepHours();
  displayQualitySleep();
  displayAverageQuality();
  displayAverageHoursSlept();
  displayHydrationChart();
  displaySleepChart();
};

const refreshPage = () => {
  window.location.reload();
};

const welcomeUser = () => {
  welcomeMessage.innerHTML = `Hello ${user.returnFirstName()}! Welcome to HealthHub!`;
};

const displayUserCard = () => {
  userName.innerHTML = `${user.name}`;
  userAddress.innerHTML = `${user.address}`;
  userEmail.innerHTML = `${user.email}`;
};

const displayAverageStepGoal = () => {
  let averageUserSteps = userRepo.averageStepGoal();
  averageSteps.innerHTML = `${averageUserSteps}`;
};
const displayDailyStepGoal = () => {
  dailySteps.innerHTML = `${user.dailyStepGoal}`;
};

const displayDailyIntake = () => {
  let dailyIntake = hydration.returnDailyOunces(hydration.date);
  dailyIntakeCard.innerHTML = `${dailyIntake} oz.`;
};

const displayDailyOunces = () => {
  let weeklyIntake = hydration.returnWeeklyOunces(hydration.date);
  weeklyIntake.forEach(entry => {
    const singleEntry = `<br/>
    <br/>
    Date: ${entry.date}
    <br/>
    <br/>
    Amount: ${entry.numOunces} oz.`;
    weeklyIntakeCard.innerHTML += singleEntry;
  });
};

const displayDailySleepHours = () => {
  let dailySleep = sleep.calculateSleptHoursPerDay(sleep.date);
  dailyHoursSlept.innerHTML = `${dailySleep}`;
};

const displayQualitySleep = () => {
  let dailyQuality = sleep.calculateSleepQualityPerDay(sleep.date);
  dailySleepQuality.innerHTML = `${dailyQuality}`;
};

const displayWeeklySleepHours = () => {
  let weeklySleep = sleep.calculateSleptHoursPerDayPerWeek(sleep.date);
  weeklySleep.forEach(entry => {
    const singleEntry = `<br/>
    <br/>
    Date: ${entry.date}
    <br/>
    <br/>
    Hours: ${entry.hoursSlept}`;
    weeklyHoursSlept.innerHTML += singleEntry;
  });
};

const displayWeeklyQuality = () => {
  let weeklyQuality = sleep.calculateSleepQualityPerDayPerWeek(sleep.date);
  weeklyQuality.forEach(entry => {
    const singleEntry = `<br/>
    <br/>
    Date: ${entry.date}
    <br/>
    <br/>
    Quality Hours: ${entry.sleepQuality}`;
    weeklySleepQuality.innerHTML += singleEntry;
  });
};

const displayAverageQuality = () => {
  let averageQuality = sleep.calculateAvgSleepQualityAllUsers();
  avgSleepQuality.innerHTML = `${averageQuality}`;
};

const displayAverageHoursSlept = () => {
  let averageHoursSlept = sleep.calculateAvgHoursSleptAllUsers();
  avgHoursSlept.innerHTML = `${averageHoursSlept}`;
};

const displayHydrationChart = () => {
  let weeklyIntakeData = hydration.returnWeeklyOunces(hydration.date);
  chart.horizontalBar(weeklyIntakeData);
};

const displaySleepChart = () => {
  let hours = sleep.calculateSleptHoursPerDayPerWeek(sleep.date);
  let quality = sleep.calculateSleepQualityPerDayPerWeek(sleep.date);
  chart.groupedBar(hours, quality);
};
// Event Linsteners
window.addEventListener("load", fetchApiCalls);
newUserButton.addEventListener("click", refreshPage);
