// src/background/index.ts
// @ts-ignore
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "CONNECT") {
    sendResponse("PONG from background");
  }
});