module.exports = {
    entry: "./static/js/src/main.js",
    output: {
        path: __dirname + "/static/js",
        filename: "app.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};
