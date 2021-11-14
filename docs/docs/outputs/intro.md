# Formats

## JSON

Once you have finished adding everything you need to the project, you can simply call `output()` method on the project to convert everything to plain ol JSON.

```typescript
const project = new Project({...}).output()
```

In fact all the classes in this project has an `output()` method to convert them to JSON.

## CSV (coming soon)

Exporting to CSV will be the next priority

```typescript
const project = new Project({...}).output("csv")
```

## 3rd Party Transformers (coming soon)

Not started this yet, but had the idea of a suite of transformers that can take the project and correctly transform the data, then output the new data. For Example a Jira transformer might look something like...

```typescript

const project = new Project({...})

//  A Jira transformer example
new JiraTransformer({project, options})

// A Google Sheets transformer
new GoogleSheetsTransformer({project, options})

```
