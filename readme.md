# Proto files

The proto files are downloaded from this repository: [https://github.com/greyshirtguy/ProPresenter7-Proto](https://github.com/greyshirtguy/ProPresenter7-Proto)

## How wo create typescript definition from proto files

```bash
npm install -g protobufjs-cli
```

```bash
pbjs -t static-module -w es6 -o src/proto/presentation.js proto/presentation.proto
pbts -o src/proto/presentation.d.ts src/proto/presentation.js
```
