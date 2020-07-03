chrome.browserAction.onClicked.addListener(placeholdify);

function placeholdify() {
  chrome.tabs.executeScript({
    file: "placeholdify.js",
    allFrames: true,
    frameId: 0,
  });
}
