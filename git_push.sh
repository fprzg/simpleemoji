#!/bin/bash

# Exit script if any command fails
set -e

# Colors for better output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting the build process...${NC}"

# Run npm build
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Build completed successfully!${NC}"
else
    echo "Build failed. Exiting script."
    exit 1
fi

# Ask for commit message
echo -e "${YELLOW}Please enter a commit message:${NC}"
read commit_message

# If no message is provided, use a default message
if [ -z "$commit_message" ]; then
    commit_message="Updated build $(date '+%Y-%m-%d %H:%M:%S')"
    echo "No message provided. Using default message: $commit_message"
fi

# Ask for branch name
echo -e "${YELLOW}Please enter the branch name to push to:${NC}"
read branch_name

# If no branch name is provided, use current branch
if [ -z "$branch_name" ]; then
    branch_name=$(git symbolic-ref --short HEAD)
    echo "No branch name provided. Using current branch: $branch_name"
fi

# Stage all changes
echo -e "${YELLOW}Staging all changes...${NC}"
git add .

# Commit changes
echo -e "${YELLOW}Committing changes...${NC}"
git commit -m "$commit_message"

# Push to the specified branch
echo -e "${YELLOW}Pushing to branch '$branch_name'...${NC}"
git push origin $branch_name

echo -e "${GREEN}Done! Successfully built, committed, and pushed to '$branch_name'.${NC}"
