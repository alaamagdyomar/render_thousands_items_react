# render_thousands_items_react

Run the application steps:

    1 - npm install 
    2 - npm start


    ................................................................................

The structure that i will build 👍

i will build a table component that holds (10,000)thousands of items without the hit with the bad performance that caused from each rendering  

Pesudo code :👍

1- initialize the application with npx command 
2- create dommy data as a list that holds (10,000) items 
3- passing the whole data as props to the specific components that will render that list 
4- creating a Table component that will holds that list as (class component)
5- implement the functionality of the virtualized list to render the list with the best performance 
6- make the each row in the table editable 


// changes to make the code clean from the previous version :-

// 0- change the component from class component to React functional component.
// 1- Destructured the props object in the function signature to make the code more concise.
// 2- Removed the state for tableHeight because it's not used anywhere else in the component.
// 3- Simplified the onScroll function by destructuring the scrollTop value and using it directly in calculations.
// 4- Changed the generateRows function to use a for loop instead of a while loop, as it is generally considered more readable.
// 5- Moved the cells array creation into a separate variable to make the code more concise.
// 6- Removed the default prop for rowHeight because it's already declared in the prop types.



👍 after finishing that visualize process there are steps to move in the next steps and i search for resources and found that link in order to move in the next steps :
https://dev.to/nishanbajracharya/what-i-learned-from-building-my-own-virtualized-list-library-for-react-45ik