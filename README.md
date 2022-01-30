# Admin Dashboard - general information

## How to run the project?

In the project directory, you can run (after installing all packages - npm install):

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Task related information

1. Table and Forms were build with MaterialUI help. I have added some basic styling. Whole project is not fully responsive.
2. GET request fetch all the data, but I limited data in the store to the required fields in the task.
3. Taking into consideration fact that this is a test API - to maintain task functionality (edit, add, delete, sort users) I have used lodash memoize in order not to fetch data more than one time.
4. Actions related to edit and delete have id limitations (simple if statement) not to update or delete data that were added and not saved in database.
5. Just in case Edit User and Add User forms have all available fields. In the Stage 2 i was not certain if I should only inlcude name and email data (due to first point statement: "All fields can be edited.") Sorry if that was not necessary.
6. In case of forms I tried no to use any libraries like redux-forms or final-form and use only MaterialUI functionality. I have added own validation rules and validation function (located in "helpers" folder).
7. Regarding error handling - basic alerts are displayed. This is the topic for further development, but I wasn't able to finish it on time.
