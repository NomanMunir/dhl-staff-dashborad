# Developer Documentation

## Project Architecture

The DHL Staff Dashboard follows a modular JavaScript architecture using ES6 modules.

### Core Components

#### 1. Application Entry Point (`src/app.js`)

- Main application initialization
- Event listener setup
- CSV data parsing coordination
- UI state management

#### 2. Configuration (`src/config.js`)

- Staff ID to name mappings
- Configurable constants
- Easy maintenance of staff information

#### 3. UI Components (`src/components/`)

##### `elements.js`

- DOM element references
- Utility functions for UI elements
- Date/time handling
- Spinner controls

##### `table.js`

- Data table generation
- Table formatting and styling
- Responsive table layout

#### 4. Utilities (`src/utils/`)

##### `helpers.js`

- Data processing and transformation
- Performance calculations
- Time calculations
- Data filtering logic

##### `charts.js`

- Chart.js configuration and rendering
- Chart data preparation
- Color coding logic
- Chart interaction handling

##### `handler.js` (Legacy)

- Event handlers (currently commented out)
- Kept for reference

## Data Flow

```
CSV File → Papa Parse → mapData() → calculatePackersData() → Charts & Table
```

1. **CSV Loading**: Papa Parse loads and parses the CSV file
2. **Data Mapping**: Raw CSV data is transformed into structured objects
3. **Calculations**: Performance metrics are calculated (UPH, UPO, time)
4. **Filtering**: Data is filtered based on date range and other criteria
5. **Visualization**: Charts and tables are rendered with processed data

## Key Functions

### Data Processing

```javascript
// Transform raw CSV data
mapData(rawData) → structuredData

// Calculate performance metrics
calculatePackersData() → packerMetrics

// Time calculations
getTotalTime(packerData) → hoursWorked
```

### Chart Generation

```javascript
// Main chart rendering
charts(packersData) → void

// Individual chart types
uphChart(config) → Chart
perfChart(config) → Chart
```

### UI Management

```javascript
// Element management
spinner(action) → void
setDefaultDateTime() → void

// Date utilities
fromDate() → Date
toDate() → Date
```

## Performance Calculations

### UPH (Units Per Hour)

```javascript
uph = numberOfItems / totalTimeInHours;
```

### UPO (Units Per Order)

```javascript
upo = numberOfItems / numberOfOrders;
```

### Performance Score

```javascript
performance = uphScore + upoScore + timeScore;
```

## Chart Configuration

### Chart.js Setup

- Uses Chart.js v3.8.0
- DataLabels plugin for value display
- Custom color coding based on performance
- Responsive design with Bootstrap integration

### Color Coding Logic

- Performance thresholds determine chart colors
- Green: High performance
- Yellow: Good performance
- Orange: Average performance
- Red: Below average

## Development Guidelines

### Code Style

- Use ES6 modules and syntax
- Consistent naming conventions
- Comprehensive commenting
- Error handling with user feedback

### File Organization

- Keep related functionality grouped
- Separate concerns (UI, logic, configuration)
- Use meaningful file and function names

### Testing Considerations

- Test with various CSV formats
- Verify calculations manually
- Check responsive design on different devices
- Validate error handling scenarios

## Debugging Tips

### Common Issues

1. **Import Errors**: Check file paths after restructuring
2. **Data Processing**: Verify CSV format and required columns
3. **Chart Rendering**: Ensure Chart.js libraries are loaded
4. **Performance Calculations**: Validate date formats and calculations

### Browser Console

- Use `window.packersData` to inspect processed data
- Use `window.packers` to view filtered results
- Check for JavaScript errors in console

### Data Validation

- Verify CSV column names match expected format
- Check date format consistency
- Ensure staff IDs exist in config.js

## Browser Compatibility

### Supported Browsers

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

### Required Features

- ES6 modules support
- Canvas API (for Chart.js)
- LocalStorage API
- Fetch API or XMLHttpRequest

## Performance Optimization

### Tips for Large Datasets

- Consider pagination for large tables
- Implement data chunking for processing
- Use web workers for heavy calculations
- Optimize chart rendering frequency

### Memory Management

- Clear unused chart instances
- Limit data retention in memory
- Use efficient data structures
- Monitor browser memory usage
