function placeholdify() {
  chrome.tabs.executeScript({
    code: code,
  });
}

chrome.browserAction.onClicked.addListener(placeholdify);

const href = chrome.runtime.getURL("lib/placeholdifier.css");
//"https://unpkg.com/placeholdifier@0.1.0/placeholdifier.css";
const linkId = "placeholdifier";
const code = `
const id = "${linkId}";
if (!document.getElementById(id)) {
  const head = document.getElementsByTagName("head")[0];
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "${href}";
  link.media = "all";
  head.appendChild(link);
}`;
