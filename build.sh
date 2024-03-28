#!/usr/bin/bash
docker login
check=false
if [ -f docker-compose.yml ]; then
    docker compose build 
    docker compose up -d 
    docker tag doanchuyennganh-backend:latest gioimtg2003/backend-shippy:latest 
    docker tag doanchuyennganh-nginx-backend:latest gioimtg2003/nginx-backend-shippy:latest 
    sleep 2
    docker push gioimtg2003/backend-shippy:latest 
    sleep 1
    docker push gioimtg2003/nginx-backend-shippy:latest 
    docker container rm -f $(docker container ps -aq) 
    check=true
fi
check=false
if [ -f docker-compose.frontend.yml ]; then
    docker compose -f docker-compose.frontend.yml up -d
    docker tag doanchuyennganh-frontend:latest gioimtg2003/front-end-shippy:latest 
    docker tag doanchuyennganh-nginx-frontend:latest gioimtg2003/nginx-front-end-shippy:latest 
    echo "Push image to docker hub..."
    docker push gioimtg2003/front-end-shippy:latest 
    sleep 1
    docker push gioimtg2003/nginx-front-end-shippy:latest 
    echo "Remove all container..."
    docker container rm -f $(docker container ps -aq) 
    check=true
fi

if [ $check = true ]; then
    cd ~
    
fi

