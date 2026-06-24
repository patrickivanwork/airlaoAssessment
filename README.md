# Airalo Playwright Demo
# Patrick Ivan


This project contains Playwright tests (TypeScript) for AirAlo interview assesment


###Prerequisites
Ensure a relatively new version of Node.js (and Npm) are installed on your system https://nodejs.org/en/download/current


###Setup
In a command line window (CMD/Bash/Powershell) navigate to the root of the project folder (same level with the package.json file ) and run the following commands:

npm install
npm run install-playwright



###Runing tests (from command line)

//run all tests
npm run test

//Run just the UI tests
npm run test:ui

//Run just the UI tests but with headed browser
npm run test:headed

//Run just the API tests
npm run test:api


###Results

test results will appear in a html file generated inside this folder <playwright-report>


###Project Structure

This is a Playwright automation project.
2 subprojects were configured: one to contain the UI automation and the other to contain the API automation
The configuration of these projects resides in this root level file: <playwright.config.ts>

###UI Automation Task

For the UI automation, the Page Object Model pattern was used.
The files inside /pages encapsulate the logic used to navigate the site and ensure elements are ready to be interacted with.
I opted to put all the relevant UI locators and methods in the same file on this occasion for ease of use. If I was to expand the project, I would segregate out elements that are always on screen into their own components (like the search bar, header and footer) and structure the rest of the pages based on the available navigation paths or URL structure, and then create fixtures to abstract out duplication or verbosity.

I opted to write the same test in 2 ways and the tests are found here: tests/ui/ui.spec.ts

I think both approaches have their merits: first one showcases the main journey and implies standards and best practices validate each step in the background, while the second one explicitly validates every step of the journey, showcasing every assertion

I opted to parameterize the test inputs in order to be able to try out different test options and also to make it easier to transition the test to be Data driven in the future.

Another decision point was to not save the price of the selected package onto the class at the time of selection in order not to pollute the POM with test data. I opted instead to identify the selected package and its price based on the visibility of the description element (that gets attached to the package after selection)


###API Automation Task

The API test is found here: tests\api\api.spec.ts

I opted to write a single test in which to call and assess all 3 endpoints because the tasks requires chaining the requests (calling endpoints with details retrieved by other enpoints)
For each call, I verified that the response came back with a status of 200 and that the response body contained a success message.

I also checked that the generated eSims created by the /order request match in terms of details with the individual eSims returned by the /sims endpoint, confirming a successful serverside flow.

I did copy over the interfaces of the API responses into this folder models\apiResponses\ and i utilized them in my tests mostly to outline the expected structure of the responses and to get some intelisense in terms of json traversal, but I opted out of validating the schema for this exercise

If i were to write more tests I would opt to extract out the authentication call into a fixture and potentially store the token in a file for any future use for a reasonable amount of time. I would also abstract out and create a custom request context to encapsulate the most used parameter and header options.