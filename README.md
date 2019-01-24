# Guidelines
Submit the task on GIT.

Code should work on the latest version of Chrome.

Stack: ES6/ES7, React, Redux, Jest, Enzyme

## Mock

Creates 400 random properties (with id from 10000 to 10399) (200 with type Home,  200 with type Condo).
Each second the price and timestamp of the property is updated. Update of each property is being sent independently
within the subscription.
To create the subscription in src/App.js:

properties$.subscribe((propertyUpdate) => console.log('propertyUpdate'));

The mock is Rx.js observable. You should not change it or work with it directly by using any operators on the stream.
The knowledge of Rx.js is not required, it is used in the test only to generate frequent updates of data.

## Tasks to implement

1. Create the table of all the properties with such columns:
    - ID
    - Address
    - Price
    - Last Update
    - Type
    - Is in favorite

## !!The table should be visually updated with the latest data each 2 seconds!!

2. Provide an ability to sort by each field in both directions (asc and desc)
3. Add an ability to add a property to favorites by clicking on a heart icon in "Is in favorite" column.
The properties, that are added to fav, should always go first in the table (for all sort settings)
4. Add an input, that searches the property by Address, ID or Type. When a user types in the input - the block with
autosuggestion should appear below the input with the list of properties, that match the criteria. The up-to-date price
of the property should appear next to it.
5. If a user clicks enter on the input - the table should be filtered according to the value of the input.

Additional:
1) Cover the implementation by tests using Jest and Enzyme.
2) Implement some trottling logic on the input in order to avoid redundant updates.
3) Provide a decent design to the solution, pay attention to css.

Use the best practises regarding React/Redux applictions in order to achive the best performance and UX in this
mini-application.

## Run the boilerplate
    - npm install
    - npm start
