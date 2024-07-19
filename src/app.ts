/* import gsap from 'gsap';
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(Flip,ScrollTrigger,ScrollToPlugin,TextPlugin);
gsap.set(".link-card", { y: 30, opacity: 0 });
gsap.to(".link-card", {
  scrollTrigger: {
    trigger: ".link-card",
    end: "top 20%",
    scrub: true,
    start: "top center",
    toggleActions: "play none none none",
  },
  y: 0,
  opacity: 1,
  duration: 1,
  stagger: 0.2,
});

gsap.fromTo(
  ".a-text",
  {
    autoAlpha: 0,
    y: 0,
  },
  {
    autoAlpha: 1,
    duration: 1,
    scrollTrigger: {
      trigger: ".a-text",
      start: "top center",
      markers: true,
      toggleActions: "restart none none none",
      scrub: true,
    },
    stagger: 0.2,
  },
);

// animate titles on landing page
let titles = [];
for (let i = 0; i < 4; i++) {
  let id = "title" + i;
  titles.push(document.getElementById(id));
}
console.log(titles)

titles.forEach((title) => {
  // now reverse
  gsap.to(`#${title.id}`, {
    duration: 1.5,
    text: title.innerText.split("").reverse().join(""),
    ease: "none",
  });
}); */