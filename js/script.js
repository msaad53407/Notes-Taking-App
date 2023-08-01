import templateNoteCard, { getDate } from "./templateNoteCard.js";

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

forms.forEach(form => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
});

let notesArr = JSON.parse(localStorage.getItem("tasks")) || [];
let previousSearchInputValue;

const openModal = (targetModal) => {
  return function () {
    targetModal.showModal();
    targetModal.classList.add("active");
  };
};

const closeModal = (targetModal) => {
  return function () {
    targetModal.close();
    targetModal.classList.remove("active");
  };
};

const addNotes = () => {
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
  noteCardHeading.innerText = headingInput.value;
  noteCardDescription.innerText = descriptionInput.value;

  noteHeading.value = noteCardHeading.innerText;
  noteDescription.value = noteCardDescription.innerText;

  getDate(noteCardTimingAdded, "Added");
  notesContainer.insertAdjacentElement("beforeend", noteCard);
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

const filterNotes = () => {
  let filterValue;
  filterOptions.forEach(option => {
    if (option.checked) {
      filterValue = option.value;
    }
  });
  const notesArr = Array.from(
    document.querySelectorAll(".notes-container__note-card")
  );

  if (filterValue === "latest" && parseInt(notesCount.innerText) > 1) {
    filterOption2.disabled = false;
    filterOption1.disabled = true;
    filterOption1.checked = false;
    const reversedArr = notesArr.reverse();
    notesArr.forEach(elem => {
      elem.remove();
    });
    reversedArr.forEach(elem => {
      notesContainer.insertAdjacentElement("beforeend", elem);
    });
  } else if (filterValue === "oldest" && parseInt(notesCount.innerText) > 1) {
    filterOption1.disabled = false;
    filterOption2.disabled = true;
    filterOption2.checked = false;
    const reversedArr = notesArr.reverse();
    notesArr.forEach(elem => {
      elem.remove();
    });
    reversedArr.forEach(elem => {
      notesContainer.insertAdjacentElement("beforeend", elem);
    });
  }
};

const getNotes = (targetArr, targetContainer) => {
  targetArr.forEach(note => {
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
  const resultNotes = notesArr.filter(note => note.heading.toLowerCase().includes(searchInputValue.toLowerCase()) || note.description.toLowerCase().includes(searchInputValue.toLowerCase()))
  if (!notesContainer.classList.contains('disabled')) {
    notesContainer.classList.add("disabled");
  }
  if (searchResults.classList.contains("disabled")) {
    searchResults.classList.remove("disabled");
  }
  if (resultNotes.length > 0) {
    if (searchInputValue !== previousSearchInputValue) {
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

addNoteIcon.addEventListener("click", openModal(addNoteModal));
closeNoteModal.addEventListener("click", closeModal(addNoteModal));

addNoteForm.addEventListener("submit", addNotes);

filterButton.addEventListener("click", (e) => {
  filterModal.classList.toggle("active");
});

filterSubmitButton.addEventListener("submit", filterNotes);

searchButton.addEventListener("click", searchNotes);
searchInput.addEventListener('keypress', e => {
  if (e.key === "Enter") {
    searchNotes();
  }
})