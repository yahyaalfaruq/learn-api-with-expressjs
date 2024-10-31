// myExpress.js
const http = require("http");
const url = require("url");
class MyExpress {
  constructor() {
    this.routes = {
      GET: [],
      POST: [],
      PUT: [],
      DELETE: [],
    };
  }
  // Method untuk menambahkan route
  addRoute(method, path, handler) {
    const pathParts = path.split("/").filter((part) => part);
    this.routes[method].push({ pathParts, handler });
  }
  // Method untuk menangani request
  handleRequest(req, res) {
    const method = req.method;
    const parsedUrl = url.parse(req.url, true);
    const pathParts = parsedUrl.pathname.split("/").filter((part) => part);
    // Mencari handler yang cocok
    const route = this.routes[method].find((route) => {
      if (route.pathParts.length !== pathParts.length) {
        return false;
      }
      return route.pathParts.every((part, index) => {
        return part.startsWith(":") || part === pathParts[index];
      });
    });
    if (route) {
      req.query = parsedUrl.query;
      req.params = {};
      // Menangkap parameter dari path
      route.pathParts.forEach((part, index) => {
        if (part.startsWith(":")) {
          const paramName = part.slice(1);
          req.params[paramName] = pathParts[index];
        }
      });
      // Parsing body untuk POST dan PUT
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        req.body = body ? JSON.parse(body) : {};
        route.handler(req, res);
      });
    } else {
      res.statusCode = 404;
      res.end("Not Found");
    }
  }
  // Method untuk membuat server
  listen(port, callback) {
    const server = http.createServer((req, res) =>
      this.handleRequest(req, res)
    );
    server.listen(port, callback);
  }
  // Shortcut methods untuk route HTTP
  get(path, handler) {
    this.addRoute("GET", path, handler);
  }
  post(path, handler) {
    this.addRoute("POST", path, handler);
  }
  put(path, handler) {
    this.addRoute("PUT", path, handler);
  }
  delete(path, handler) {
    this.addRoute("DELETE", path, handler);
  }
}
module.exports = MyExpress;
