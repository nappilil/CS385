import {
  bionify,
  defaultHighlightSheet,
  defaultRestSheet,
  defaultAlgorithm,
} from "../utils.js";

let applyButton = document.getElementById("applyButton");
let restoreButton = document.getElementById("restore-button");
let highlightSheetInput = document.getElementById("highlight-input");
let restSheetInput = document.getElementById("rest-input");
//let algorithmInput = document.getElementById("algorithmInput");

document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('convertButton');
  button.addEventListener('mouseenter', function() {
    popup.style.display = 'block';
  });

  button.addEventListener('mouseleave', function() {
    popup.style.display = 'none';
  });

  button.addEventListener('click', function() {
    chrome.tabs.create({url: 'https://cloudconvert.com/pdf-to-html'});
  });

  var popup = document.getElementById('helpPopup');
  popup.addEventListener('mouseenter', function() {
    popup.style.display = 'block';
  });

  popup.addEventListener('mouseleave', function() {
    popup.style.display = 'none';
  });
});


var buttonEnabledClass = "button-enabled";
var buttonDisabledClass = "button-disabled";

function setClass(element, cls) {
  element.className = cls;
}

chrome.storage.sync.get(
  ["highlightSheet", "restSheet", "isOn", "algorithm"],
  (data) => {
    highlightSheetInput.value = data.highlightSheet;
    restSheetInput.value = data.restSheet;
    defaultAlgorithm.value = data.algorithm;
    //updateAutoApplyText(data.autoApply);
    updatebionifyToggle(data.isOn);
  }
);


highlightSheetInput.addEventListener("input", async (text) => {
  onHighlightInputChange();
});


restSheetInput.addEventListener("input", async (text) => {
  onRestInputChange();
});

restoreButton.addEventListener("click", async () => {
  chrome.storage.sync.set({
    highlightSheet: defaultHighlightSheet,
    restSheet: defaultRestSheet,
    algorithm: defaultAlgorithm,
  });
  highlightSheetInput.value = defaultHighlightSheet;
  restSheetInput.value = defaultRestSheet;
  //algorithmInput.value = defaultAlgorithm;
});

function updatebionifyToggle(isOn) {
  if (isOn) {
    applyButton.innerText = "Bionic On";
    setClass(applyButton, buttonEnabledClass);
  } else {
    applyButton.innerText = "Bionic Off";
    setClass(applyButton, buttonDisabledClass);
  }
}

applyButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: bionify,
  });
  chrome.storage.sync.get(["isOn"], (data) => {
    updatebionifyToggle(!data.isOn);
    chrome.storage.sync.set({ isOn: !data.isOn });
  });
});

function onHighlightInputChange() {
  chrome.storage.sync.set({ highlightSheet: highlightSheetInput.value });
}

function onRestInputChange() {
  chrome.storage.sync.set({ restSheet: restSheetInput.value });
}
/** 
function onAlgorithmInputChange() {
  chrome.storage.sync.set({ algorithm: algorithmInput.value });
}
*/