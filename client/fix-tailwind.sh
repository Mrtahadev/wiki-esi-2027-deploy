#!/bin/bash
# Remove the node_modules folder and package-lock.json
rm -rf node_modules
rm -f package-lock.json

# Install the correct versions of the packages
npm install --save-dev tailwindcss@3.3.3 postcss@8.4.31 autoprefixer@10.4.16

# Initialize Tailwind CSS
npx tailwindcss init -p

# Start the application
npm start 