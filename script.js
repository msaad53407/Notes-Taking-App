const themeSwitcher = document.querySelector('.theme-switcher__icon'),
    addNoteIcon = document.querySelector('.notes-container__add-note-button i'),
    addNoteModal = document.querySelector('.notes-container__add-note-button dialog'),
    closeNoteModal = document.querySelector('.add-note-button__modal__note-cancel'),
    editNoteIcon = document.querySelector('.note-card__options__edit.bx.bxs-edit'),
    editNoteModal = document.querySelector('.edit-note-button__modal'),
    closeEditModal = document.querySelector('.edit-note-button__modal__note-cancel');


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
    }
}

const closeModal = (targetModal) => {
    return function () {
        targetModal.close()
    }
}

addNoteIcon.addEventListener('click', openModal(addNoteModal))
editNoteIcon.addEventListener('click', openModal(editNoteModal))

closeNoteModal.addEventListener('click', closeModal(addNoteModal))
closeEditModal.addEventListener('click', closeModal(editNoteModal))

