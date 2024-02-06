'use strict';

var helloIndex = 0;
var cursorOffset = 16;
var activeEntryIndex;

const cursor = document.querySelector('#cursor');
const container = document.querySelector('.container');
const hello = container.querySelector('.hello-message');
const helloPrefix = container.querySelector('.hello-prefix');
const helloSuffix = container.querySelector('.hello-suffix');
const helloDelay = 3000;
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
const gallery = container.querySelector('.gallery');
const galleryEntries = [];

var configCursor = () => {
  document.body.style.cursor = 'none';
  document.body.addEventListener('mousemove', e => {
    cursor.style.left = `${e.pageX - cursorOffset}px`;
    cursor.style.top = `${e.pageY - cursorOffset}px`;
  })

  document.querySelectorAll('[data-clickable]').forEach(option => {
    option.addEventListener('mouseover', () => {
      cursor.style.setProperty('--scale', 1.5);
      cursor.style.setProperty('--border-width', '1.3px');
    })
    option.addEventListener('mouseout', () => {
      cursor.style.setProperty('--scale', 1);
      cursor.style.setProperty('--border-width', '2px');
    })
  })
}

var switchHelloLang = () => {
  helloIndex = ++helloIndex % helloTranslations.length;
  helloPrefix.textContent = helloTranslations[helloIndex][0];
  helloSuffix.textContent = helloTranslations[helloIndex][1];
  hello.style.left = `${helloPrefix.offsetWidth / 2 - helloSuffix.offsetWidth / 2}px`;
}

switchHelloLang();
window.setInterval(switchHelloLang, helloDelay);

document.querySelector('.menu-row').addEventListener('click', e => {
  if (!e.target.classList.contains('menu-option') || e.target.classList.contains('expanded')) return;
  
  menuRow.querySelectorAll('.menu-option').forEach(option => { option.classList.remove('expanded'); });
  e.target.classList.add('expanded');

  sectionsRow.querySelectorAll('.section').forEach(section => { section.style.display = 'none'; });
  var section = sectionsRow.querySelector(`[data-section="${e.target.dataset.toggle}"]`);
  // sectionsRow.style.height = `${section.offsetHeight}px`;
  section.style.display = 'block';
})

var openGalleryEntry = e => {
  const entryId = e.target.dataset.id;
  activeEntryIndex = galleryEntries.findIndex(entry => entry.id == entryId);

  const overlay = document.createElement('div');
  overlay.classList.add('preview-overlay');

  const closeButton = document.createElement('div');
  closeButton.textContent = "X";
  closeButton.dataset.clickable = "";
  closeButton.classList.add('preview-close');
  closeButton.onclick = closeGalleryEntry;

  const popup = document.createElement('div');
  popup.classList.add('preview-popup');

  const image = document.createElement('img');
  image.classList.add('preview-image');

  popup.appendChild(image);
  overlay.appendChild(popup);
  overlay.appendChild(closeButton);
  document.body.appendChild(overlay);

  showEntry(activeEntryIndex);

  window.addEventListener('keyup', closeGalleryEntry);
  window.addEventListener('keyup', switchGalleryEntry);
}

var showEntry = index => {
  const entry = galleryEntries[index];
  const imageSrc = entry.path;
  document.querySelector('.preview-image').src = imageSrc;
}

var switchGalleryEntry = e => {
  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
  
  if (e.key === "ArrowLeft") {
    activeEntryIndex = activeEntryIndex === 0 ? galleryEntries.length - 1 : --activeEntryIndex;
  } else {
    activeEntryIndex = ++activeEntryIndex % galleryEntries.length;
  }

  showEntry(activeEntryIndex);
}

var closeGalleryEntry = e => {
  if (e.type === 'keyup' && e.key !== 'Escape') return;

  document.querySelector('.preview-overlay').classList.add('closing');
  document.querySelector('.preview-image').style.opacity = 0;
  document.querySelector('.preview-image').style.transform = 'translateY(10px)';
  
  window.setTimeout(() => document.querySelector('.preview-overlay').remove(), 500);
  window.removeEventListener('keyup', closeGalleryEntry);
  window.removeEventListener('keyup', switchGalleryEntry);
}

fetch("gallery.json")
  .then(response => response.json())
  .then(json => buildGallery(json));

var buildGallery = entries => {
  for (var entry of entries) {
    galleryEntries.push(entry);
    var newEntry = document.createElement('div');
    newEntry.classList.add('gallery-entry');
    newEntry.dataset.clickable = "";
    newEntry.dataset.id = entry.id;
    newEntry.onclick = e => openGalleryEntry(e);
    newEntry.style.setProperty('--path', `url('${entry.path}')`);
    newEntry.innerHTML = `
      <div class="entry-thumbnail"></div>
      <div class="entry-details">
        <p class="entry-name">${entry.name}</p>
        <p class="entry-description">${entry.desc}</p>
      </div>
    `;

    gallery.appendChild(newEntry);
  }

  // configCursor();
}