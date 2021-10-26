# plop-pack-remove

A plop action which allows you to remove individual files or many files (via glob pattern).

## Installation

```sh
yarn add plop-pack-remove
```

```sh
npm i plop-pack-remove
```

## Example

```javascript
module.exports = function(plop) {
  // Loads the gitInit action type
  plop.load('plop-pack-remove');

  plop.setGenerator('generate', {
    prompts: [
        // ...
    ],
    actions: [{
      type: 'remove',
      path: 'some/file/path.txt',
      force: true // Allow removal of files outside of the project root. Defaults to false
      skipIfNonexistent: true // When true it will skip if the file does not exist. When false, it will throw an error. Defaults to false
    },
    {
      type: 'removeMany',
      path: 'some/directory/**',
    },
    {
      type: 'removeMany',
      path: ['some/directory/**', 'some/other/directory/**', '/tmp/outside/of/project/specific-file.txt'],
      force: true // Allow removal of files outside of the project root. Defaults to false
    }];
  })
}
```
