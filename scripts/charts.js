import { perfChartCheckboxElem, uphChartCheckboxElem, fromDate, toDate } from "../UI/elements.js";

export const charts = (packersData) => {
	// Setting Chart default font size
	Chart.defaults.font.size = "28rem";

	//Html Elements for charts
	document.getElementById('uph-charts').innerHTML = '<div class="shadow-sm m-3"><canvas id="cnv_uph_chart"></canvas></div>'
	document.getElementById('perf-charts').innerHTML = '<div class="shadow-sm"><canvas id="cnv_perf_chart"></canvas></div>'

	//Currert year and Month
	// const year = new Date(packersData['numberOfItems'][0]["packingEnd"]);
	//Packer data sorterd
	const perfData = calculatePerf(packersData);
	//sort by perf
	const perfPackers = perfData.sort((firstPerson, secondPerson) => +secondPerson['performance'] - +firstPerson['performance'])

	const uphPackers = packersData.sort((firstPerson, secondPerson) => +secondPerson['uph'] - +firstPerson['uph'])
	//Choose Background color for the charts bar
	const backgroundColorForUph = uphPackers.map(packer => chooseColorForUphChart(packer['uph']));
	const backgroundColorForPerf = perfPackers.map(packer => chooseColorForPerfChart(packer['performance']));

	//"UPH- Packers - from 10 March @ 0700 hrs to 11 March @ 0500 hrs"
	const formattedPackersChartDate = () => {
		return `${fromDate().toLocaleDateString(undefined, { day: "numeric", month: "long", })} @ ${fromDate().toLocaleTimeString('en-US', { hour12: false })} hrs to ${toDate().toLocaleDateString(undefined, { day: "numeric", month: "long", })} @ ${toDate().toLocaleTimeString('en-US', { hour12: false })} hrs`;
	}
	const uphChartData = {
		labels: uphPackers.map(packer => packer.packerName.toUpperCase()), //Packers Names
		datasets: [{
			label: `UPH- Packers- From ${formattedPackersChartDate()}`,
			data: uphPackers.map(item => ~~item["uph"]),
			backgroundColor: backgroundColorForUph,
			borderColor: backgroundColorForUph,
			borderWidth: 1
		}]
	};

	const perfChartData = {
		labels: perfPackers.map(packer => packer.packerName.toUpperCase()), //Packers Name
		datasets: [{
			label: `Performance`,// for ${(fromDate())} ${toDate().toLocaleDateString()}`,
			data: perfPackers.map(item => item["performance"]),
			backgroundColor: backgroundColorForPerf,
			borderColor: backgroundColorForPerf,
			borderWidth: 1
		}]
	};

	const chartsPlugins = {

		// Change options for ALL labels of THIS CHART
		datalabels: {
			anchor: "end",
			align: "start",
			color: '#00000',
			textAlign: "center",
			labels: {
				title: {
					font: {
						family: "Delivery",
						weight: 'bold',
						size: "20rem",
					}
				},
				//value: {
				//    color: 'white'
				//  },
			},
			formatter: function (value, context) {
				// console.log(context)
				let name = context.chart.config._config.data.labels[context.dataIndex];
				// let name = perfPackers[context.dataIndex]["packerName"];
				return [value, Array.from(name).join(" \n ")].join("\n\n");
				return ["\n\n", "\n\n", value, "\n\n"];
				//,Math.round(uph)


			}
		}
	}
	const chartsOptions = {
		plugins: chartsPlugins,
		indexAxis: "x",
		responsive: true,
		legend: {
			labels: {
				fontColor: '#0000ff',
				fontSize: 60
			}
		},
		scales: {
			y: {
				title: {
					display: false,
					align: "center",
					text: "Packer's Performance",
					font: {
						family: "Delivery",
						weight: 'bold',
						size: "25rem",
						color: "#FFCC00"
					},
				},
			},
			x: {

				display: false
			}
		}
	}
	const chartsAnimation = {
		tension: {
			duration: 2000,
			easing: 'linear',
			from: 1,
			to: 0,
			loop: true
		}
	}

	if (!uphChartCheckboxElem.checked) {
		document.querySelector('#uph-charts').className = "display-none";
		uphChart({ uphChartData, chartsOptions, chartsAnimation })

	} else {
		uphChart({ uphChartData, chartsOptions, chartsAnimation })
	}
	if (!perfChartCheckboxElem.checked) {
		document.querySelector('#perf-charts').className = "display-none";
		perfChart({ perfChartData, chartsOptions, chartsAnimation })

	} else {
		perfChart({ perfChartData, chartsOptions, chartsAnimation })
	}
}

const uphChart = ({ uphChartData, chartsOptions, chartsAnimation }) => {
	const ctx = document.getElementById('cnv_uph_chart').getContext('2d');
	const uphChart = new Chart(ctx, {
		type: "bar",
		plugins: [ChartDataLabels],
		data: uphChartData,
		options: {
			...chartsOptions,
			scales: {
				y: {
					title: {
						display: false,
						align: "center",
						text: "UPH",
						font: {
							family: "Delivery",
							weight: 'bold',
							size: "20rem"
						},
					},
				},
				x: {

					display: false
				}
			},
			legend: {
				labels: {
					fontSize: 18
				}
			}
		},
		animations: chartsAnimation
	});
	return uphChart
}

const perfChart = ({ perfChartData, chartsOptions, chartsAnimation }) => {


	const ctx = document.getElementById('cnv_perf_chart').getContext('2d');
	const myChart = new Chart(ctx, {
		plugins: [ChartDataLabels],
		type: "bar",
		data: perfChartData,
		options: chartsOptions,
		animations: chartsAnimation,
	});
	return myChart
}


const calculatePerf = (packers) => {
	const packersAvgPerf = packers.reduce((a, packer) => {
		const avguph = calcuAvgOfUph(packer['uph'])
		const avgupo = calcuAvgOfUpo(packer['upo'])
		const avgHr = calcuAvgTime(packer['totalTimeInHr'])
		a.push({
			packerName: packer['packerName'],
			performance: avguph + avgupo + avgHr,
			items: packer['numberOfItems'],
			orders: packer['numberOfOrders'],
			packerId: packer['packerId'],
			hoursWorked: packer['totalTimeInHr'],
			uph: packer['uph'],
			upo: packer['upo']
		})
		return a
	}, [])
	return packersAvgPerf
}

const calcuAvgOfUph = (uph) => {
	let result;
	if (uph) {
		result = uph <= 20 ? 15
			: uph >= 21 && uph <= 25 ? 43
				: uph >= 26 && uph <= 30 ? 55
					: uph >= 31 && uph <= 35 ? 62
						: uph >= 36 && uph <= 40 ? 63
							: uph >= 41 && uph <= 45 ? 64
								: 65
	}
	return result
}
const calcuAvgOfUpo = (upo) => {
	let result;
	if (upo) {
		result = upo <= 1 ? 20
			: upo >= 1.0001 && upo <= 2.00 ? 18
				: upo >= 2.0001 && upo <= 3.00 ? 17
					: upo >= 3.0001 && upo <= 4.00 ? 8
						: upo >= 4.0001 && upo <= 5.00 ? 6
							: 5
	}
	return result
}
const calcuAvgTime = (time) => {
	let result;
	if (time) {
		result = time <= 50 ? 2
			: time >= 51 && time <= 100 ? 9
				: time >= 101 && time <= 125 ? 12
					: time >= 126 && time <= 150 ? 14
						: time >= 151 && time <= 175 ? 14
							: time >= 176 && time <= 200 ? 15
								: 15
	}
	return result
}

const chooseColorForUphChart = (uph) => {
	let result;
	if (uph) {
		result = uph < 25 ? "#F37878"
			: uph >= 25 && uph < 30 ? "#FFCC00"
				: uph >= 30 ? "#3CCF4E" : "#3CCF4E"
	}
	return result
}
const chooseColorForPerfChart = (perf) => {
	let result;
	if (perf) {
		result = perf < 75 ? "#F37878"
			: perf >= 75 && perf < 85 ? "#FFCC00"
				: perf >= 85 ? "#3CCF4E" : "#3CCF4E"
	}
	return result
}
