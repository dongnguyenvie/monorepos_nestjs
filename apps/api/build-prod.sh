#!/bin/bash
imageName=noinghe/api:latest
containerName=noinghe-api-container

docker build  --target production -t $imageName -f Dockerfile  .

echo Delete old container...
docker rm -f $containerName

echo Run new container...
docker run -d -p 7000:7000 -p 1080:1080 --name $containerName $imageName


docker rmi $(docker images -f "dangling=true" -q)