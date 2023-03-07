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
    const url = "./dispatch-report.csv";
    Papa.parse(url, {
        download: true,
        header: true,
        skipEmptyLines: "greedy",
        // dynamicTyping: true,
        error: function (error, data) {
            console.log(error, data);
            Toastify({
                duration: 4000,
                text: "File is empty or file name is wrong.",
                position: "left",
                gravity: "bottom",
                className: "bg-warning",
                style: {
                    opacity: 0.5,
                    background: "#00b09b",
                }
            }).showToast();
            spinner("remove");
        },
        complete: function (results) {
            if (results.data.length !== 0) {
                const uniqueArr = [...new Set(results.data.map(JSON.stringify))].map(JSON.parse);
                // console.log(uniqueArr);
                window.packersData = mapData(uniqueArr);
                calculatePackersData();
            } else {
                Toastify({
                    text: "File is empty or file name is wrong.",
                    className: "info",
                    style: {
                        opacity: 0.5,
                        background: "#00b09b",
                    },
                    position: "left",
                    gravity: "bottom",
                }).showToast();
            }
            spinner('remove');
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