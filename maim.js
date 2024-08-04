// select all elements

let noteArea = document.querySelector(".note-area");
let noteText = document.querySelector(".note-text");
let title = document.querySelector(".title");
let note = document.querySelector(".note");
let notes = document.querySelector("#notes");


const showNoteArea = () => {
    noteText.style = 'display : block';
    noteArea.classList.add('note-now');
    title.setAttribute('placeholder','Title');
    title.style = 'font-size: 20px';
}


const hideNoteArea = () => {
    noteText.style = 'display: none';
    noteArea.classList.remove('note-now')
}

const adNoteToLocalStorage = (note) => {

    if(note.length < 0){
        return;
    }

    let oldNote;

    if(localStorage.getItem("notes") === null) {
        oldNote = [];
    }else {
        oldNote = JSON.parse(localStorage.getItem('notes'));
    }

    oldNote.push(note);

    localStorage.setItem('notes',JSON.stringify(oldNote));
}

const getNotesFormLocalStorage = () => {

    if(localStorage.getItem("notes") === null) {
        oldNote = [];
    }else {
        oldNote = JSON.parse(localStorage.getItem('notes'));
    }


    oldNote.forEach(note => {
        
        notes.innerHTML += `<div class="note">
        <h3 class="title-text" id="title-text">${note[0]}</h3>
        <p class="note-blog">${note[1]}</p>
        <i class="fa-solid fa-trash"></i>
    </div>`;

    })

}


const deleteFormLocalStorage = (deletedNote) => {

    let oldNote;

    if(localStorage.getItem("notes") === null) {
        oldNote = [];
    }else {
        oldNote = JSON.parse(localStorage.getItem('notes'));
    }

    oldNote.map( (note,index) => {
        
        if(note[0] == deletedNote.children[0].textContent.trim() && note[1] == deletedNote.children[1].textContent.trim()){
            oldNote.splice(index,1);
            return oldNote;
        }
    });

    localStorage.setItem('notes',JSON.stringify(oldNote));

}



document.addEventListener("DOMContentLoaded", getNotesFormLocalStorage);

const addNote = (t,n) => {

    notes.innerHTML += `<div class="note">
                <h3 class="title-text" id="title-text">${t}</h3>
                <p class="note-blog">${n}</p>
                <i class="fa-solid fa-trash"></i>
            </div>`;

            title.value = '';
            noteText.value = '';
}

//ADD LOCAL STORAGE


noteArea.addEventListener("click", showNoteArea)


document.addEventListener('click', (event) => {
    
    let isClicked = noteArea.contains(event.target);

    if(!isClicked) {
        hideNoteArea();

        if(title.value.length === 0 && noteText.value.length === 0) {
            return;
        }else{
            adNoteToLocalStorage([title.value, noteText.value]);
            addNote(title.value, noteText.value);
            
        }
    }
});

document.addEventListener("mouseover", (event) => {

    if(event.target.classList.contains("note")) {
        event.target.querySelector("i").classList.add('show');
    }
})

document.addEventListener("mouseout", (event) => {

    if(event.target.classList.contains("note")) {
        event.target.querySelector("i").classList.remove('show');
    }
});

document.addEventListener("click", (event) => {

    if(event.target.classList.contains("fa-trash")) {
        event.target.parentElement.remove();
        deleteFormLocalStorage(
            event.target.parentElement);
    }
});


