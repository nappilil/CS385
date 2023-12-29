import {
  bionify,
  defaultHighlightSheet,
  defaultRestSheet,
  defaultAlgorithm,
} from "./utils.js";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    highlightSheet: defaultHighlightSheet,
    restSheet: defaultRestSheet,
    autoApply: false,
    algorithm: defaultAlgorithm,
  });
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-bionify") {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: bionify,
    });
  }
});