#### Protoc generate
```
protoc -I=. BeliveRTM.proto \
--js_out=import_style=commonjs:. \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
```
protoc -I=. helloworld.proto \
--js_out=import_style=commonjs:. \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:.

docker build -t helloworld/envoy -f ./envoy.Dockerfile .
docker run -d -p 8080:8080 helloworld/envoy
python3 -m http.server 8081 


docker stop $(docker ps -a -q)

docker build -t my-envoy:1.0 .
docker run -p 8080:8080 -p 9901:9901  my-envoy:1.0


docker stop $(docker ps -a -q)

npx webpack client.js
npx webpack newClient.js



 {"blockUserId": 0, "gender": 0, "giftId": 0, "isExpensive":false, "totalLikes": 0, "message":"joinstream", "messageType": 100, "mutedUserId":0, "senderAvatar":"", "senderDisplayName": "username-111", "senderUserId": 1, "senderUserName": "username-111", "streamDuration":0, "totalReceivedStars":0, "totalViewers":0,"channel": "helloworld"}

  {"blockUserId": 0, "gender": 0, "giftId": 0, "isExpensive":false, "totalLikes": 0, "message":"joinstream", "messageType": 1, "mutedUserId":0, "senderAvatar":"", "senderDisplayName": "username-111", "senderUserId": 1, "senderUserName": "username-111", "streamDuration":0, "totalReceivedStars":0, "totalViewers":0,"channel": "helloworld"}