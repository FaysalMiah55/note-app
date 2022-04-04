const addBtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem("notes"))

notes.forEach(note => addNewNote(note))

addBtn.addEventListener("click", () => addNewNote());

function addNewNote(text = ""){
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <div class="tools">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "text-area"}"></div>
    <textarea class="${text ? "text-area" : ""}"></textarea>
    
  `

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = marked(text);

  deleteBtn.addEventListener("click", ()=>{
    note.remove()

    updateNote()
  });

  editBtn.addEventListener("click", () => {
    main.classList.toggle("text-area");
    textArea.classList.toggle("text-area");
  })

  textArea.addEventListener("input", (e) => {
    const {value} = e.target

    main.innerHTML = marked(value)

    updateNote()
  })

  document.body.appendChild(note);
}

function updateNote(){
  const textNote = document.querySelectorAll("textArea");

  const notes = []

  textNote.forEach(note => notes.push(note.value))

  localStorage.setItem("notes", JSON.stringify(notes))
}

