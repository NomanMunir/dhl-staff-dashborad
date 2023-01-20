import {
    breakTimeElem, perfChartCheckboxElem,
    tableCheckboxElem, tableElem,
    uphChartCheckboxElem, fromDateElem,
    fromTimeElem, setDefaultDateTime,
    spinner, toDateElem, toTimeElem, perfChartDiv, uphChartDiv, tableDiv
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
            const uniqueArr = [...new Set(results.data.map(JSON.stringify))].map(JSON.parse);
            window.packersData = mapData(uniqueArr);
            calculatePackersData();
            spinner("remove");
        }
    })
}


const tableCheckboxChangeHandler = (e) => {
    if (!tableCheckboxElem.checked) {
        tableDiv.className = "display-none";
    } else {
        tableDiv.className = "mx-auto my-3 bg-white";
    }
}

const perfChartCheckboxChangeHandler = (e) => {
    console.log(perfChartCheckboxElem.checked);
    if (!perfChartCheckboxElem.checked) {
        perfChartDiv.className = "display-none";
    } else {
        perfChartDiv.className = "mx-auto my-3 bg-white";
    }
}

const uphChartCheckboxChangeHandler = (e) => {
    if (!uphChartCheckboxElem.checked) {
        uphChartDiv.className = "display-none";
    } else {
        uphChartDiv.className = "mx-auto bg-white";
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