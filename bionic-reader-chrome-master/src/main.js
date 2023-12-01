// Press the convert button to translate the current page
document.getElementById("convert").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['src/content-script.js']
  }, () => {

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: convertPageToBionic,
    });
  });
});

// Use keyboard shortcut to translate the current page
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "convert") {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['src/content-script.js']
    }, () => {
  
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: convertPageToBionic,
      });
    });
  }
  });

// Fetch the font & font size and update the settings form
chrome.storage.sync.get(['font', 'font_size', 'weight_bold'], ({ font, font_size, weight_bold }) => {
  updateFont(font);
  updateFontSize(font_size);
  updateWeight(weight_bold) // added this
});

// If the slider is moved, we'll update the font size
document.getElementById('font_size').addEventListener("change", function() {
  font_size = document.getElementById('font_size').value;
  chrome.storage.sync.set({ font_size });
  updateFontSize(font_size);
}, false);

// If the font dropdown is changed, we'll update the font
document.getElementById('font').addEventListener("change", function() {
  font = document.getElementById('font').value;
  chrome.storage.sync.set({ font });
  updateFont(font);
}, false);

// If weight slider is changed
document.getElementById('weight_bold').addEventListener("change", function() {
  weight_bold = document.getElementById('weight_bold').value;
  chrome.storage.sync.set({ weight_bold });
  updateWeight(weight_bold);
}, false);

function updateFontSize(font_size) {
  document.getElementById('font_size').value = font_size;
  document.getElementById('font_size_output').textContent = font_size;
  console.log('Setting font size to ${font_size}', `font_size: ${font_size}`);
}

function updateFont(font) {
  document.getElementById('font').value = font;
  console.log('Setting font to ${font}', `font: ${font}`);
}

/** Change boldness weight */
function updateWeight(weight_bold) {
  document.getElementById('weight_bold').value = weight_bold;
  document.getElementById('weight_bold_output').textContent = weight_bold;
  console.log('Setting weight to ${weight_bold}', `weight_bold: ${weight_bold}`)
}

//** Update Slider Colors */

fontSlider.addEventListener('input', updateSliderColors);
weightSlider.addEventListener('input', updateSliderColors);

function convertPageToBionic() {
  const font_settings = {
    "Arial":            { "weight_default": 100}, 
    "Comic Sans":       { "weight_default": 100}, 
    "Noto Sans":        { "weight_default": 100}, 
    "Open Sans":        { "weight_default": 100},  
    "Roboto":           { "weight_default": 100},  
    "Sans Serif":       { "weight_default": 100},  
    "Source Sans Pro":  { "weight_default": 100},  
    "Times New Roman":  { "weight_default": 100} 
  }

  chrome.storage.sync.get(['font', 'font_size', 'weight_bold'], ({ font, font_size, weight_bold }) => {
    // Add font to page
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = 'bionic-reader-font';
    link.href = `//fonts.googleapis.com/css?family=${font.replace(' ', '+')}:100,200,500,600,650,700,800,900`;
    document.head.appendChild(link);

    // Style the page
    var style = document.createElement("style");
    style.textContent = `p,h1,h2,h3,h4,h5,h6,ul,li,a { font-family: '${font}' !important; font-weight: ${font_settings[font]['weight_default']} !important; } p { font-size: ${font_size}px; } b { font-weight: ${weight_bold} !important } `; 
    document.head.appendChild(style);
  });

  // Only translate once
  if (document.body.classList.contains('bionic-reader-translated') === false) {
    // Translate all paragraphs and lists to Bionic Reading
    let paragraphs = document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,ul,li');
    for (let paragraph of paragraphs) {
      paragraph.innerHTML = translateParagraphToBionic(paragraph.innerHTML);
    }

    // Keep track of the Bionic translation
    document.body.classList.add('bionic-reader-translated');
  }
}
