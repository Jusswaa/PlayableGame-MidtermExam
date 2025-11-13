import emmaImg from '../assets/emma.png';
import campusBg from '../assets/campus_bg.jpg';
import cafeBg from '../assets/cafe_bg.jpg';
import libraryBg from '../assets/library_bg.jpg';
import parkBg from '../assets/park_bg.jpg';

const Emma = () => ({
  emma_intro: {
    title: "Emma - The Kind Soul",
    text: ["Emma smiles warmly.", "She invites you for coffee after class."],
    img: emmaImg,
    bg: campusBg,
    choices: [
      { text: "Join her", next: "emma_coffee", effects: { affection: { Emma: 2 } } },
      { text: "Decline politely", next: "emma_ignore" }
    ]
  },
  emma_coffee: {
    title: "Coffee Time",
    text: ["You share coffee and laugh together.", "Emma seems happy to have your company."],
    img: emmaImg,
    bg: cafeBg,
    choices: [
      { text: "Go to library to study", next: "emma_library", effects: { affection: { Emma: 1 } } },
      { text: "Return to campus", next: "campus_choice" }
    ]
  },
  emma_library: {
    title: "Library Study",
    text: ["Studying together, you get closer.", "Emma shares some personal stories."],
    img: emmaImg,
    bg: libraryBg,
    choices: [
      { text: "Invite to park", next: "emma_park", effects: { affection: { Emma: 1 } } },
      { text: "Return to campus", next: "campus_choice" }
    ]
  },
  emma_park: {
    title: "Park Stroll",
    text: ["Walking together in the park, the mood is light and friendly.", "You feel a warm connection."],
    img: emmaImg,
    bg: parkBg,
    choices: [
      { text: "Return to campus", next: "campus_choice" }
    ]
  },
  emma_ignore: {
    title: "Emma Notices",
    text: ["Emma looks disappointed but continues her day.", "You feel a missed opportunity."],
    img: emmaImg,
    bg: campusBg,
    choices: [
      { text: "Return to campus", next: "campus_choice" }
    ]
  },
  emma_end: {
    title: "Ending with Emma",
    text: (stats) => stats.affection.Emma >= 4
      ? ["Romantic ending with Emma!", "You and Emma enjoy a memorable day together."]
      : ["Emma appreciates your company but remains focused on her studies."],
    choices: [{ text: "Return to Menu", next: "start" }]
  }
});

export default Emma;
