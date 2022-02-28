# QA_Hometask_Deel
This repo is created for Deel.

Firstly, you should:
1. Download the code.
2. Unzip the code.
  a: Open the folder in terminal.
  b: Navigate to the folder where package.json is placed
3. Execute the following command "npm install"
4. Execute this command to run your test: "npm run test"
5. When test execution is completed and you want to generate the report run the following command "npm run generate-report"


This script is written to automate these steps:
  1. Sign in **https://app.deel.training/login**
  2. Create a "Fixed Rate"  contract

- Language: JS
- Automation test framework: Playwright (https://playwright.dev/)
- Test runner: mocha (https://mochajs.org/) 
- Reporter: allure (https://docs.qameta.io/allure/)
