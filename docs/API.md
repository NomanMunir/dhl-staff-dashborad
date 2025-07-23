# API Reference

## Core Functions

### Data Processing

#### `mapData(data)`

Transforms raw CSV data into structured objects.

**Parameters:**

- `data` (Array): Raw CSV data from Papa Parse

**Returns:**

- Array of processed data objects

**Example:**

```javascript
const processedData = mapData(rawCsvData);
```

#### `calculatePackersData()`

Processes packer data and calculates performance metrics.

**Returns:**

- Array of packer performance objects

**Side Effects:**

- Updates `window.packers` and `window.packersNoFilter`
- Renders charts and tables

#### `getTotalTime(packerData)`

Calculates total working time for a packer.

**Parameters:**

- `packerData` (Object): Packer's order data

**Returns:**

- Number: Total time in hours

### Chart Generation

#### `charts(packersData)`

Generates performance and UPH charts.

**Parameters:**

- `packersData` (Array): Array of packer performance data

**Side Effects:**

- Renders charts to DOM
- Updates chart containers

#### `uphChart(config)`

Creates UPH (Units Per Hour) bar chart.

**Parameters:**

- `config` (Object): Chart configuration object
  - `uphChartData`: Chart data
  - `chartsOptions`: Chart options
  - `chartsAnimation`: Animation settings

**Returns:**

- Chart instance

#### `perfChart(config)`

Creates performance comparison chart.

**Parameters:**

- `config` (Object): Chart configuration object

**Returns:**

- Chart instance

### UI Management

#### `spinner(action)`

Controls loading spinner display.

**Parameters:**

- `action` (String): "add" to show, "remove" to hide

#### `setDefaultDateTime()`

Sets default date and time values for filters.

**Side Effects:**

- Updates date/time input elements
- Sets 10-hour window from current time

#### `fromDate()` / `toDate()`

Get date range values from UI inputs.

**Returns:**

- Date object

### Table Generation

#### `makeTable(packers)`

Generates performance data table.

**Parameters:**

- `packers` (Array): Packer performance data

**Side Effects:**

- Updates table DOM element
- Sorts data by performance

### Utility Functions

#### `toHoursAndMinutes(hours)`

Converts decimal hours to HH:MM format.

**Parameters:**

- `hours` (Number): Decimal hours

**Returns:**

- String: Formatted time (HH:MM)

#### `capitalize(str, lower)`

Capitalizes first letters of words.

**Parameters:**

- `str` (String): Input string
- `lower` (Boolean): Convert rest to lowercase

**Returns:**

- String: Capitalized string

## Configuration

### Staff Configuration

Located in `src/config.js`:

```javascript
export const config = {
  staffId: "Full Name",
  // Add more mappings...
};
```

### Performance Thresholds

#### UPH Scoring

```javascript
const calcuAvgOfUph = (uph) => {
  if (uph <= 20) return 15;
  if (uph >= 21 && uph <= 25) return 43;
  if (uph >= 26 && uph <= 30) return 55;
  if (uph >= 31 && uph <= 35) return 62;
  if (uph >= 36 && uph <= 40) return 63;
  if (uph >= 41 && uph <= 45) return 64;
  return 65;
};
```

#### UPO Scoring

```javascript
const calcuAvgOfUpo = (upo) => {
  if (upo <= 1) return 20;
  if (upo >= 1.0001 && upo <= 2.0) return 18;
  if (upo >= 2.0001 && upo <= 3.0) return 17;
  if (upo >= 3.0001 && upo <= 4.0) return 8;
  if (upo >= 4.0001 && upo <= 5.0) return 6;
  return 5;
};
```

## DOM Elements

### Key Element References

```javascript
// Date/Time Controls
const fromDateElem = document.querySelector("#from-date");
const toDateElem = document.querySelector("#to-date");
const fromTimeElem = document.querySelector("#from-time");
const toTimeElem = document.querySelector("#to-time");

// Display Controls
const perfChartCheckboxElem = document.querySelector("#perf-chart-checkbox");
const uphChartCheckboxElem = document.querySelector("#uph-chart-checkbox");
const tableCheckboxElem = document.querySelector("#table-checkbox");

// Content Areas
const perfChartDiv = document.querySelector("#perf-charts");
const uphChartDiv = document.querySelector("#uph-charts");
const tableDiv = document.querySelector("#table");
```

## Event Handlers

### Checkbox Change Handlers

```javascript
// Toggle chart visibility
perfChartCheckboxElem.addEventListener(
  "change",
  perfChartCheckboxChangeHandler
);
uphChartCheckboxElem.addEventListener("change", uphChartCheckboxChangeHandler);
tableCheckboxElem.addEventListener("change", tableCheckboxChangeHandler);
```

### Date Change Handlers

```javascript
// Recalculate data on date changes
fromDateElem.addEventListener("change", dateChangeHandler);
toDateElem.addEventListener("change", dateChangeHandler);
```

### Break Time Filter

```javascript
// Filter by break time on Enter key
breakTimeElem.addEventListener("keypress", breakTimeFilterChangeHandler);
```

## Global Variables

### Data Storage

```javascript
window.packersData; // Raw processed CSV data
window.packers; // Filtered packer performance data
window.packersNoFilter; // Unfiltered packer data
```

## Error Handling

### Common Errors

- **CSV Parse Error**: File format or accessibility issues
- **Date Parse Error**: Invalid date formats in data
- **Chart Render Error**: Missing Chart.js dependencies
- **Element Not Found**: DOM elements not available

### Error Display

Uses Toastify.js for user notifications:

```javascript
Toastify({
  text: "Error message",
  className: "warning",
  position: "left",
  gravity: "bottom",
}).showToast();
```
