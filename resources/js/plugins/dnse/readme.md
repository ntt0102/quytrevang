# npm i protobufjs-cli --save-dev

npx pbjs -t static-module -w es6 -o index.js messages.proto

# npm i protobufjs --save-dev

npx pbjs --es6 index.js messages.proto
