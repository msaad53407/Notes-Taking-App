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

const templateNoteCard = () => {
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

    noteHeading.classList.add('edit-note-button__modal__note-heading')
    noteHeading.setAttribute('type', 'text')
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
    noteCardTimingEditedSpan.innerHTML = ``

    noteCardOptions.insertAdjacentElement('beforeend', noteCardOptionsDelete)
    noteCardOptionsDelete.innerText = 'Delete'

    noteCardOptions.insertAdjacentElement('beforeend', noteCardOptionsEdit)
    noteCardOptions.insertAdjacentElement('beforeend', dialog)

    dialog.appendChild(form)

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

    form.addEventListener('submit', e => {
        e.preventDefault()
    })

    noteUpdate.addEventListener('click', e => {
        noteCardHeadingH3.innerText = noteHeading.value
        noteCardDescriptionPara.innerText = noteDescription.value

        getDate(noteCardTimingEditedSpan, 'Last Edited')
        dialog.close();
    })

    noteCardOptionsEdit.addEventListener('click', openModal(dialog))
    noteCancel.addEventListener('click', closeModal(dialog))

    noteCardOptionsDelete.addEventListener('click', e => {
        const notesCount = document.querySelector('.notes-count');
        const notesCountNum = parseInt(notesCount.innerText)
        notesCount.innerText = notesCountNum >= 1 ? notesCountNum - 1 : notesCountNum
        noteCard.remove()
    })

    return [noteCard, noteCardHeadingH3, noteCardDescriptionPara, noteHeading, noteDescription, noteCardTimingAddedSpan]
}


export default templateNoteCard;