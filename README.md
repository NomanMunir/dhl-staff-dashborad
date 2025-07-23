# DHL Staff Dashboard

> **A comprehensive employee productivity dashboard for DHL operations staff**

![DHL Dashboard](./docs/Dashboard%20overview.gif)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Data Format](#data-format)
- [Configuration](#configuration)
- [Charts & Analytics](#charts--analytics)
- [Staff Management](#staff-management)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🔍 Overview

The DHL Staff Dashboard is a web-based application designed to monitor and analyze employee productivity in DHL operations. It provides real-time insights into staff performance, including tracking of units per hour (UPH), units per order (UPO), and overall efficiency metrics.

### Key Benefits

- **📊 Real-time Analytics**: Live performance tracking and data visualization
- **⚡ Improved Efficiency**: Identify bottlenecks and optimize workforce allocation
- **🎯 Performance Insights**: Track individual and team productivity trends
- **💰 Cost Optimization**: Data-driven decisions for resource management
- **🚀 Employee Motivation**: Transparent performance metrics and recognition

## ✨ Features

### 📈 Performance Visualization

- **Performance Chart**: Visual representation of individual staff performance over time
- **UPH Chart**: Units Per Hour tracking with color-coded performance indicators
- **Interactive Data Table**: Detailed breakdown of work hours, items processed, and orders completed

### 🔧 Advanced Filtering

- **Date Range Selection**: Filter data by specific date and time ranges
- **Break Time Configuration**: Adjustable break time settings for accurate calculations
- **Real-time Updates**: Dynamic chart and table updates based on filter changes

### 👥 Staff Management

- **Staff Recognition System**: Automated mapping of packer IDs to full names
- **Performance Benchmarking**: Color-coded performance indicators
- **Productivity Rankings**: Sortable performance metrics

### 📱 Responsive Design

- **Mobile-Friendly**: Bootstrap-based responsive design
- **Cross-Platform**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with DHL branding

## 📁 Project Structure

```
dhl-staff-dashboard/
├── 📄 index.html                 # Main HTML page
├── 📄 index.aspx                # ASP.NET version
├── 📖 README.md                 # Project documentation
├──
├── 📁 src/                      # Source code
│   ├── 📄 app.js                # Main application entry point
│   ├── 📄 config.js             # Staff configuration and mappings
│   │
│   ├── 📁 components/           # UI Components
│   │   ├── 📄 elements.js       # DOM element references and utilities
│   │   └── 📄 table.js          # Data table component
│   │
│   └── 📁 utils/                # Utility functions
│       ├── 📄 charts.js         # Chart generation and management
│       ├── 📄 helpers.js        # Data processing and calculations
│       └── 📄 handler.js        # Event handlers (legacy)
│
├── 📁 styles/                   # Stylesheets and UI assets
│   ├── 📄 style.css             # Custom styles
│   ├── 📄 bootstrap.min.css     # Bootstrap framework
│   ├── 📄 toastify.css          # Toast notifications
│   └── 📄 toastify.js           # Toast notification library
│
├── 📁 assets/                   # Static assets
│   └── 📁 images/
│       └── 📄 logo-dhl.png      # DHL logo
│
├── 📁 data/                     # Data files
│   ├── 📄 dispatch-report.csv   # Current dispatch data
│   ├── 📄 dispatch-report old.csv
│   └── 📁 Archive/              # Historical data
│       └── 📄 dispatch-report till 27 Jan 2023 @ 1700 hrs.csv
│
└── 📁 docs/                     # Documentation and media
    ├── 📄 Dashboard overview.gif
    └── 📄 Dashboard overview.webm
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (for serving files locally)
- CSV data file in the correct format

### Installation

1. **Clone or download the repository**

   ```bash
   git clone <repository-url>
   cd dhl-staff-dashboard
   ```

2. **Set up a local web server**

   **Option A: Using Python**

   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option B: Using Node.js**

   ```bash
   npx serve .
   ```

   **Option C: Using PHP**

   ```bash
   php -S localhost:8000
   ```

3. **Open the application**
   - Navigate to `http://localhost:8000` in your browser
   - Choose either `index.html` or `index.aspx` based on your environment

### Data Setup

1. **Prepare your CSV file**

   - Ensure your dispatch report CSV file matches the expected format
   - Place the file as `data/dispatch-report.csv`
   - See [Data Format](#data-format) section for details

2. **Configure staff mappings**
   - Update `src/config.js` with your staff member mappings
   - Map packer IDs to full staff names

## 💡 Usage

### Basic Operation

1. **Load the Dashboard**

   - Open the application in your web browser
   - The dashboard will automatically load the latest dispatch data

2. **Filter Data**

   - Use the menu toggle button to access filtering options
   - Set date and time ranges for analysis
   - Adjust break time settings as needed

3. **View Analytics**
   - Toggle between different chart views (Performance, UPH, Table)
   - Charts update automatically based on your filters
   - Hover over chart elements for detailed information

### Navigation

- **Menu Toggle**: Access filtering and display options
- **Date Range**: Set "From" and "To" dates and times
- **Break Time Filter**: Adjust break time calculations (default: 40 minutes)
- **Chart Toggles**: Show/hide Performance Chart, Data Table, and UPH Chart

## 📊 Data Format

The application expects CSV files with the following columns:

| Column Name             | Description               | Example               |
| ----------------------- | ------------------------- | --------------------- |
| `Airway bill no`        | Unique airway bill number | `AWB123456789`        |
| `Return airway bill no` | Return airway bill number | `RAWB987654321`       |
| `City`                  | Destination city          | `Dubai`               |
| `Item`                  | Item description          | `Document`            |
| `Order ID`              | Unique order identifier   | `ORD001`              |
| `Order Number`          | Order number              | `12345`               |
| `Order type`            | Type of order             | `Express`             |
| `Pack id`               | Packing identifier        | `PCK001`              |
| `Packed by`             | Staff member identifier   | `john`                |
| `Packing location`      | Location where packed     | `john_station`        |
| `acc. country`          | Account country           | `UAE`                 |
| `Packing End`           | Completion timestamp      | `2023/03/15 14:30:00` |

### Data Processing

The application automatically:

- ✅ Filters out invalid entries
- ✅ Handles date format variations
- ✅ Removes duplicate records
- ✅ Calculates performance metrics
- ✅ Groups data by staff members

## ⚙️ Configuration

### Staff Configuration (`src/config.js`)

```javascript
export const config = {
  john: "John Smith",
  jane: "Jane Doe",
  mike: "Mike Johnson",
  // Add more staff mappings...
};
```

### Performance Thresholds

The system uses predefined thresholds for performance calculation:

#### UPH (Units Per Hour) Scoring

- **≤20**: 15 points
- **21-25**: 43 points
- **26-30**: 55 points
- **31-35**: 62 points
- **36-40**: 63 points
- **41-45**: 64 points
- **45+**: 65 points

#### UPO (Units Per Order) Scoring

- **≤1**: 20 points
- **1-2**: 18 points
- **2-3**: 17 points
- **3-4**: 8 points
- **4-5**: 6 points
- **5+**: 5 points

## 📈 Charts & Analytics

### Performance Chart

- **Purpose**: Overall staff performance comparison
- **Calculation**: Combined UPH + UPO + Time efficiency scores
- **Color Coding**: Green (excellent) to Red (needs improvement)

### UPH Chart

- **Purpose**: Units per hour productivity tracking
- **Display**: Horizontal bar chart with staff names
- **Sorting**: Highest to lowest UPH
- **Interaction**: Hover for detailed metrics

### Data Table

- **Purpose**: Detailed staff performance breakdown
- **Columns**: Name, Pack ID, Items, Orders, UPO, UPH, Total Time
- **Features**: Sortable columns, responsive design
- **Summary**: Grand totals and averages

### Color Coding System

#### UPH Chart Colors

- 🟢 **Green**: High performance (40+ UPH)
- 🟡 **Yellow**: Good performance (30-39 UPH)
- 🟠 **Orange**: Average performance (20-29 UPH)
- 🔴 **Red**: Below average (<20 UPH)

#### Performance Chart Colors

- 🟢 **Excellent**: 80+ points
- 🟡 **Good**: 60-79 points
- 🟠 **Average**: 40-59 points
- 🔴 **Needs Improvement**: <40 points

## 👥 Staff Management

### Adding New Staff Members

1. **Update Configuration**

   ```javascript
   // In src/config.js
   export const config = {
     // Existing staff...
     newid: "New Staff Name",
   };
   ```

2. **Ensure Data Consistency**
   - New staff IDs should match the "Packed by" field in CSV data
   - Use consistent 4-character identifiers

### Performance Benchmarks

The system automatically calculates and displays:

- **Individual Performance Scores**
- **Productivity Rankings**
- **Time Efficiency Metrics**
- **Comparative Analysis**

## 🔧 Troubleshooting

### Common Issues

#### 📁 **File Loading Issues**

- **Problem**: CSV file not loading
- **Solution**:
  - Ensure file is named `dispatch-report.csv`
  - Check file is in the `data/` directory
  - Verify web server is running
  - Check browser console for errors

#### 📊 **Charts Not Displaying**

- **Problem**: Charts appear blank or not loading
- **Solution**:
  - Verify Chart.js library is loaded
  - Check browser console for JavaScript errors
  - Ensure data format is correct
  - Clear browser cache

#### 👤 **Staff Names Not Showing**

- **Problem**: Staff IDs display instead of names
- **Solution**:
  - Update `src/config.js` with correct mappings
  - Ensure packer IDs match configuration keys
  - Check CSV data for correct "Packed by" values

#### 📅 **Date Filtering Issues**

- **Problem**: Date filters not working correctly
- **Solution**:
  - Check date format in CSV file
  - Verify timezone settings
  - Ensure date range is valid

### Error Messages

#### "File is empty or file name is wrong"

- Check CSV file exists and has data
- Verify file path and permissions
- Ensure CSV format is correct

#### "No data found between selected date"

- Adjust date range filters
- Check if data exists for selected period
- Verify date format in source data

### Performance Issues

#### Slow Loading

- **Large Data Files**: Consider splitting data by date ranges
- **Browser Performance**: Close unnecessary tabs, clear cache
- **Server Resources**: Ensure adequate server capacity

#### Memory Issues

- **Data Size**: Process data in smaller chunks
- **Browser Limits**: Refresh page periodically
- **Chart Rendering**: Limit number of data points displayed

## 🛠️ Development

### Technology Stack

- **Frontend**: Vanilla JavaScript (ES6 modules)
- **Styling**: Bootstrap 5, Custom CSS
- **Charts**: Chart.js with DataLabels plugin
- **Data Processing**: PapaParse (CSV parsing)
- **Notifications**: Toastify.js

### Code Organization

```
src/
├── app.js              # Main application logic
├── config.js           # Configuration and mappings
├── components/         # Reusable UI components
│   ├── elements.js     # DOM utilities
│   └── table.js        # Table component
└── utils/              # Utility functions
    ├── charts.js       # Charting logic
    ├── helpers.js      # Data processing
    └── handler.js      # Event handling
```

### Key Functions

#### Data Processing (`utils/helpers.js`)

- `mapData()`: Process raw CSV data
- `calculatePackersData()`: Calculate performance metrics
- `getTotalTime()`: Calculate working hours

#### Visualization (`utils/charts.js`)

- `charts()`: Main chart rendering function
- `uphChart()`: UPH chart generation
- `perfChart()`: Performance chart generation

#### UI Management (`components/elements.js`)

- `setDefaultDateTime()`: Initialize date filters
- `spinner()`: Loading indicator management
- `fromDate()`, `toDate()`: Date utility functions

## 🤝 Contributing

We welcome contributions to improve the DHL Staff Dashboard!

### Getting Started

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Contribution Guidelines

- Follow existing code style and structure
- Add comments for complex logic
- Test changes with sample data
- Update documentation as needed

### Areas for Improvement

- 🔄 Real-time data updates
- 📱 Enhanced mobile experience
- 🎨 Additional chart types
- 🔒 User authentication
- 📈 Advanced analytics features

## 📄 License

This project is proprietary software developed for DHL operations. All rights reserved.

---

## 📞 Support

For technical support or questions about the DHL Staff Dashboard:

- 📧 **Email**: IT Support Team
- 📱 **Internal**: Contact system administrators
- 📖 **Documentation**: Refer to this README and inline code comments

---

**Built with ❤️ for DHL Operations Team**
