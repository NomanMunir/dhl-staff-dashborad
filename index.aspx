<!DOCTYPE html>
<html>

<head>
	<link rel="stylesheet" href="styles/style.css">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
		crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.js"
		integrity="sha512-VcwFAndRWOHd2GciF0dxUnsMlQGvIWMzKaOECoZT/xvKE3B6Lsow+xtuoi+fI/hBKF2F05mgLcynmICdvI4a4g=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/chart.min.js"
		integrity="sha512-sW/w8s4RWTdFFSduOTGtk4isV1+190E/GghVffMA9XczdJ2MDzSzLEubKAs5h0wzgSJOQTRYyaz73L3d6RtJSg=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/2.0.0/chartjs-plugin-datalabels.min.js"
		integrity="sha512-R/QOHLpV1Ggq22vfDAWYOaMd5RopHrJNMxi8/lJu8Oihwi4Ho4BRFeiMiCefn9rasajKjnx9/fTQ/xkWnkDACg=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<link rel="stylesheet" type="text/css" href="./styles/toastify.css">

	<title>Dashboard</title>
</head>

<body>
	<nav class="navbar navbar-light navbar-light bg-warning" aria-label="Navbar">
		<div class="container-fluid">
			<a href="/" class="d-flex ml-5 align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
				<img class="bi me-2" width="120" height="17" src="./assets/images/logo-dhl.png" />
				<span id="brand" class="fs-4 text-danger">Dashboard</span>
			</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
				data-bs-target="#offcanvasNavbarDark" aria-controls="offcanvasNavbarDark">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="offcanvas offcanvas-end text-bg-light" tabindex="-1" id="offcanvasNavbarDark"
				aria-labelledby="offcanvasNavbarDarkLabel">
				<div class="offcanvas-header bg-warning">
					<h5 class="offcanvas-title" id="offcanvasNavbarDarkLabel">Menu</h5>
					<button type="button" class="btn-close btn-close-dark" data-bs-dismiss="offcanvas"
						aria-label="Close"></button>
				</div>
				<div class="offcanvas-body">
					<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
						<li class="nav-item">
							<div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">

								<input type="checkbox" class="btn-check" id="perf-chart-checkbox" autocomplete="off">
								<label class="btn btn-outline-warning" for="perf-chart-checkbox">Perf Chart</label>

								<input type="checkbox" class="btn-check" id="table-checkbox" autocomplete="off">
								<label class="btn btn-outline-warning" for="table-checkbox">Table</label>

								<input type="checkbox" checked class="btn-check" id="uph-chart-checkbox"
									autocomplete="off">
								<label class="btn btn-outline-warning" for="uph-chart-checkbox">Uph Chart</label>

							</div>
						</li>
						<li class="nav-item my-2 bg-light">
							<span class="h6 py-2 bg-text-light">Query Date</span>
						</li>
						<li class="nav-item">
							<div class="mx-2" id="from-date-div">
								<label for="from-date">From:</label>
								<div class="">
									<input class="form-control-sm" type="date" id="from-date" name="fromDate">
									<input class="form-control-sm" type="time" id="from-time" name="fromTime">
								</div>
							</div>
						</li>
						<li class="nav-item">
							<div class="mx-2" id="to-date-div">
								<label for="to-date">To:</label>
								<div class="">
									<input class="form-control-sm" type="date" name="toDate" id="to-date">
									<input class="form-control-sm" type="time" name="toTime" id="to-time">
								</div>
							</div>
						</li>
					</ul>
					<hr>
					<div class="d-flex mt-3" role="search">
						<input class="form-control" defaultValue="40" placeholder="Filter Break Time" type="text"
							name="Toggle Menu" id="break-time">
					</div>
				</div>
			</div>
		</div>
	</nav>

	<center>
		<div class="spinner"></div>
	</center>
	<section class="d-flex flex-column justify-content-center gx-3">
		<div class="mx-auto my-3 bg-white" style="width: 100vw; height:auto;" id="perf-charts"></div>
		<div id="table" class="mx-auto my-3 bg-white" style="width: 98vw; height:auto;"></div>
		<div class="mx-auto bg-white" id="uph-charts" style="width: 98vw; height:100vh;"></div>
	</section>

	<footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
		<div class="col-md-4 d-flex align-items-center">
			<a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
				<svg class="bi" width="30" height="24">
					<use xlink:href="#bootstrap"></use>
				</svg>
			</a>
			<span class="mb-3 mb-md-0 text-muted">© 2022 Company, Inc</span>
		</div>
	</footer>

	<div class="modal-dialog modal-xl" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true" id="modal">

	</div>
</body>
<script src="./styles/toastify.js"></script>
<script type="module" src="app.js"></script>