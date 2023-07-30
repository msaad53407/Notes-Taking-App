import templateNoteCard, { getDate } from "./templateNoteCard.js";

const themeSwitcher = document.querySelector('.theme-switcher__icon'),
    notesContainer = document.querySelector('.notes-container'),
    addNoteButton = document.querySelector('.add-note-button__modal__note-add'),
    addNoteIcon = document.querySelector('.notes-container__add-note-button i'),
    addNoteModal = document.querySelector('.notes-container__add-note-button dialog'),
    closeNoteModal = document.querySelector('.add-note-button__modal__note-cancel'),
    forms = document.querySelectorAll('form'),
    headingInput = document.querySelector('.add-note-button__modal__note-heading'),
    descriptionInput = document.querySelector('#note-description'),
    notesCount = document.querySelector('.notes-count'),
    filterButton = document.querySelector('.filter-button'),
    filterModal = document.querySelector('.filter-modal'),
  filterOptions = document.getElementsByName('filter'),
  filterOption1 = document.getElementById('filter-option-1'),
  filterOption2 = document.getElementById('filter-option-2'),
  filterSubmitButton = document.querySelector('.filter-modal__submit');

forms.forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault()
    })
})

notesCount.innerText = `${(notesContainer.childElementCount) - 1}`

const theme = localStorage.getItem('theme')
document.body.classList.toggle(theme)

if (document.body.classList.contains('dark')) {
    themeSwitcher.classList.replace('bi-moon', 'bi-sun')
} else {
    themeSwitcher.classList.replace('bi-sun', 'bi-moon')
}

themeSwitcher.addEventListener('click', function () {
    document.body.classList.toggle('dark')
    if (document.body.classList.contains('dark')) {
        this.classList.replace('bi-moon', 'bi-sun')
        localStorage.setItem('theme', 'dark')
    } else {
        this.classList.replace('bi-sun', 'bi-moon')
        localStorage.removeItem('theme')
    }
})

const openModal = (targetModal) => {
    return function () {
        targetModal.showModal()
        targetModal.classList.add('active')
    }
}

const closeModal = (targetModal) => {
    return function () {
        targetModal.close()
        targetModal.classList.remove('active')
    }
}

const addNote = () => {
    const [noteCard, noteCardHeading, noteCardDescription, noteHeading, noteDescription, noteCardTimingAdded] = templateNoteCard();
    noteCardHeading.innerText = headingInput.value;
    noteCardDescription.innerText = descriptionInput.value;

    noteHeading.value = noteCardHeading.innerText
    noteDescription.value = noteCardDescription.innerText

    notesContainer.insertAdjacentElement('beforeend', noteCard)

    getDate(noteCardTimingAdded, 'Added')

    addNoteModal.close()
    headingInput.value = ''
    descriptionInput.value = ''

    notesCount.innerText = `${(notesContainer.childElementCount) - 1}`
}

const filterNotes = () => {
    let filterValue;
  filterOptions.forEach(option => {
  if (option.checked) {
    filterValue = option.value
  }
  })
  const notesArr = Array.from(document.querySelectorAll('.notes-container__note-card'));

  if (filterValue === 'latest' && parseInt(notesCount.innerText) > 1) {
    filterOption2.disabled = false
    filterOption1.disabled = true
    filterOption1.checked = false
    const reversedArr = notesArr.reverse()
    notesArr.forEach(elem => {
  elem.remove()
})
reversedArr.forEach(elem => { notesContainer.insertAdjacentElement('beforeend', elem)
})
  } else if (filterValue === 'oldest' && parseInt(notesCount.innerText) > 1) {
    filterOption1.disabled = false
    filterOption2.disabled = true
    filterOption2.checked = false
    const reversedArr = notesArr.reverse()
    notesArr.forEach(elem => {
  elem.remove()
})
reversedArr.forEach(elem => { notesContainer.insertAdjacentElement('beforeend', elem)
})
}
}
addNoteIcon.addEventListener('click', openModal(addNoteModal))
closeNoteModal.addEventListener('click', closeModal(addNoteModal))

addNoteButton.addEventListener('click', addNote)

filterButton.addEventListener('click', e => {
    filterModal.classList.toggle('active')
})

filterSubmitButton.addEventListener('submit',filterNotes)