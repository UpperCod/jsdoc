# @uppercod/jsdoc

Returns JSDOC type comments in simple block format, for later analysis.

## Install

```
npm install @uppercod/jsdoc
```

## Example

```js
import { parse, parseComment } from "@uppercod/jsdoc";

parseComment(`
description...
@param {number} foo - bla bla...
`);

[
    { children: ["description..."] },
    {
        tag: "param",
        type: "number",
        name: "foo",
        children: ["bla bla..."],
    },
];
```
