import {
    breakTimeElem, perfChartCheckboxElem,
    tableCheckboxElem, tableElem,
    uphChartCheckboxElem, fromDateElem,
    fromTimeElem, setDefaultDateTime,
    spinner, toDateElem, toTimeElem
} from "./UI/elements.js";
import { calculatePackersData, mapData } from "./scripts/helpers.js";


const parseData = () => {
    setDefaultDateTime();
    spinner("add");
    const url = "/personal/nauman_munir_dhl_com/Documents/dhl-staff-dashborad/test.csv";
    Papa.parse(url, {
        download: true,
        header: true,
        skipEmptyLines: "greedy",
        dynamicTyping: true,
        error: function (error, data) {
            alert('File not found!');
            console.log(error, data);
            spinner("remove");
        },
        complete: function (results) {
            console.log(results);
            window.packersData = mapData(results.data);
            calculatePackersData();
            spinner("remove");
        }
    })
}


const tableCheckboxChangeHandler = (e) => {
    if (!tableCheckboxElem.checked) {
        tableElem.className = "display-none";
    } else {
        tableElem.className = "mx-auto my-3 bg-white";
    }
}

const perfChartCheckboxChangeHandler = (e) => {
    if (!perfChartCheckboxElem.checked) {
        perfChartCheckboxElem.className = "display-none";
    } else {
        perfChartCheckboxElem.className = "mx-auto my-3 bg-white";
    }
}

const uphChartCheckboxChangeHandler = (e) => {
    if (!uphChartCheckboxElem.checked) {
        uphChartCheckboxElem.className = "display-none";
    } else {
        uphChartCheckboxElem.className = "mx-auto bg-white";
    }
}

const breakTimeFilterChangeHandler = (e) => {
    if (e.key == "Enter") {
        console.log("filter Break")
        calculatePackersData();
        breakTimeElem.value = "";
    }
}

const dateChangeHandler = (e) => {
    calculatePackersData();
    console.log("DateChange");
    if (e.key == "Enter") {
    }
}

breakTimeElem.addEventListener('keypress', breakTimeFilterChangeHandler)
perfChartCheckboxElem.addEventListener('change', perfChartCheckboxChangeHandler);
tableCheckboxElem.addEventListener('change', tableCheckboxChangeHandler);
uphChartCheckboxElem.addEventListener('change', uphChartCheckboxChangeHandler);
fromDateElem.addEventListener('change', dateChangeHandler);
fromTimeElem.addEventListener('change', dateChangeHandler);
toDateElem.addEventListener('change', dateChangeHandler);
toTimeElem.addEventListener('change', dateChangeHandler);

document.addEventListener("DOMContentLoaded", () => {
    parseData();
});