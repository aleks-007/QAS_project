# QAS_project

QA Sandbox

Prerequisites:

Install node.js 

https://nodejs.org/en/download/ , use the .msi extension and follow instructions.

If any problems, use this: https://www.guru99.com/download-install-node-js.html 

Install Cypress

 Create project folder 
 Open cmd and follow:
        cd your/path
        npm init 
        npm install cypress –save-dev
        npx cypress open

NOTE: Second command will ask for details, you can skip it by pressing enter.

If any problems, use this: https://docs.cypress.io/guides/getting-started/installing-cypress.html#Opening-Cypress

Install Mochawesome reporter

Step 1:

In project folder:

npm install mocha --save-dev
npm install cypress-multi-reporters --save-dev
npm install mochawesome --save-dev
npm install mochawesome-merge --save-dev
npm install mochawesome-report-generator –save-dev

Step 2:

Add reporter settings in cypress.json

"reporter": "cypress-multi-reporters",
    "reporterOptions": {
        "reporterEnabled": "mochawesome",
        "mochawesomeReporterOptions": {
            "reportDir": "cypress/reports/mocha",
            "quite": true,
            "overwrite": false,
            "html": false,
            "json": true
        }
    }
Step 3:
Add scripts in package.json file (Windows)
"scripts": {
    "clean:reports": "rmdir /S /Q cypress\\reports && mkdir cypress\\reports 
         && mkdir cypress\\reports\\mochareports",
    "pretest": "npm run clean:reports",
    "scripts": "cypress run",
    "combine-reports": "mochawesome-merge
         cypress/reports/mocha/*.json > cypress/reports/mochareports/report.json",
    "generate-report": "marge cypress/reports/mochareports/
         report.json -f report -o cypress/reports/mochareports",
    "posttest": "npm run combine-reports && npm run generate-report",
    "test" : "npm run scripts || npm run posttest"
  }
Test Execution:
as-a kps npm run test (to get HTML report)
as-a kps npx cypress open → UI
If any problem occur check link : https://dev.to/bushraalam/using-mochawesome-reporter-with-cypress-54pf 
Setup Secret Password

https://github.com/bahmutov/as-a
https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/

How to call via cmd: 

as-a kps npx cypress open
 Or

$ CYPRESS_password=secret npx cypress open|run










