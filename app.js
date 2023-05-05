const noteList = document.getElementById('note-list');
const noteForm = document.querySelector('#note-form form');
const searchInput = document.getElementById('search');

let notes = [];

// Load saved notes from local storage
if (localStorage.getItem('notes')) {
  notes = JSON.parse(localStorage.getItem('notes'));
  displayNotes();
}

// Add event listener to note form
noteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('note-title').value;
  const body = document.getElementById('note-body').value;
  const note = { title, body };
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
  displayNotes();
  noteForm.reset();
});

// Display all saved notes
function displayNotes() {
  noteList.innerHTML = '';
  notes.forEach((note, index) => {
    const li = document.createElement('li');
    const title = document.createElement('h3');
    const body = document.createElement('p');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    
    title.textContent = note.title;
    body.textContent = note.body;
    deleteButton.textContent = 'Delete';
    editButton.textContent = 'Edit';
  
    deleteButton.addEventListener('click', () => {
      notes.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      displayNotes();
    });

    editButton.addEventListener('click', () => {
      const newTitle = prompt('Enter new title:', note.title);
      const newBody = prompt('Enter new body:', note.body);
      const updatedNote = { title: newTitle, body: newBody };
      const updatedNotes = notes.map((n, i) => i === index ? updatedNote : n);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      displayNotes();
    });

    li  
    .appendChild(title);
    li.appendChild(body);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    noteList.appendChild(li);
  });
}

// Add event listener to search input
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(searchTerm) || note.body.toLowerCase().includes(searchTerm);
  });
  noteList.innerHTML = '';
  filteredNotes.forEach((note) => {
    const li = document.createElement('li');
    const title = document.createElement('h3');
    const body = document.createElement('p');
    title.textContent = note.title;
    body.textContent = note.body;
    li.appendChild(title);
    li.appendChild(body);
    noteList.appendChild(li);
  });
});

// Make website responsive
const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
if (viewportWidth < 768) {
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    section.style.width = '100%';
  });
} 
