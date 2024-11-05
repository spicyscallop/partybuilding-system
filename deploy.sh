#!/bin/bash
# 通用项目名称
project_name="party_building_system"

# 获取包含特定IMAGE的CONTAINER ID
container_id=$(docker ps --filter "ancestor=$project_name" --format "{{.ID}}")

# 如果container_id非空，则进行相关操作
if [ -n "$container_id" ]; then
    echo "Found container with ID: $container_id"
    # 在此处执行您的操作，例如停止或删除容器
    docker stop $container_id
    docker rm $container_id
    echo "Container has been removed"
fi

# 获取包含特定IMAGE的IMAGE ID
image_id=$(docker images --filter=reference=$project_name --format "{{.ID}}")

# 如果image_id非空，则进行相关操作
if [ -n "$image_id" ]; then
    echo "Found image with ID: $image_id"
    # 在此处执行您的操作
    docker image rm $image_id
    echo "Image has been removed"
fi

# 重新打包项目
docker build -t party_building_system .
#运行image
docker run -dp 9000:9000 party_building_system