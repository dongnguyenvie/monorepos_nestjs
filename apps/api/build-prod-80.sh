#!/bin/bash
imageName=noinghe/api:latest
containerName=noinghe-api-container

docker build  --target production -t $imageName -f Dockerfile  .

echo Delete old container...
docker rm -f $containerName

echo Run new container...
docker run -d -p 80:7000 --name $containerName $imageName


docker rmi $(docker images -f "dangling=true" -q)