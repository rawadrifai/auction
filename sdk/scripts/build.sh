npm run clean;

babel src --out-dir ./build --ignore test.js;

cp -R ./src/contracts ./build;

cp ./package.json ./build;
