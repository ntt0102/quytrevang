1. Set enviroment variable PATH:
   ~\protobuf\protoc-3.20.3-win64\bin

2. Install:
   npm install

3. command:

    1. protoc --js_out=library=../smartpro/tcbs,binary:. tcbs.proto
    2. copy node_modules\google-protobuf\google-protobuf.js ..\smartpro\google-protobuf.js
