1. Set enviroment variable PATH:
   ~\protobuf\protoc-3.20.3-win64\bin

2. Install:
   npm install

3. command:
   protoc --js_out=library=tcbs,binary:. tcbs.proto

4. Ouput files:
   1. tcbs.js
   2. node_modules/google-protobuf/google-protobuf.js
