## About project
This is the Excel project that was created using Pure JavaScript only.

The following basic features are implemented in this project:
1. SPA custom framework
2. pages routing
3. simple components rendering (without Virtual DOM or Shadow DOM)
4. global state storage object (like Redux)
5. global events emitter object for data transmission between components
6. using localStorage for state saving
7. custom library for DOM operations (like JQuery)

Some new features have been added by me:
1. new cells selection logic (using mouse)
2. highlighting the selection of a group of cells along the outer contour
3. add focus to the end of the line inside div contenteditable cells
4. unselect row and column headings during cells resizing
5. adding the ability to enter a formula in a cell
6. getting a formula of an active cell (or value when cell is inactive)
7. delete styles and data from a selected group of cells (using delete button)

## Links
The project idea was taken from Vladilen Minin programming course.
You can find out more information at the following links:
1. https://www.vladilen.dev/
2. https://www.youtube.com/channel/UCg8ss4xW9jASrqWGP30jXiw
3. https://github.com/vladilenm

## Start
It's a "non build" version of the project.

To start this project on your local machine you need to follow the next steps:
1. install the modules using the command `npm install`
2. start project using the commands `npm start` or `npm run start`

To start building a project use the command `npm run build`.
The "build" version of the project will be located in the directory `/dist`.
