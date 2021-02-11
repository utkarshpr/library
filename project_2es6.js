show();

class Book{
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
      }
}

class Display{
    add (book) {
        //console.log('adding to UI' );
        let table_body = document.getElementById('table_body');
        let ui = `<tr>
                      
           <td>${book.name}</td>
           <td>${book.author}</td>
           <td>${book.type}</td>
         </tr>`;
        table_body.innerHTML += ui;
      }
      clear () {
        let Add_book = document.getElementById('library_form');
        Add_book.reset();
      }
      validate(book) {
        if (book.name.length < 3) return false;
        if (book.author.length < 3) return false;
        return true; 
      };
      show(str, message) {
        let table = document.getElementById('message');
      
        table.innerHTML = `
        <div class="alert alert-${str} alert-dismissible fade show" role ="alert">
        <strong>Message:</strong> ${message}
        <button type="button" class="close" data-dismiss="alert">&times;</button>
      </div>`;
      };

}
let Add_book = document.getElementById('library_form');
Add_book.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
  e.preventDefault();
  //console.log('Formsubmited');
  let name = document.getElementById('BookName').value;
  let author = document.getElementById('Author').value;
  let gridRadios1 = document.getElementById('gridRadios1');
  let gridRadios2 = document.getElementById('gridRadios2');
  let gridRadios3 = document.getElementById('gridRadios3');
  let type;
  if (gridRadios1.checked) {
    type = gridRadios1.value;
  } else if (gridRadios2.checked) {
    type = gridRadios2.value;
  } else if (gridRadios3.checked) type = gridRadios3.value;

  let book = new Book(name, author, type);

  //
  //setting local storage
  //

  let display = new Display();

  if (display.validate(book)) {
    display.add(book);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.push(book);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    
    display.clear();
    display.show('success', 'You have successfully added a book');
  } else {
    display.show('danger', 'Problem occurred ');
  }
}
function show(){
    let notes = localStorage.getItem('notes');
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let table_body = document.getElementById('table_body');
    let ui='';
    notesObj.forEach(book => {
        
        ui = `<tr>
                      
           <td>${book.name}</td>
           <td>${book.author}</td>
           <td>${book.type}</td>
         </tr>`;
        table_body.innerHTML += ui;
        
    });
}
