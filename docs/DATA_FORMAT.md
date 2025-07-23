# Data Format Documentation

## CSV File Structure

The application expects dispatch report CSV files with specific column headers and data formats.

### Required Columns

| Column Name             | Type     | Description                   | Example               |
| ----------------------- | -------- | ----------------------------- | --------------------- |
| `Airway bill no`        | String   | Unique airway bill identifier | `1234567890123`       |
| `Return airway bill no` | String   | Return shipping identifier    | `RAWB123456789`       |
| `City`                  | String   | Destination city              | `Dubai`, `Abu Dhabi`  |
| `Item`                  | String   | Item description              | `Document`, `Package` |
| `Order ID`              | String   | Unique order identifier       | `DXB001234`           |
| `Order Number`          | String   | Order reference number        | `ORD-2023-001`        |
| `Order type`            | String   | Type of shipment              | `Express`, `Standard` |
| `Pack id`               | String   | Packing identifier            | `PCK001`              |
| `Packed by`             | String   | Staff identifier (4 chars)    | `john`, `jane`        |
| `Packing location`      | String   | Packing station location      | `john_station_01`     |
| `acc. country`          | String   | Account country               | `UAE`, `KSA`          |
| `Packing End`           | DateTime | Completion timestamp          | `2023/03/15 14:30:00` |

### Data Validation Rules

#### Airway Bill Number

- Must not be empty or whitespace only
- Length must be greater than 2 characters
- Should be unique per shipment

#### Staff Identifier (`Packed by`)

- Must be exactly 4 characters
- Should match keys in `config.js`
- Case-insensitive matching

#### Date/Time Format (`Packing End`)

- Supports multiple formats:
  - `YYYY/MM/DD HH:MM:SS`
  - `MM/DD/YYYY HH:MM:SS`
  - ISO date strings
- Automatically converts invalid formats

#### Order Type

- Must not be empty
- Used for filtering valid orders

### Sample CSV Data

```csv
Airway bill no,Return airway bill no,City,Item,Order ID,Order Number,Order type,Pack id,Packed by,Packing location,acc. country,Packing End
1234567890123,RAWB123456789,Dubai,Document,DXB001234,ORD-2023-001,Express,PCK001,john,john_station_01,UAE,2023/03/15 14:30:00
1234567890124,RAWB123456790,Abu Dhabi,Package,DXB001235,ORD-2023-002,Standard,PCK002,jane,jane_station_02,UAE,2023/03/15 14:35:00
1234567890125,RAWB123456791,Sharjah,Document,DXB001236,ORD-2023-003,Express,PCK003,mike,mike_station_03,UAE,2023/03/15 14:40:00
```

### Data Processing Flow

1. **CSV Parsing**

   - Papa Parse library processes the CSV file
   - Headers are automatically detected
   - Invalid rows are skipped

2. **Data Filtering**

   ```javascript
   // Filters applied:
   - Airway bill length > 2 characters
   - Order type is not empty
   - Remove duplicates based on all fields
   ```

3. **Data Transformation**
   ```javascript
   // Each row becomes:
   {
     awb: "trimmed airway bill number",
     rawb: "trimmed return airway bill",
     city: "trimmed city name",
     item: "trimmed item description",
     orderId: "trimmed order ID",
     orderNumber: "trimmed order number",
     orderType: "trimmed order type",
     packId: "trimmed pack ID",
     packedBy: "trimmed packer ID",
     location: "trimmed location",
     tour: "trimmed country",
     packingEnd: "validated date object"
   }
   ```

### Performance Metrics Calculation

#### Units Per Hour (UPH)

```javascript
uph = totalItems / totalWorkingHours;
```

#### Units Per Order (UPO)

```javascript
upo = totalItems / totalOrders;
```

#### Working Time Calculation

- Break time is configurable (default: 40 minutes)
- Gaps between orders > break time are excluded
- Only productive time is counted

### File Naming Convention

#### Current Data File

- **Location**: `data/dispatch-report.csv`
- **Purpose**: Active data for dashboard
- **Update Frequency**: Daily/Real-time

#### Archive Files

- **Location**: `data/Archive/`
- **Naming**: `dispatch-report till [DATE] @ [TIME] hrs.csv`
- **Purpose**: Historical data backup

### Common Data Issues

#### Missing or Invalid Data

- **Empty cells**: Treated as empty strings
- **Invalid dates**: Automatically converted if possible
- **Missing staff mapping**: Shows original ID instead of name

#### Data Quality Checks

- Duplicate detection and removal
- Date format validation
- Staff ID verification
- Order completeness validation

### Troubleshooting Data Issues

#### "No data found"

1. Check CSV file exists in `data/` directory
2. Verify column headers match exactly
3. Ensure date formats are correct
4. Check for data within selected date range

#### Staff Names Not Showing

1. Verify `Packed by` values exist in CSV
2. Update `src/config.js` with missing staff mappings
3. Ensure 4-character staff ID format

#### Incorrect Calculations

1. Verify date formats in `Packing End` column
2. Check break time settings
3. Validate order and item counts manually

### Data Security

#### Sensitive Information

- Staff personal information in config only
- No customer personal data exposed
- Airway bill numbers may contain sensitive routing info

#### Data Handling

- All processing done client-side
- No data transmitted to external servers
- Local file access only

### Performance Considerations

#### Large Files

- Files > 10MB may cause browser performance issues
- Consider splitting large datasets by date
- Use data pagination for very large datasets

#### Memory Usage

- Large datasets stored in browser memory
- Clear data when switching files
- Monitor browser memory consumption
