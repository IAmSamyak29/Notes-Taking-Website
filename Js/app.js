console.log("Welcome to notes taking app");
showNotes();

//If user adds a note, add it to the local storage.
let addBtn = document.getElementById('addbtn');
addBtn.addEventListener('click', function(e) {
    let addtxt = document.getElementById('addtext');
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    notesobj.push(addtxt.value);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value = "";

    showNotes();
});

//function to show all the notes from localstorage present in the website .
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }

    let html = "";
    for (let i = 0; i < notesobj.length; i++) {
        //we are adding card.
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${i+1}</h5>
                    <p class="card-text">${notesobj[i]}</p>
                    <button id="${i}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
`;
    }

    let notesele = document.getElementById('notes');
    if (notesobj.length == 0) {
        notesele.innerHTML = `Nothing to show! Use "Add a Note" section to add notes.`
    } else {
        notesele.innerHTML = html;
    }
}


//function to delete notes.
function deleteNote(index) {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    } else
        notesobj = JSON.parse(notes);

    notesobj.splice(index, 1);
    //reassigning the value of the local storage.
    localStorage.setItem("notes", JSON.stringify(notesobj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function() {

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');

    for (let i = 0; i < noteCards.length; i++) {
        let content = noteCards[i].getElementsByTagName("p")[0].innerText;
        if (content.includes(inputVal)) {
            noteCards[i].style.display = "block";
        } else
            noteCards[i].style.display = "none";
    }
})