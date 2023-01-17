import { config } from "../config.js";
import { fromDate, spinner, toDate } from "../UI/elements.js";
import { makeTable } from "../UI/table.js";
import { charts } from "./charts.js";

export const mapData = (data) => {
    const result = data.map(data => ({
        awb: data['Airway bill no'],
        rawb: data['Return airway bill no'],
        city: data['City'],
        item: data['Item'],
        orderId: data['Order ID'],
        orderNumber: data['Order Number'],
        orderType: data['Order type'],
        packId: data['Pack id'],
        packedBy: data['Packed by'],
        location: data['Packing location'],
        tour: data['acc. country'],
        packingEnd: `${data['Packing End']}`
    }))
    return result;
}

export const calculatePackersData = () => {
    const sortedData = packersData.sort((a, b) => {
        return new Date(a['packingEnd']) - new Date(b['packingEnd'])
    })
    const filteredData = sortedData.filter(order => {
        const packageDate = new Date(order['packingEnd']);
        // console.log(packageDate, order['packingEnd'], order['item'], "  ", fromDate);
        return packageDate >= fromDate() && packageDate <= toDate()
    })
    const packersDataGroupByNames = filteredData.reduce((acc, order) => {
        const packLocation = order['location'].toLowerCase().substr(0, 4).trim();
        const packerName = config[packLocation];
        const orders = order['orderNumber'];
        if (packerName) {
            acc[packerName] = acc[packerName] || {};
            acc[packerName]["items"] = acc[packerName]["items"] || [];
            acc[packerName]['orders'] = acc[packerName]['orders'] || {};
            acc[packerName]['orders'][orders] = acc[packerName]['orders'][orders] || []
            if (acc[packerName]['orders'][orders].length <= 100) {
                acc[packerName]['orders'][orders].push(order);
                acc[packerName]["items"].push(order);
            }
        }
        return acc;
    }, {})

    const results = (Object.entries(packersDataGroupByNames).slice()
        .reduce((result, [packerName, packerData]) => {
            const packerId = packerData['items'][0]['packedBy'];
            const numberOfItems = packerData['items'];
            const numberOfOrders = packerData['orders'];
            const upo = numberOfItems.length / Object.keys(numberOfOrders).length;
            const totalTimeInHr = getTotalTime(packerData);
            const uph = numberOfItems.length / totalTimeInHr;
            result.push(
                {
                    packerName,
                    packerId,
                    numberOfItems,
                    numberOfOrders,
                    totalTimeInHr,
                    upo,
                    uph
                }
            )
            return result
        }, []));
    window.packers = results;
    if (results.length !== 0) {
        makeTable(results);
        charts(results);
    }
    spinner('remove');
    return results;
}

export const getTotalTime = (packerData) => {

    let breakTime = document.querySelector('#break-time').value;
    breakTime = breakTime || 60
    breakTime = +breakTime * 1000 * 60;
    let totalTimeInMs = 0;

    Object.values(packerData['orders']).forEach((orderData, currentIndex, array) => {
        let nextIndex = currentIndex + 1
        if (nextIndex >= array.length - 1) {
            nextIndex = array.length - 1
        }
        const currentOrder = new Date(array[currentIndex][0]['packingEnd']);
        const nextOrder = new Date(array[nextIndex][0]['packingEnd']);
        const diffBtwOrders = nextOrder - currentOrder
        if (diffBtwOrders > 0 && diffBtwOrders < breakTime) {
            totalTimeInMs += diffBtwOrders
        }
    })
    return totalTimeInMs / 3600000;
}


export const toHoursAndMinutes = (hr) => {
    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    }
    const totalMinutes = Math.floor(hr * 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return "";
        // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}
/**
 * Capitalizes first letters of words in string.
 * @param {string} str String to be modified
 * @param {boolean=false} lower Whether all other letters should be lowercased
 * @return {string}
 * @usage
 *   capitalize('fix this string');     // -> 'Fix This String'
 *   capitalize('javaSCrIPT');          // -> 'JavaSCrIPT'
 *   capitalize('javaSCrIPT', true);    // -> 'Javascript'
 */
export const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());

// -----------------------------------Modal---------------------------------- //
const modalElement = document.querySelector('#modal');

const modal = (data) => {
    // modalElement.innerHTML
    const items = packersData.filter(name => name.packerName == data)[0].numberOfItems;
    const html = [];
    html.push(`
    <div class="modal-body">
<table class="table-primary">
    `)
    html.push(items.map(item => `
        <tr>
            <td scope="col">${item.Item}</td>
            <td scope="col">${item.City}</td>
        </tr>
    `).join(""))
    html.push('<table/></div>');
    modalElement.innerHTML = html.join("");
}