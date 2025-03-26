@echo off
rem Remove the node_modules folder and package-lock.json
rmdir /s /q node_modules
del /f package-lock.json

rem Install the correct versions of the packages
npm install --save-dev tailwindcss@3.3.3 postcss@8.4.31 autoprefixer@10.4.16

rem Initialize Tailwind CSS
npx tailwindcss init -p

rem Start the application
npm start 