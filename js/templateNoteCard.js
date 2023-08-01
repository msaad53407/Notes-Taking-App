// Function which gets current date and displays them in the respective target element.
export const getDate = (targetElement, message) => {
    let year = new Date().getFullYear(),
        monthNumber = new Date().getMonth(),
        date = new Date().getDate(),
        hours = new Date().getHours(),
        minutes = new Date().getMinutes(),
        monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        amPm,
        currentMonth = monthsName[monthNumber];

    hours = hours > 12 ? hours - 12 : hours;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    amPm = hours >= 12 ? 'PM' : 'AM'
    targetElement.innerHTML = `${message}: <br/> ${date} ${currentMonth} ${year} at ${hours}:${minutes} ${amPm}`
    return targetElement.innerHTML;
}

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

// NoteId variable which will be used to generate unique note ids which will be given to the note card elements and aswell as to the data in local storage.
let noteId = 1;

// Function which creates a new note card template and returns the elements to be modified where the function will be invoked.
const templateNoteCard = () => {
    // Creating Element which will be used to create the note card template.
    const noteCard = document.createElement('div'),
        noteCardHeading = document.createElement('div'),
        noteCardHeadingH3 = document.createElement('h3'),
        noteCardDescription = document.createElement('div'),
        noteCardDescriptionPara = document.createElement('p'),
        noteCardTiming = document.createElement('div'),
        noteCardTimingAdded = document.createElement('div'),
        noteCardTimingAddedSpan = document.createElement('span'),
        noteCardTimingEdited = document.createElement('div'),
        noteCardTimingEditedSpan = document.createElement('span'),
        noteCardOptions = document.createElement('div'),
        noteCardOptionsDelete = document.createElement('button'),
        noteCardOptionsEdit = document.createElement('i'),
        dialog = document.createElement('dialog'),
        form = document.createElement('form'),
        formH3 = document.createElement('h3'),
        noteHeading = document.createElement('input'),
        noteDescription = document.createElement('textarea'),
        modalButtons = document.createElement('div'),
        noteCancel = document.createElement('input'),
        noteUpdate = document.createElement('input');

    // Adding classes to the note card template.
    noteCard.classList.add('notes-container__note-card')
    noteCardHeading.classList.add('note-card__heading')
    noteCardDescription.classList.add('note-card__description')
    noteCardTiming.classList.add('note-card__timing')
    noteCardTimingAdded.classList.add('note-card__timing__time-added')
    noteCardTimingEdited.classList.add('note-card__timing__time-edited')
    noteCardOptions.classList.add('note-card__options')
    noteCardOptionsDelete.classList.add('note-card__options__delete')
    noteCardOptionsEdit.classList.add('bx')
    noteCardOptionsEdit.classList.add('bxs-edit')
    noteCardOptionsEdit.classList.add('note-card__options__edit')
    dialog.classList.add('edit-note-button__modal')

    // Adding attributes to the note card template.
    noteCard.setAttribute('id', noteId)
    noteHeading.setAttribute('type', 'text')
    noteHeading.classList.add('edit-note-button__modal__note-heading')
    noteHeading.setAttribute('placeholder', 'Note Title here...')


    noteDescription.classList.add('edit-note-button__modal__note-description')
    noteDescription.setAttribute('name', 'note-description')
    noteDescription.setAttribute('placeholder', 'Note Description here...')

    modalButtons.classList.add('modal-buttons')

    noteCancel.classList.add('edit-note-button__modal__note-cancel')
    noteCancel.setAttribute('type', 'button')
    noteCancel.setAttribute('value', 'Cancel')

    noteUpdate.classList.add('edit-note-button__modal__note-update')
    noteUpdate.setAttribute('type', 'submit')
    noteUpdate.setAttribute('value', 'Update')

    // Adding child elements to parent note card template.
    noteCard.insertAdjacentElement('beforeend', noteCardHeading)
    noteCard.insertAdjacentElement('beforeend', noteCardDescription)
    noteCard.insertAdjacentElement('beforeend', noteCardTiming)
    noteCard.insertAdjacentElement('beforeend', noteCardOptions)

    noteCardHeading.appendChild(noteCardHeadingH3)
    noteCardHeadingH3.innerText = `Pickup Watch`

    noteCardDescription.appendChild(noteCardDescriptionPara)
    noteCardDescriptionPara.innerText = `I have to pickup my watch from the table before leaving the house`

    noteCardTiming.insertAdjacentElement('beforeend', noteCardTimingAdded)
    noteCardTimingAdded.appendChild(noteCardTimingAddedSpan)
    noteCardTimingAddedSpan.innerHTML = ``

    noteCardTiming.insertAdjacentElement('beforeend', noteCardTimingEdited)
    noteCardTimingEdited.appendChild(noteCardTimingEditedSpan)

    noteCardOptions.insertAdjacentElement('beforeend', noteCardOptionsDelete)
    noteCardOptionsDelete.innerText = 'Delete'

    noteCardOptions.insertAdjacentElement('beforeend', noteCardOptionsEdit)
    noteCardOptions.insertAdjacentElement('beforeend', dialog)

    dialog.appendChild(form)

    // Modifying form to update note details.
    form.insertAdjacentElement('beforeend', formH3)
    formH3.innerText = 'Edit Note'

    form.insertAdjacentElement('beforeend', noteHeading)
    noteHeading.setAttribute('required', true)
    form.insertAdjacentElement('beforeend', noteDescription)
    noteDescription.setAttribute('required', true)
    noteDescription.setAttribute('cols', '30')
    noteDescription.setAttribute('rows', '10')
    form.insertAdjacentElement('beforeend', modalButtons)

    modalButtons.insertAdjacentElement('beforeend', noteCancel)
    modalButtons.insertAdjacentElement('beforeend', noteUpdate)

    // Submitting form to update note details.
    form.addEventListener('submit', e => {
        e.preventDefault()
        let tasksArr = JSON.parse(localStorage.getItem('tasks')) || [];
        noteCardHeadingH3.innerText = noteHeading.value
        noteCardDescriptionPara.innerText = noteDescription.value
        const editDate = getDate(noteCardTimingEditedSpan, 'Last Edited')
        tasksArr.forEach(task => {
            if (task.id === (parseInt(noteCard.getAttribute('id')))) {
                task.heading = noteHeading.value;
                task.description = noteDescription.value;
                task.timingEdited = editDate;
                localStorage.setItem('tasks', JSON.stringify(tasksArr))
            }
        })
        dialog.close();
    })

    // Event Listeners to open and close Note Edit Modal.
    noteCardOptionsEdit.addEventListener('click', openModal(dialog))
    noteCancel.addEventListener('click', closeModal(dialog))

    // Event Listeners to delete note.
    noteCardOptionsDelete.addEventListener('click', e => {
        let tasksArr = JSON.parse(localStorage.getItem('tasks')) || [];
        const notesCount = document.querySelector('.notes-count');
        const notesCountNum = parseInt(notesCount.innerText)
        notesCount.innerText = notesCountNum >= 1 ? notesCountNum - 1 : notesCountNum

        if (tasksArr.length > 0) {
            tasksArr.forEach(task => {
                // Here I am looping through the tasks array and whenever a task whose id becomes equal to the note card's id, the task will be removed from the array.
                if (task.id === (parseInt(noteCard.getAttribute('id')))) {
                    //Indexof method will get the index of the task from tasks array, which satisfy the condition.
                    tasksArr.splice(tasksArr.indexOf(task), 1)
                    localStorage.setItem('tasks', JSON.stringify(tasksArr))
                    noteCard.remove();
                    location.reload();
                }
            })
        }
    })
    noteId++;
    return [noteCard, noteCardHeadingH3, noteCardDescriptionPara, noteHeading, noteDescription, noteCardTimingAddedSpan, noteCardTimingEditedSpan, noteId]
}


export default templateNoteCard;