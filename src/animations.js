import Typed from "typed.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { MotionPathPlugin } from "gsap/all";
import Lenis from "@studio-freight/lenis";
import { camera, globe } from "./3d-scene";

let vw = (multiplier) => window.innerWidth * (multiplier / 100);
let vh = (multiplier) => window.innerHeight * (multiplier / 100);

export function initAnimations() {
	gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

	ScrollTrigger.defaults({
		markers: false,
	});

	smoothScroll();
	colorAnims();
	typeAnims();
	sectionTitleAnims();
	sectionBackgroundAnims();
}

// Smooth scrolling

function smoothScroll() {
	const lenis = new Lenis();

	lenis.on("scroll", ScrollTrigger.update);

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});

	gsap.ticker.lagSmoothing(0);
}

// Color changes

function colorAnims() {
	const welcomeBanner = document.getElementById("welcome-banner");

	gsap.to(welcomeBanner, {
		scrollTrigger: {
			trigger: "#welcome-banner",
			start: "top top",
			end: "5% top",
			scrub: 1,
		},
		"background-color": "#262626",
	});
}

// Typing

function typeAnims() {
	const welcomeTextType = new Typed("#welcome-text", {
		strings: ["welcome", "selamat datang", "bienvenue", "مرحباً"],
		loop: true,
		typeSpeed: 80,
		backSpeed: 80,
		backDelay: 1000,
		showCursor: true,
		cursorChar: "l",
	});
}

// Section titles

function sectionTitleAnims() {
	let section_titles = document.querySelectorAll(".section-title path");

	for (let i = 0; i < section_titles.length; i++) {
		section_titles[i].setAttribute(
			"style",
			`stroke-width: 0.5; stroke: #262626; stroke-dasharray: ${section_titles[
				i
			]
				.getTotalLength()
				.toFixed(2)}px; stroke-dashoffset: ${section_titles[i]
				.getTotalLength()
				.toFixed(2)}px; fill: transparent`,
		);
	}

	let about_letters = document.querySelectorAll("#about-title path");

	for (let i = 0; i < about_letters.length; i++) {
		gsap.to(about_letters[i], {
			scrollTrigger: {
				id: "about_outline",
				trigger: "#about-section",
				start: "top 80%",
				end: "60% bottom",
				scrub: 1,
			},
			"stroke-dashoffset": 0,
		});

		gsap.to(about_letters[i], {
			scrollTrigger: {
				id: "about_fade",
				trigger: "#about-section",
				toggleActions: "play none none reverse",
				start: "60% bottom",
			},
			fill: "white",
		});
	}

	let projects_letters = document.querySelectorAll("#projects-title path");

	for (let i = 0; i < projects_letters.length; i++) {
		gsap.to(projects_letters[i], {
			scrollTrigger: {
				id: "projects_outline",
				trigger: "#projects-section",
				start: "top 80%",
				end: "60% bottom",
				scrub: 1,
			},
			// "stroke-dashoffset": 0,
		});

		gsap.to(projects_letters[i], {
			scrollTrigger: {
				id: "projects_fade",
				trigger: "#projects-section",
				toggleActions: "play none none reverse",
				start: "60% bottom",
			},
			// fill: "white",
		});
	}
}

// Section backgrounds

function sectionBackgroundAnims() {
	gsap.to(document.getElementById("bg-dots"), {
		scrollTrigger: {
			trigger: "#about-section",
			start: "top bottom",
			end: "bottom top",
			scrub: 0,
		},
		left: 0,
		top: 0,
	});

	gsap.to(document.getElementById("bg-waves-1"), {
		scrollTrigger: {
			trigger: "#projects-section",
			start: "top bottom",
			end: "bottom top",
			scrub: 1,
		},
		left: "0%",
	});

	gsap.to(document.getElementById("bg-waves-2"), {
		scrollTrigger: {
			trigger: "#projects-section",
			start: "top bottom",
			end: "bottom top",
			scrub: 1,
		},
		left: "-10%",
	});
}
