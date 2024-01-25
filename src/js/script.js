"use strict";

import statsData from "../../data.json";

// ELEMENT/S
const categoriesLinkEl = document.querySelector(".dashboard__date-category");
const allCategoriesLinkEl = document.querySelectorAll(".link");
const allDurationTagEl = document.querySelectorAll(".duration-tag");
const totalDurationEl = document.querySelectorAll(".total");
const previousDurationEl = document.querySelectorAll(".duration__present");

// FUNCTION/S
function abbreviationFormat(number) {
	// -- If the number(time) is > 1, return "hrs". Else, return "hr"
	return number > 1 ? "hrs" : "hr";
}

function displayStats(timeframe, tagLabel) {
	// -- Loop through statsData array
	statsData.forEach((_, i) => {
		// -- Get timeframes from each array element
		const { timeframes } = statsData[i];
		// -- Destructure the timeframes and make a new object called stats
		const { [timeframe]: stats } = timeframes;

		// -- Get current and previous timeframe from stats object
		const { current, previous } = stats;

		// -- Update UI timeframes
		totalDurationEl[i].textContent = `${current}${abbreviationFormat(current)}`;
		previousDurationEl[i].textContent = `${previous}${abbreviationFormat(
			previous
		)}`;

		// -- Update UI tag
		allDurationTagEl[i].textContent = tagLabel;
	});
}

function showDailyStats() {
	displayStats("daily", "Last Day");
}

function showWeeklyStats() {
	displayStats("weekly", "Last Week");
}

function showMonthlyStats() {
	displayStats("monthly", "Last Month");
}

function timeType(timeCategory) {
	// -- Show statistics depending on time type
	switch (timeCategory) {
		case "daily":
			showDailyStats();
			break;
		case "weekly":
			showWeeklyStats();
			break;
		case "monthly":
			showMonthlyStats();
			break;
		default:
			return null;
	}
}

// EVENT-LISTENER/S
categoriesLinkEl.addEventListener("click", (e) => {
	// -- Get clicked time category
	const clickedElement = e.target.closest(".link");

	// -- If user did not click a time category, exit
	if (!clickedElement) return;

	// -- Get dataset of all data-x attributes
	const datasetOfClickedElement = clickedElement.dataset;

	// -- Get time category type of the data-id attribute
	const timeCategory = datasetOfClickedElement.id;

	// -- Invoke timeType function using timeCategory
	timeType(timeCategory);

	// -- Remove the "link-active" class from all time category element
	allCategoriesLinkEl.forEach((category) => {
		category.classList.remove("link-active");
	});

	// -- Add the "link-active" class to the clicked time category element
	clickedElement.classList.add("link-active");
});
