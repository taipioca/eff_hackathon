
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is the project layout:

### src:
- App.js contains the "home" page content
- viz.js is the vizualization page renderer
- BarChart.js has the Bar chart Component
- Bubble.js has the bubble viz Component
- TrackerTab.js has the tracker list tab Component
- Routes.js has the routes for home page and viz page
- Index.js is component that renders the routes
- fonts has the fonts we used for the project

### server.js:
- Backend
- It contains the POST and GET request for the file upload
- Posts file to data folder

### data:
- Folder inside src that contains the uploaded .json file by user containing tracker dataset


## Project setup

In the project directory, you can run:

```
npm install
```

### To begin development, run

```
npm start
```

### To begin server.js, run

```
nodemon server.js
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
