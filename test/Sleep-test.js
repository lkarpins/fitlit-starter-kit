import { expect } from "chai";
import Sleep from "../src/Sleep";
const sampleSleepData = require("../src/data/sample-sleep-data");

describe("Sleep", () => {
  let user1Sleep;
  let user2Sleep;
  beforeEach(() => {
    user1Sleep = new Sleep(1, sampleSleepData);
    user2Sleep = new Sleep(2, sampleSleepData);
  });

  it("should be a function", () => {
    expect(Sleep).to.be.a("function");
  });

  it("should be an instance of Sleep", () => {
    expect(user1Sleep).to.be.an.instanceof(Sleep);
    expect(user2Sleep).to.be.an.instanceof(Sleep);
  });

  it("should be able to store a user id", () => {
    expect(user1Sleep.userID).to.equal(1);
    expect(user2Sleep.userID).to.equal(2);
  });

  it("should be able to store a date", () => {
    expect(user1Sleep.date).to.equal("2019/06/28");
    expect(user2Sleep.date).to.equal("2019/06/28");
  });

  it("should be able to store hours slept", () => {
    expect(user1Sleep.hoursSlept).to.equal(7.6);
    expect(user2Sleep.hoursSlept).to.equal(5.2);
  });

  it("should be able to store sleep quality ", () => {
    expect(user1Sleep.sleepQuality).to.equal(4.7);
    expect(user2Sleep.sleepQuality).to.equal(4.9);
  });

  it("should be able to return the average hours of sleep per day", () => {
    const avgSleepPerDay1 = user1Sleep.calculateAvgSleepPerDay();
    const avgSleepPerDay2 = user2Sleep.calculateAvgSleepPerDay();

    expect(avgSleepPerDay1).to.equal(7.8);
    expect(avgSleepPerDay2).to.equal(8);
  });

  it("should be able to return the average quality of sleep per day", () => {
    const avgSleepQualityPerDay1 = user1Sleep.calculateAvgSleepQualityPerDay();
    const avgSleepQualityPerDay2 = user2Sleep.calculateAvgSleepQualityPerDay();

    expect(avgSleepQualityPerDay1).to.equal(2.8);
    expect(avgSleepQualityPerDay2).to.equal(3.1);
  });

  it("should be able to return how many hours a user slept for a specific day", () => {
    const sleptHoursPerDay1 = user1Sleep.calculateSleptHoursPerDay(
      "2019/06/16"
    );
    const sleptHoursPerDay2 = user2Sleep.calculateSleptHoursPerDay(
      "2019/06/16"
    );

    expect(sleptHoursPerDay1).to.equal(4.1);
    expect(sleptHoursPerDay2).to.equal(7.5);
  });

  it("should be able to return the sleep quality for a specific day", () => {
    const sleepQualityPerDay1 = user1Sleep.calculateSleepQualityPerDay(
      "2019/06/16"
    );
    const sleepQualityPerDay2 = user2Sleep.calculateSleepQualityPerDay(
      "2019/06/16"
    );

    expect(sleepQualityPerDay1).to.equal(3.8);
    expect(sleepQualityPerDay2).to.equal(3.8);
  });

  it("should be able to return how many hours slept over the course of a given week", () => {
    const sleptHoursPerDayPerWeek1 = user1Sleep.calculateSleptHoursPerDayPerWeek(
      "2019/06/22"
    );
    const sleptHoursPerDayPerWeek2 = user2Sleep.calculateSleptHoursPerDayPerWeek(
      "2019/06/22"
    );

    expect(sleptHoursPerDayPerWeek1).to.deep.equal({
      date: [
        "2019/06/16",
        "2019/06/17",
        "2019/06/18",
        "2019/06/19",
        "2019/06/20",
        "2019/06/21",
        "2019/06/22"
      ],
      hoursSlept: [4.1, 8, 10.4, 10.7, 9.3, 7.8, 7]
    });
    expect(sleptHoursPerDayPerWeek2).to.deep.equal({
      date: [
        "2019/06/16",
        "2019/06/17",
        "2019/06/18",
        "2019/06/19",
        "2019/06/20",
        "2019/06/21",
        "2019/06/22"
      ],
      hoursSlept: [7.5, 5.7, 10.8, 9.6, 10.1, 4.3, 4.8]
    });
  });

  it("should be able to return how many hours slept each day over the course of a different week", () => {
    const sleptHoursPerDayPerWeek1 = user1Sleep.calculateSleptHoursPerDayPerWeek(
      "2019/06/28"
    );
    const sleptHoursPerDayPerWeek2 = user2Sleep.calculateSleptHoursPerDayPerWeek(
      "2019/06/28"
    );
    expect(sleptHoursPerDayPerWeek1).to.deep.equal({
      date: [
        "2019/06/22",
        "2019/06/23",
        "2019/06/24",
        "2019/06/25",
        "2019/06/26",
        "2019/06/27",
        "2019/06/28"
      ],
      hoursSlept: [7, 7.8, 8, 5.1, 7.7, 9.4, 7.6]
    });
    expect(sleptHoursPerDayPerWeek2).to.deep.equal({
      date: [
        "2019/06/22",
        "2019/06/23",
        "2019/06/24",
        "2019/06/25",
        "2019/06/26",
        "2019/06/27",
        "2019/06/28"
      ],
      hoursSlept: [4.8, 8, 10.8, 9.7, 9.3, 9, 5.2]
    });
  });

  it("should be able to return their sleep quality each day over the course of a given week", () => {
    const sleepQualityPerDayPerWeek1 = user1Sleep.calculateSleepQualityPerDayPerWeek(
      "2019/06/22"
    );
    const sleepQualityPerDayPerWeek2 = user2Sleep.calculateSleepQualityPerDayPerWeek(
      "2019/06/22"
    );
    expect(sleepQualityPerDayPerWeek1).to.deep.equal({
      date: [
        "2019/06/16",
        "2019/06/17",
        "2019/06/18",
        "2019/06/19",
        "2019/06/20",
        "2019/06/21",
        "2019/06/22"
      ],
      sleepQuality: [3.8, 2.6, 3.1, 1.2, 1.2, 4.2, 3]
    });
    expect(sleepQualityPerDayPerWeek2).to.deep.equal({
      date: [
        "2019/06/16",
        "2019/06/17",
        "2019/06/18",
        "2019/06/19",
        "2019/06/20",
        "2019/06/21",
        "2019/06/22"
      ],
      sleepQuality: [3.8, 3, 3.2, 2.5, 2.4, 4.8, 3.3]
    });
  });

  it("should be able to return the quality of sleep each day over the course of a different week", () => {
    const sleepQualityPerDayPerWeek1 = user1Sleep.calculateSleepQualityPerDayPerWeek(
      "2019/06/28"
    );
    const sleepQualityPerDayPerWeek2 = user2Sleep.calculateSleepQualityPerDayPerWeek(
      "2019/06/28"
    );
    expect(sleepQualityPerDayPerWeek1).to.deep.equal({
      date: [
        "2019/06/22",
        "2019/06/23",
        "2019/06/24",
        "2019/06/25",
        "2019/06/26",
        "2019/06/27",
        "2019/06/28"
      ],
      sleepQuality: [3, 1.5, 1.3, 3.7, 2.4, 4.6, 4.7]
    });
    expect(sleepQualityPerDayPerWeek2).to.deep.equal({
      date: [
        "2019/06/22",
        "2019/06/23",
        "2019/06/24",
        "2019/06/25",
        "2019/06/26",
        "2019/06/27",
        "2019/06/28"
      ],
      sleepQuality: [3.3, 4.9, 1, 1.3, 2.6, 1.3, 4.9]
    });
  });

  it("should be able to return the average sleep quality for all users", () => {
    const avgSleepQualityAllUsers1 = user1Sleep.calculateAvgSleepQualityAllUsers();
    expect(avgSleepQualityAllUsers1).to.equal(3);
  });

  it("should be able to return the average hours slept for all users", () => {
    const avgHoursSleptAllUsers1 = user1Sleep.calculateAvgHoursSleptAllUsers();
    expect(avgHoursSleptAllUsers1).to.equal(7.9);
  });
});
