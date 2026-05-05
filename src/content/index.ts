// src/content/index.ts

// inject script
const script = document.createElement("script");
// @ts-ignore
script.src = chrome.runtime.getURL("injected.js");
document.documentElement.appendChild(script);

// bridge
window.addEventListener("message", async (event) => {
  if (event.source !== window) return;
  
  // @ts-ignore
  const response = await chrome.runtime.sendMessage(event.data);

  window.postMessage({ id: event.data.id, response }, "*");
});

function openPopup(mode :string) {
  // @ts-ignore
  chrome.windows.create({
    url: `popup.html?mode=${mode}`,
    type: "popup",
    width: 400,
    height: 600
  });
}