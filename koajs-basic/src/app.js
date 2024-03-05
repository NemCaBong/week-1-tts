const Koa = require("koa");
const { koaBody } = require("koa-body");
const render = require("koa-ejs");
const routes = require("./routes/routes");
const path = require("path");

const app = new Koa();

render(app, {
  root: path.join(__dirname, "views"),
  // trong layout có file template chứa nội dung html
  layout: "layout/template",
  viewExt: "html",
  cache: false,
  debug: true,
});

app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(5000);
