# Data Processor Template

NodeJS based boilerplate code to transform Excel/CSV Data into structured JSON.

## Setting up

* Copy the CSV/Excel into the `data` directory
* If required, update the processData script in `package.json` to run `fetchCSV.js` or `fetchXlsx.js`
* In `fetchCSV.js` or `fetchXlsx.js`, make sure the file name matches the name of the spreadsheet
* OPTIONAL: Ensure eslint is set up on your Text Editor

## Processing CSV

By default, a CSV will be processed into an array of objects. Each object represents one line of data, with the object keys matching the header row.
```
[
  {
    "header1": "foo",
    "header2": 123
  },
  {
    "header1": "bar",
    "header2": 456
  },
  {
    "header1": "baz",
    "header2": 789
  }
]
```

## Processing Xlsx
Sheets can be included/excluded in order to select only the data that is relevant to the desired output. `includeSheets` and `excludeSheets` cannot be used together. If `includeSheets` is used, **only** sheets that are specified will be pulled into the data processor.

### Single Sheet
If only a single sheet is included, data will be written to an array of objects with each object representing one line of data
```
[
  {
    "header1": "foo",
    "header2": 123
  },
  {
    "header1": "bar",
    "header2": 456
  },
  {
    "header1": "baz",
    "header2": 789
  }
]
```

### Multi Sheet
Excel Spreadsheets with more than one tab included are processed as an object with keys corresponding to the tab names, each value being an array of objects representing data within that sheet

```
{
  "Sheet1":  [
    {
      "header1": "foo",
      "header2": 123
    },
    {
      "header1": "bar",
      "header2": 456
    },
    {
      "header1": "baz",
      "header2": 789
    }
  ],
  "Sheet2": [
    {
      "some-other-header": "01-01-2019"
    },
    {
      "some-other-header": "01-01-2020"
    },
    {
      "some-other-header": "01-01-2021"
    }
  ]
}
```

## Running the script
```
# installation
npm i

# Fetch Data and process into JSON
npm run dataProcessor
```
