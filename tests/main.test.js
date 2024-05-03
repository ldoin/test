import { test, expect } from 'vitest';
import { Window } from 'happy-dom';
import { readFileSync } from 'fs';
import { getContrast } from 'polished';

// Fonction pour vérifier si le contraste est suffisant pour un élément
const isContrastSufficient = (textColor, backgroundColor) => {
  const contrastRatio = getContrast(textColor, backgroundColor);
  // Remplacez 4.5 par le ratio de contraste minimal requis selon les WCAG (par exemple, 4.5 pour le texte normal)
  return contrastRatio >= 4.5;
};

test('Contrast between text and background', async () => {
  const window = new Window()
  const document = window.document;

  // Charger le contenu de index.html
  const html = readFileSync('index.html', 'utf-8');
    
  document.write(html);
  await window.happyDOM.waitUntilComplete();

  // Charger la feuille de style déclarée dans index.html
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  stylesheets.forEach((stylesheet) => {
    const href = stylesheet.getAttribute('href');
    const cssContent = readFileSync(href, 'utf-8');
    const style = document.createElement('style');
    style.textContent = cssContent;
    document.head.appendChild(style);
  });

  // Extraire les styles des éléments
  const title = document.querySelector('h1');
  
  const titleColor = window.getComputedStyle(title).color;
  const titleBackgroundColor = window.getComputedStyle(title).getPropertyValue("background-color") || '#333';

  const paragraph = document.querySelector('p');
  const paragraphColor = window.getComputedStyle(paragraph).color;
  const paragraphBackgroundColor = window.getComputedStyle(paragraph).getPropertyValue("background-color") || '#333';
  
  
  // Assert
  let sufficientContrast = isContrastSufficient(titleColor, titleBackgroundColor);
  expect(sufficientContrast).toBeTruthy(); 

  sufficientContrast = isContrastSufficient(paragraphColor, paragraphBackgroundColor);
  expect(sufficientContrast).toBeTruthy(); 
  await window.happyDOM.close();
});
