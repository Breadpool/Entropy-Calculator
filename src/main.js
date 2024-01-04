const { app, BrowserWindow } = require('electron')


const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
    try {
      require('electron-reloader')(module)
    } catch (_) {}
    win.loadFile('./src/index.html')
  }

  

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
  




function handleFileSelect() {
  const fileInput = document.getElementById('fileInput');
  const inputArea = document.getElementById('inputArea');
  
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      
      inputArea.value = e.target.result;
    };

    reader.readAsText(file);
  }
}

function calculateEntropy() {
  
  const inputText = document.getElementById('inputArea').value;

  
  const averageInformation = calculateAverageInformation(inputText).toFixed(3);
  
  document.getElementById('resultValue').textContent = `Average Information: ${averageInformation}`;
}

function calculateAverageInformation(text) {
  const charCounts = getCharacterCounts(text);
  const totalCharacters = text.length;

  let averageInformation = 0;

  for (const char in charCounts) {
    const probability = charCounts[char] / totalCharacters;
    averageInformation -= probability * Math.log2(probability);
  }

  return averageInformation;
}


function getCharacterCounts(text) {
  const charCounts = {};

  for (const char of text) {
    if (char in charCounts) {
      charCounts[char]++;
    } else {
      charCounts[char] = 1;
    }
  }

  return charCounts;
}

function getUniformDistribution() {

  const totalCharacters = 128; 
  const uniformDistribution = {};

  for (let i = 0; i < totalCharacters; i++) {
    const char = String.fromCharCode(i);
    uniformDistribution[char] = 1 / totalCharacters;
  }

  return uniformDistribution;
}


function calculateCharacterRates(text) {
  
  const characterCounts = {};

 
  for (const char of text) {
   
    if (char in characterCounts) {
      characterCounts[char]++;
    } else {
      characterCounts[char] = 1;
    }
  }

  
  const resultValueElement = document.getElementById('resultValue');
  resultValueElement.textContent += ' | Character Log Available';
  resultValueElement.style.cursor = 'pointer';

  
  resultValueElement.dataset.characterCounts = JSON.stringify(characterCounts);
}

function showCharacterLog() {
 
  const inputText = document.getElementById('inputArea').value;

 
  const characterCounts = {};

 
  for (const char of inputText) {
   
    if (char in characterCounts) {
      characterCounts[char]++;
    } else {
      characterCounts[char] = 1;
    }
  }

  
  let logString = 'Character Appearance Log:\n';

  
  for (const char in characterCounts) {
    const charDisplay = char === ' ' ? 'SpaceBar' : (char === '\n' ? 'Enter' : char);
    logString += `${charDisplay} = ${characterCounts[char]}\n`;
  }

  

 

  document.getElementById('characterLog').textContent = logString;

const characterCount = inputText.length;


document.getElementById('characterLog').textContent += `\nTotal Characters: ${characterCount}`;


if(characterCount==0) {
  document.getElementById('characterLog').textContent += `\n\nThe input area is currently empty. Please enter text manually or choose a file with content to proceed with the calculation.`;
}

}

