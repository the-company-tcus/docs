# Dynamic Routes

This document shows registered dynamic routes in the project using custom plugin
`plugin-dynamic-route`.

## Getting Started

Please refer to the [API Reference](./api.md#plugin-dynamic-route) document to
learn how to add a new dynamic route using custom plugin `plugin-dynamic-route`.

## Routes

### `/pdf-viewer`

Route to view PDF file.

#### Query Parameters

- `url` (string): Required.

  - URL of the PDF file.

- `title` (string):

  - The title of the PDF file.

- `embedMode` (string):

  - Supported embed modes of PDF Embed API.
  - Values: "FULL_WINDOW" | "SIZED_CONTAINER" | "IN_LINE" | "LIGHT_BOX".
  - Default: "FULL_WINDOW".

#### Example

```
/pdf-viewer?url=https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf&title=Bodea%20Brochure&embedMode=FULL_WINDOW
```

### `/releases`

Route to view release notes.

In progress...

### `/releases/view/{owner}/{repo}`

Route to view release list of a repository within a time range.

#### Path Parameters

- `owner` (string): Required.

  - The account owner of the repository. The name is not case sensitive.

- `repo` (string): Required.

  - The name of the repository. The name is not case sensitive.

#### Query Parameters

- `from` (string):

  - Start date of the time range. Format: MM-DD-YYYY.

- `to` (string):

  - End date of the time range. Format: MM-DD-YYYY.

#### Example

```
/releases/view/nocodb/nocodb?from=11-30-2022&to=01-04-2023
```
