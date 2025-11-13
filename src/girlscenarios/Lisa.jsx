import lisaImg from '../assets/lisa.png';
import libraryBg from '../assets/library_bg.jpg';
import cafeBg from '../assets/cafe_bg.jpg';
import rooftopBg from '../assets/rooftop_bg.jpg';

const Lisa = () => ({
  lisa_intro: {
    title: "Lisa - The Ambitious Leader",
    text: ["Lisa greets you with a confident smile.", "She suggests working on a project together."],
    img: lisaImg,
    bg: libraryBg,
    choices: [
      { text: "Accept the project", next: "lisa_project", effects: { affection: { Lisa: 2 } } },
      { text: "Decline politely", next: "lisa_ignore" }
    ]
  },
  lisa_project: {
    title: "Project Collaboration",
    text: ["You spend hours planning the project.", "Lisa is impressed with your ideas."],
    img: lisaImg,
    bg: cafeBg,
    choices: [
      { text: "Invite Lisa to rooftop view", next: "lisa_rooftop", effects: { affection: { Lisa: 1 } } },
      { text: "Return to campus", next: "campus_choice" }
    ]
  },
  lisa_rooftop: {
    title: "Rooftop View",
    text: ["Lisa shares her ambitions.", "You admire her determination."],
    img: lisaImg,
    bg: rooftopBg,
    choices: [
      { text: "Return to campus", next: "campus_choice" }
    ]
  },
  lisa_ignore: {
    title: "Lisa Notices",
    text: ["Lisa frowns but continues her work.", "You feel you missed an opportunity."],
    img: lisaImg,
    bg: libraryBg,
    choices: [
      { text: "Return to campus", next: "campus_choice" }
    ]
  },
  lisa_end: {
    title: "Ending with Lisa",
    text: (stats) => stats.affection.Lisa >= 4
      ? ["Romantic ending with Lisa!", "You and Lisa celebrate your successful project together."]
      : ["Lisa appreciates your help but keeps focused on her goals."],
    choices: [{ text: "Return to Menu", next: "start" }]
  }
});

export default Lisa;
