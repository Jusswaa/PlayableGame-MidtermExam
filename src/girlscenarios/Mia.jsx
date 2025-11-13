import miaImg from '../assets/mia.png';
import parkBg from '../assets/park_bg.jpg';
import movieBg from '../assets/movie_bg.jpg';

const Mia = () => ({
  mia_intro: {
    title: "Mia - The Playful Spirit",
    text: ["Mia waves at you excitedly.", "She asks if you want to hang out in the park."],
    img: miaImg,
    bg: parkBg,
    choices: [
      { text: "Go to park", next: "mia_park", effects: { affection: { Mia: 2 } } },
      { text: "Skip today", next: "mia_ignore" }
    ]
  },
  mia_park: {
    title: "Park Fun",
    text: ["You play games and joke around.", "Mia laughs at your antics."],
    img: miaImg,
    bg: parkBg,
    choices: [
      { text: "Invite to movie night", next: "mia_movie", effects: { affection: { Mia: 1 } } },
      { text: "Return to campus", next: "campus_choice" }
    ]
  },
  mia_movie: {
    title: "Movie Night",
    text: ["Watching the movie, Mia leans closer.", "You feel sparks of excitement."],
    img: miaImg,
    bg: movieBg,
    choices: [
      { text: "Return to campus", next: "campus_choice" }
    ]
  },
  mia_ignore: {
    title: "Mia Notices",
    text: ["Mia pouts and plays with her phone.", "You feel a bit distant from her."],
    img: miaImg,
    bg: parkBg,
    choices: [
      { text: "Return to campus", next: "campus_choice" }
    ]
  },
  mia_end: {
    title: "Ending with Mia",
    text: (stats) => stats.affection.Mia >= 4
      ? ["Romantic ending with Mia!", "You and Mia share laughter and memories in the park."]
      : ["Mia remains playful but distant."],
    choices: [{ text: "Return to Menu", next: "start" }]
  }
});

export default Mia;
