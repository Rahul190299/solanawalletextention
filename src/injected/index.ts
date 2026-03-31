// src/injected/index.ts
// @ts-ignore
window.solana = {
  connect: async () => {
    return request("CONNECT");
  },
};

function request(type: string) {
  return new Promise((resolve) => {
    const id = Math.random();

    window.postMessage({ id, type }, "*");

    window.addEventListener("message", function handler(event) {
      if (event.data.id === id) {
        resolve(event.data.response);
        window.removeEventListener("message", handler);
      }
    });
  });
}