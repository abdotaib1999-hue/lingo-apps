// Android app: reads site.txt and prepares the Capacitor project.
const fs = require("fs");
const site = fs.readFileSync("site.txt", "utf8").trim();
if (!/^https:\/\/[^/]+\.[^/]+/.test(site) || site.includes("YOUR-NAME")) {
  console.error("Edit site.txt: put your real https:// website address in it.");
  process.exit(1);
}
fs.mkdirSync("www", { recursive: true });
fs.writeFileSync("www/index.html", "<!doctype html><title>Lingo</title>");
fs.writeFileSync("capacitor.config.json", JSON.stringify({
  appId: "app.lingo.chat", appName: "Lingo", webDir: "www",
  server: { url: site, androidScheme: "https", allowNavigation: [new URL(site).hostname] },
}, null, 2));
