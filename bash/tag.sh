#!/bin/bash

# Function to validate tag format
validate_tag_format() {
    if ! [[ $1 =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo "Error: Tag format is invalid. It should be in the format v0.0.0"
        exit 1
    fi
}

# Function to check if tag already exists
check_tag_exists() {
    if git rev-parse "$1" >/dev/null 2>&1; then
        echo "Error: Tag $1 already exists locally"
        exit 1
    fi

    if git ls-remote --tags origin | grep -q "refs/tags/$1"; then
        echo "Error: Tag $1 already exists in remote repository"
        exit 1
    fi
}

if [ $# -ne 1 ]; then
    echo "Usage: $0 <tag_name>"
    exit 1
fi

TAG_NAME=$1

# Validate tag format
validate_tag_format "$TAG_NAME"

# Check if tag already exists
check_tag_exists "$TAG_NAME"

git tag "$TAG_NAME"
git push origin "$TAG_NAME"

echo "Tag $TAG_NAME created and pushed successfully."