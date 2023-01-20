export const spinnerElem = document.querySelector('.spinner');
export const fromDateElem = document.querySelector("#from-date");
export const toDateElem = document.querySelector("#to-date");
export const fromTimeElem = document.querySelector("#from-time");
export const toTimeElem = document.querySelector("#to-time");
export const titleDate = document.querySelector(".titleDate");
export const breakTimeElem = document.querySelector("#break-time");
export const tableElem = document.querySelector("#table");

// -----------------------------------spinners------------------------------------ //

export const spinner = (value) => {
	if (value == "add") {
		spinnerElem.innerHTML = `
		<div class="spinner-border text-warning" role="status">
		<span class="sr-only"></span>
		</div>`
	} else if (value == "remove") {
		spinnerElem.innerHTML = '';
	} else {
		return
	}
};

export const fromDate = () => {
	const date = new Date(`${fromDateElem.value} ${fromTimeElem.value}`);
	return date;
}

export const toDate = () => {
	const date = new Date(`${toDateElem.value} ${toTimeElem.value}`);
	return date;
}
// --------------------Setting previous month as a default month------------------------------ //

export const setDefaultDateTime = () => {
	const current = new Date();
	toDateElem.value = current.toISOString().substring(0, 10);
	toTimeElem.value = current.toISOString().substring(11, 16);
	//setting date to previews date
	current.setDate(current.getDate() - 1);
	fromDateElem.value = current.toISOString().substring(0, 10);
	fromTimeElem.value = current.toISOString().substring(11, 16);
}

// -----------------------------------Check Boxes Elements---------------------------------- //
export const perfChartCheckboxElem = document.querySelector('#perf-chart-checkbox');
export const uphChartCheckboxElem = document.querySelector('#uph-chart-checkbox');
export const tableCheckboxElem = document.querySelector('#table-checkbox');
export const perfChartDiv = document.querySelector("#perf-charts")
export const tableDiv = document.querySelector("#table")
export const uphChartDiv = document.querySelector("#uph-charts")


