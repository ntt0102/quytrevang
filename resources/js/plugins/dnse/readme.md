Chạy 1 trong các lệnh dưới trong thư mục hiện tại

# 1. protoc

Run:
npm install -g protoc-gen-js

Add enviroment:
%AppData%\npm

Run:
npm install google-protobuf

Run:
protoc --js_out=import_style=commonjs,binary:. mdds.proto

Replace:
line 1:
import \* as jspb from "google-protobuf";
line end:
export const mdds_pb = proto.proto.mdds.v1;

# 2. npm i protobufjs-cli --save-dev

Run:
npx pbjs -t static-module -w es6 -o index.js mdds.proto

# 3. npm i protobufjs --save-dev

Run:
npx pbjs --es6 index.js mdds.proto
