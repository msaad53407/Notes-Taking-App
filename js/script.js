import templateNoteCard, { getDate } from "./templateNoteCard.js";

// Getting all DOM Elements to be used in the app
const themeSwitcher = document.querySelector(".theme-switcher__icon"),
  notesContainer = document.querySelector(".notes-container"),
  addNoteForm = document.querySelector(".add-note-button__modal form"),
  addNoteIcon = document.querySelector(".notes-container__add-note-button i"),
  addNoteModal = document.querySelector(
    ".notes-container__add-note-button dialog"
  ),
  closeNoteModal = document.querySelector(
    ".add-note-button__modal__note-cancel"
  ),
  forms = document.querySelectorAll("form"),
  headingInput = document.querySelector(
    ".add-note-button__modal__note-heading"
  ),
  descriptionInput = document.querySelector("#note-description"),
  notesCount = document.querySelector(".notes-count"),
  filterButton = document.querySelector(".filter-button"),
  filterModal = document.querySelector(".filter-modal"),
  filterOptions = document.getElementsByName("filter"),
  filterOption1 = document.getElementById("filter-option-1"),
  filterOption2 = document.getElementById("filter-option-2"),
  filterSubmitButton = document.querySelector(".filter-modal__submit"),
  searchInput = document.querySelector(".header__search-bar input"),
  searchButton = document.querySelector(".header__search-bar .bx.bx-search"),
  searchResults = document.querySelector(".search-results"),
  searchResultsContainer = document.querySelector(".search__results__container"),
  searchHeading = document.querySelector(".search-results h3");


let notesArr = JSON.parse(localStorage.getItem("tasks")) || [];
let previousSearchInputValue;

// Function which opens the target modal
const openModal = (targetModal) => {
  return function () {
    targetModal.showModal();
    targetModal.classList.add("active");
  };
};

// Function which closes the target modal
const closeModal = (targetModal) => {
  return function () {
    targetModal.close();
    targetModal.classList.remove("active");
  };
};

const addNotes = () => {
  //Using Destructuring assignment to get all variables returned by templateNoteCard function.
  const [
    noteCard,
    noteCardHeading,
    noteCardDescription,
    noteHeading,
    noteDescription,
    noteCardTimingAdded,
    noteCardTimingEdited,
    noteId
  ] = templateNoteCard();

  // Adding required details to the noteCard
  noteCardHeading.innerText = headingInput.value;
  noteCardDescription.innerText = descriptionInput.value;

  noteHeading.value = noteCardHeading.innerText;
  noteDescription.value = noteCardDescription.innerText;

  //Invoking date function with required arguments to get and display date when note is added.
  getDate(noteCardTimingAdded, "Added");
  notesContainer.insertAdjacentElement("beforeend", noteCard);

  //Pushing the details of the note to the notesArr array to be stored in the local storage.
  notesArr.push({
    'id': (noteId - 1),
    'heading': noteCardHeading.innerText,
    'description': noteCardDescription.innerText,
    'timingAdded': noteCardTimingAdded.innerText,
    'timingEdited': noteCardTimingEdited.innerHTML
  });
  localStorage.setItem(`tasks`, JSON.stringify(notesArr));

  addNoteModal.close();
  headingInput.value = "";
  descriptionInput.value = "";

  notesCount.innerText = `${notesContainer.childElementCount - 1}`;
};

const filterFunction = (target1, target2) => {
  // Reversing the notesArr array to reverse the order of the notes to emulate filtering functionality.
  const notesArr = Array.from(
    document.querySelectorAll(".notes-container__note-card")
  );
  target2.disabled = false;
  target1.disabled = true;
  target1.checked = false;
  const reversedArr = notesArr.reverse();
  notesArr.forEach(elem => {
    elem.remove();
  });
  reversedArr.forEach(elem => {
    notesContainer.insertAdjacentElement("beforeend", elem);
  });
}

const filterNotes = () => {
  let filterValue;
  filterOptions.forEach(option => {
    //Looping through the filterOptions array to find the selected filter option and setting it to the filterValue variable.
    if (option.checked) {
      filterValue = option.value;
    }
  });

  if (filterValue === "latest" && parseInt(notesCount.innerText) > 1) {
    filterFunction(filterOption1, filterOption2);
  } else if (filterValue === "oldest" && parseInt(notesCount.innerText) > 1) {
    filterFunction(filterOption2, filterOption1);
  }
};

const getNotes = (targetArr, targetContainer) => {
  targetArr.forEach(note => {
    // For each note in the notesArr array, creating a new noteCard element, adding necessary details and appending it to the targetContainer
    const [
      noteCard,
      noteCardHeading,
      noteCardDescription,
      noteHeading,
      noteDescription,
      noteCardTimingAdded,
      noteCardTimingEdited
    ] = templateNoteCard();
    noteCard.setAttribute('id', note.id);
    noteCardHeading.innerText = note.heading;
    noteCardDescription.innerText = note.description;
    noteCardTimingAdded.innerText = note.timingAdded;
    noteCardTimingEdited.innerHTML = note.timingEdited;
    targetContainer.insertAdjacentElement("beforeend", noteCard);
  });
};

const searchNotes = () => {
  const searchInputValue = searchInput.value
  //Filtering the notesArr array to only include notes that contain the searchInputValue in their heading or description
  const resultNotes = notesArr.filter(note => note.heading.toLowerCase().includes(searchInputValue.toLowerCase()) || note.description.toLowerCase().includes(searchInputValue.toLowerCase()))
  //Hiding the Notes Container and showing the search results Container which contains the filtered notes.
  if (!notesContainer.classList.contains('disabled')) {
    notesContainer.classList.add("disabled");
  }
  if (searchResults.classList.contains("disabled")) {
    searchResults.classList.remove("disabled");
  }
  if (resultNotes.length > 0) {
    if (searchInputValue !== previousSearchInputValue) {
      // Checking if the search input value is different from the previous search input value.
      searchHeading.innerHTML = `Search Results for: <span class="search-results__heading__span">${searchInputValue}</span>`
      searchResultsContainer.innerHTML = "";
      getNotes(resultNotes, searchResultsContainer);
    } else {
      searchHeading.innerText = `Cannot search duplicate results. Try typing something else.`;
    }
  } else {
    searchHeading.innerText = 'No matching results found'
    searchResultsContainer.innerHTML = "";
  }
  previousSearchInputValue = searchInputValue;
}

window.addEventListener("DOMContentLoaded", function () {
  // When the page loads, get the notes from the local storage and display them in the notes container and also applys the stoerd theme.
  getNotes(notesArr, notesContainer);
  notesCount.innerText = `${notesContainer.childElementCount - 1}`;
  const theme = localStorage.getItem("theme");
  document.body.classList.toggle(theme);
  if (document.body.classList.contains("dark")) {
    themeSwitcher.classList.replace("bi-moon", "bi-sun");
  } else {
    themeSwitcher.classList.replace("bi-sun", "bi-moon");
  }
});

// Theme switcher function to change the theme of the app.
themeSwitcher.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    this.classList.replace("bi-moon", "bi-sun");
    localStorage.setItem("theme", "dark");
  } else {
    this.classList.replace("bi-sun", "bi-moon");
    localStorage.removeItem("theme");
  }
});

// Event Listeners to handle all respective events.
addNoteIcon.addEventListener("click", openModal(addNoteModal));
closeNoteModal.addEventListener("click", closeModal(addNoteModal));

addNoteForm.addEventListener("submit", e => {
  e.preventDefault();
  addNotes();
});

filterButton.addEventListener("click", () => filterModal.classList.toggle("active"));

filterSubmitButton.addEventListener("submit", filterNotes);

searchButton.addEventListener("click", searchNotes);
searchInput.addEventListener('keypress', e => {
  if (e.key === "Enter") {
    searchNotes();
  }
})