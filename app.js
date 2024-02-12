'use strict';

var helloIndex = 0;
var cursorOffset = 16;
var activeEntryIndex;
var activeMenuIndex;

const cursor = document.querySelector('#cursor');
const container = document.querySelector('.container');
const hello = container.querySelector('.hello-message');
const helloPrefix = container.querySelector('.hello-prefix');
const helloSuffix = container.querySelector('.hello-suffix');
const helloDelay = 6000;
const helloTranslations = [
  ["salut, sunt", ""],
  ["howdy, I'm", ""],
  ["salut, je suis", ""],
  ["hola, soy", ""],
  ["Για σου, είμαι ο", ""],
  ["szia,", "vagyok"],
  ["ciao, sono", ""],
  ["hallo, ich bin", ""],
  ["привіт, я", ""],
  ["cześć, jestem", ""],
  ["hei, jeg er", ""]
];
const menuRow = container.querySelector('.menu-row');
const sectionsRow = container.querySelector('.sections-row');
const vectorGallery = container.querySelector('.gallery[data-category="vectors"]'), vectorGalleryEntries = [];
const codeGallery = container.querySelector('.gallery[data-category="code"]'), codeGalleryEntries = [];

var moveCursor = e => {
  cursor.style.left = `${e.pageX - cursorOffset}px`;
  cursor.style.top = `${e.pageY - cursorOffset}px`;
}

var dilateCursor = () => {
  cursor.style.setProperty('--scale', 1.5);
  cursor.style.setProperty('--border-width', '1.3px');
}

var contractCursor = () => {
  cursor.style.setProperty('--scale', 1);
  cursor.style.setProperty('--border-width', '2px');
}

var configCursor = () => {
  document.body.classList.add('hide-cursor');
  document.body.addEventListener('mousemove', moveCursor);

  document.querySelectorAll('[data-clickable]').forEach(option => {
    option.addEventListener('mouseover', dilateCursor)
    option.addEventListener('mouseout', contractCursor)
  })
}

var restyleHello = (o, t_Y) => {
  hello.style.setProperty('--opacity', o);
  hello.style.setProperty('--translateY', `${t_Y}%`);
}

var switchHelloLang = () => {
  restyleHello(0, 80);

  window.setTimeout(() => {
    restyleHello(0, -80);

    helloIndex = ++helloIndex % helloTranslations.length;
    helloPrefix.textContent = helloTranslations[helloIndex][0];
    helloSuffix.textContent = helloTranslations[helloIndex][1];
    hello.style.left = `${helloPrefix.offsetWidth / 2 - helloSuffix.offsetWidth / 2}px`;

    window.setTimeout(() => { 
      restyleHello(1, 0);
    }, 250);
  }, 250)

}

var restyleSectionsRow = (o, t_X = 0, t_Y = 0) => {
  sectionsRow.style.setProperty('--section-opacity', o);
  sectionsRow.style.setProperty('--section-transform', `translate(${t_X}%, ${t_Y}%)`);
}

var handleSectionExpansion = (...args) => {
  sectionsRow.querySelectorAll('.section').forEach(section => { section.classList.remove('expanded'); });
  
  if (args.length > 0) {
    var section = sectionsRow.querySelector(`[data-section-index="${args[0]}"]`);
    section.classList.add('expanded');
  }
}

var toggleMenuOption = e => {
  if (!e.target.classList.contains('menu-option') || e.target.classList.contains('expanded')) return;
  
  var option = e.target;
  let optionIndex = option.dataset.menuIndex;

  menuRow.querySelectorAll('.menu-option').forEach(option => { option.classList.remove('expanded'); });
  option.classList.add('expanded');

  container.classList.add('section-expanded');

  if (typeof activeMenuIndex !== 'undefined') {
    
    if (optionIndex < activeMenuIndex) {
      // handle RTL switch
      
      restyleSectionsRow(0, 5, 0);
      window.setTimeout(() => {
        handleSectionExpansion(optionIndex);
        restyleSectionsRow(0, -5, 0);
        window.setTimeout(() => { restyleSectionsRow(1, 0, 0) }, 50);
      }, 500);
    } else if (optionIndex > activeMenuIndex) {
      // handle LTR switch

      restyleSectionsRow(0, -5, 0);
      window.setTimeout(() => {
        handleSectionExpansion(optionIndex);
        restyleSectionsRow(0, 5, 0);
        window.setTimeout(() => { restyleSectionsRow(1, 0, 0) }, 50);
      }, 500);
    } 
  } else {
    // handle BTT switch

    handleSectionExpansion(optionIndex);
    window.setTimeout(() => {
      restyleSectionsRow(1, 0, 0);
      window.setTimeout(() => { sectionsRow.style.setProperty('--section-transition-duration', '.3s') }, 1000);
    }, 500)
  }

  activeMenuIndex = e.target.dataset.menuIndex;
}

var openGalleryEntry = e => {
  const entryId = e.target.dataset.id;
  activeEntryIndex = vectorGalleryEntries.findIndex(entry => entry.id == entryId);

  const overlay = document.createElement('div');
  overlay.classList.add('preview-overlay');

  const closeButton = document.createElement('div');
  closeButton.textContent = "close";
  closeButton.dataset.clickable = "";
  closeButton.classList.add('preview-close', 'underline');
  closeButton.onclick = closeGalleryEntry;

  const pagination = document.createElement('div');
  pagination.classList.add('preview-pagination');
  pagination.innerHTML = `<span class="pag-current"></span><span class="divider">/</span><span class="pag-total">${vectorGalleryEntries.length}</span>`;

  const popup = document.createElement('div');
  popup.classList.add('preview-popup');

  const image = document.createElement('img');
  image.classList.add('preview-image');

  const details = document.createElement('p');
  details.classList.add('preview-details');
  details.innerHTML = `<span class="preview-name"></span> <span class="divider">|</span> <span class="preview-description"></span>`;

  popup.appendChild(image);
  popup.appendChild(details);
  popup.appendChild(closeButton);
  popup.appendChild(pagination);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  window.setTimeout(() => {
    document.body.style.setProperty('--overlay-opacity', 1);

    window.setTimeout(() => {
      document.body.style.setProperty('--overlay-popup-opacity', 1);
      document.body.style.setProperty('--overlay-popup-translateY', 0);
    }, 150);
  }, 100);

  showEntry(activeEntryIndex);

  window.addEventListener('keyup', closeGalleryEntry);
  window.addEventListener('keyup', switchGalleryEntry);
}

var showEntry = index => {
  const entry = vectorGalleryEntries[index];
  const imageSrc = entry.imageSrc;
  const name = entry.name;
  const desc = entry.desc;
  document.querySelector('.pag-current').textContent = activeEntryIndex + 1;
  document.querySelector('.preview-image').src = imageSrc;
  document.querySelector('.preview-name').textContent = name;
  document.querySelector('.preview-description').innerHTML = desc;
}

var switchGalleryEntry = e => {
  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
  
  if (e.key === "ArrowLeft") {
    if (activeEntryIndex === 0) return;
    activeEntryIndex = /* activeEntryIndex === 0 ? vectorGalleryEntries.length - 1 : */ --activeEntryIndex;
  } else {
    if (activeEntryIndex === vectorGalleryEntries.length - 1) return;
    activeEntryIndex = ++activeEntryIndex /* % vectorGalleryEntries.length; */
  }

  showEntry(activeEntryIndex);
}

var closeGalleryEntry = e => {
  if (e.type === 'keyup' && e.key !== 'Escape') return;

  document.body.style.setProperty('--overlay-popup-opacity', 0);
  document.body.style.setProperty('--overlay-popup-translateY', '10%');
  
  window.setTimeout(() => {
    document.body.style.setProperty('--overlay-opacity', 0);

    window.setTimeout(() => {
      document.querySelector('.preview-overlay').remove();
      document.body.style.setProperty('--overlay-popup-translateY', '-10%');
    }, 500);
  }, 300);
  
  window.removeEventListener('keyup', closeGalleryEntry);
  window.removeEventListener('keyup', switchGalleryEntry);
}

var gotoGalleyEntry = e => {
  window.open(`projects/${e.target.dataset.path}`, '_blank');
}

var buildGallery = (entries, type) => {
  var id = 0;
  for (var entry of entries) {
    entry.id = ++id;
    var newEntry = document.createElement('div');
    newEntry.classList.add('gallery-entry');
    newEntry.dataset.clickable = "";
    newEntry.dataset.id = entry.id;
    newEntry.style.setProperty('--src', `url('${entry.imageSrc}')`);
    newEntry.innerHTML = `
      <div class="entry-thumbnail"></div>
      <p class="entry-name">${entry.name}</p>
    `;

    if (type === 'vector') {
      newEntry.onclick = e => openGalleryEntry(e);
      vectorGallery.appendChild(newEntry);
      vectorGalleryEntries.push(entry);
    } else {
      newEntry.dataset.path = entry.path;
      newEntry.onclick = e => gotoGalleyEntry(e);
      codeGallery.appendChild(newEntry);
      codeGalleryEntries.push(entry);
      // configCursor();
    }
  }
}

fetch("gallery-vectors.json")
  .then(response => response.json())
  .then(json => buildGallery(json, 'vector'));

fetch("gallery-code.json")
  .then(response => response.json())
  .then(json => buildGallery(json, 'code'));

window.onload = () => {
  switchHelloLang();
  window.setInterval(switchHelloLang, helloDelay);
  
  document.querySelector('.menu-row').addEventListener('click', e => toggleMenuOption(e));
}