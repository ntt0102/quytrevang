# npm i protobufjs

npx pbjs --es6 index.js messages.proto

# npm i protobufjs-cli

npx pbjs -t static-module -w commonjs -o index.js messages.proto

# google-protobuf

protoc --plugin=protoc-gen-js=D:\Software\ProjectTool\protoc-29.2-win64\plugins\protobuf-javascript-3.21.4\bin\protoc-gen-js.exe --js_out=import_style=commonjs,binary:. messages.proto
