const express = require("express");
const cors = require("cors");
const PuppeteerRoute = require("../src/router/puppeteer.route");
const app = express();

const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials:true,
    origin: ["*","http://localhost:8000/","http://127.0.0.1:8000"],
  })
);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

initializeRoutes([
    new PuppeteerRoute()
]);

function initializeRoutes(routes) {
  routes.forEach((route) => {
    app.use("/", route.router);
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
