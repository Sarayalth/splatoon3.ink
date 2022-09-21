import RegularGearTweet from "./generators/RegularGearTweet.mjs";
import SchedulesTweet from "./generators/SchedulesTweet.mjs";
import TwitterManager from "./TwitterManager.mjs"

export function defaultTwitterManager() {
  return new TwitterManager([
    new SchedulesTweet,
    new RegularGearTweet,
  ]);
}

export function sendTweets() {
  return defaultTwitterManager().sendTweets();
}

export function testTweets() {
  return defaultTwitterManager().testTweets();
}
