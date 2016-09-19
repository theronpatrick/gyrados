## Dependencies

Clone or download zip files from [GitHub](https://github.com/theronpatrick/gyrados/tree/master/gyrados). <br>
Make sure you have [node](https://nodejs.org/) installed. <br>
To install dependencies run `npm install` from the project directory. 

## Running

In the project directory, you can run:

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

You can run the app using any static server, such as
```
npm install -g pushstate-server
pushstate-server build
open http://localhost:9000
```

To view in development mode you can run 

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Development Notes

I spent several hours this weekend putting together this app.  The most time consuming part was working with the data structures provided.  In some cases, like the operators, it seems to make more sense to use a hash object instead of an array of objects with ids and values.

One known limitation is that "Category" is enumerated but has filter type "has any", so correct input is really a multi-select for this, but implementing or using a library for a custom multi-select dropdown seemed out of scope for this exercise.  Check boxes could work too for this small data set, but in more realistic cases there'd be 10+ categories, so it really should be in a dropdown.

There were also a couples errors I found in `datastore.js`. The first product lists `property_values` instead of `properties`.  Also, it is missing a comma after its first product's `propert_type`.  
