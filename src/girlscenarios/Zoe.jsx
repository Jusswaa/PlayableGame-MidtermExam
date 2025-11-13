import zoeImg from '../assets/zoe.png';
import sportsBg from '../assets/sports_bg.jpg';
import libraryBg from '../assets/library_bg.jpg';
import cafeBg from '../assets/cafe_bg.jpg';

const Zoe = () => ({
  zoe_intro: {
    title: "Zoe - The Mischievous One",
    text: ["Zoe smirks at you.", "She dares you to join her in a fun challenge."],
    img: zoeImg,
    bg: sportsBg,
    choices: [
      { text: "Accept challenge", next: "zoe_sports", effects: { affection: { Zoe: 2 } }, timed: true, timeLimit: 8 },
      { text: "Decline", next: "zoe_ignore" }
    ]
  },
  zoe_sports: {
    title: "Sports Field Challenge",
    text: ["You both run around and compete.", "Zoe laughs, impressed with your energy."],
    img: zoeImg,
    bg: sportsBg,
    choices: [
      { text: "Go to library to study", next: "zoe_library", effects: { affection: { Zoe: 1 } } },
      { text: "Return to campus", next: "campus_choice" }
    ]
  },
  zoe_library: {
    title: "Library Study with Zoe",
    text: ["Zoe surprisingly focuses well on her notes.", "You get closer during study."],
    img: zoeImg,
    bg: libraryBg,
    choices: [
      { text: "Invite to cafe", next: "zoe_cafe", effects: { affection: { Zoe: 1 } } },
      { text: "Return to campus", next: "campus_choice" }
    ]
  },
  zoe_cafe: {
    title: "Cafe Hangout",
    text: ["Sipping coffee, Zoe shares funny stories.", "You feel more connected."],
    img: zoeImg,
    bg: cafeBg,
    choices: [
      { text: "Return to campus", next: "campus_choice" }
    ]
  },
  zoe_ignore: {
    title: "Zoe Notices",
    text: ["Zoe rolls her eyes and walks away.", "You feel you lost a fun opportunity."],
    img: zoeImg,
    bg: sportsBg,
    choices: [
      { text: "Return to campus", next: "campus_choice" }
    ]
  },
  zoe_end: {
    title: "Ending with Zoe",
    text: (stats) => stats.affection.Zoe >= 4
      ? ["Romantic ending with Zoe!", "You and Zoe laugh together, sharing mischief and fun."]
      : ["Zoe teases you but keeps her distance."],
    choices: [{ text: "Return to Menu", next: "start" }]
  }
});

export default Zoe;
