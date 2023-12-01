let font = "Open Sans";
let font_size = 20;
let weight_bold = 600;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({font, font_size, weight_bold});
  console.log('Setting default font to ${font}', `font: ${font}`);
  console.log('Setting default font size to ${font_size}', `font_size: ${font_size}`);
  console.log('Setting default bold to ${weight_bold}', `weight_bold: ${weight_bold}`);

});
