# classjester
PHPUnit inspired testing framework for js. Class based js tests!

```js
const { TestCase } = require('classjester/lib/Core/TestCase');

class APITest extends TestCase {
    async testCanRun() {
        this.assertTrue(true);
    }
}

module.exports = { default: APITest };
```

Provides a clean alternative to jests nested functions.

## Install
`npm install "https://github.com/chadanuk/classjester.git#main" --save-dev`

Add this to `package.json` `scripts`:
```json
"test": "node node_modules/classjester/lib/index.js [path-to-tets]"
```

## Write
Classjester will look for files with 'test' in the name and run methods with the word 'test' in them within that class.


## Run
`npm test`
