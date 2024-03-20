import "dotenv/config";
import express, { Express, NextFunction, Request, Response } from "express";
import path from "path";
import { JSDOM } from "jsdom";
import { existsSync } from "fs";
import { readFile } from "fs/promises";

const rootDoc = path.join(process.cwd(), "static");
const rootEditable = path.join(process.cwd(), "editable");

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(async (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl } = req;
  if (method.toUpperCase() !== "GET") {
    return next();
  }
  let url = originalUrl.split("?")[0];
  if (/\/$/g.test(originalUrl)) {
    url = path.join(originalUrl, "index.html");
  }
  if (["/editable.js", "/editable.css"].includes(url)) {
    return res.sendFile(path.join(rootEditable, url));
  }
  if (/.html$/g.test(url)) {
    const filePath = path.join(rootDoc, url);
    if (existsSync(filePath)) {
      const contents = await readFile(filePath, { encoding: "utf8" }).catch(
        () => ""
      );
      const dom = new JSDOM(contents);
      const document = dom.window.document;
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "/editable.js";
      document.body.appendChild(script);
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "/editable.css";
      document.head.appendChild(link);
      document.head.insertAdjacentHTML(
        "beforeend",
        `<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>`
      );
      return res.send(dom.serialize());
    }
  }
  next();
}, express.static(rootDoc));
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
