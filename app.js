const Libro = function (titulo, autor, isbn) {
  this.titulo = titulo;
  this.autor = autor;
  this.isbn = isbn;
};
//constructor UI
function UI() {}

UI.prototype.addBooktoList = function (libro) {
  const list = document.querySelector("#book-list");
  //crear nuevo elemento
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.isbn}</td>
        <td><a href="#" class="delete">X</td>`;
  list.appendChild(row);
};
UI.prototype.deleteBook= function(target){
    target.parentElement.parentElement.remove();
}
//limpiar metodos

UI.prototype.clearFields = function () {
  (document.getElementById("title").value = ""),
  (document.getElementById("autor").value = ""),
  (document.getElementById("isbn").value = "")
};
UI.prototype.showAlert = function (msg, className) {
  //crear un div
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  //añadir texto de mensaje
  div.appendChild(document.createTextNode(msg));
  //recoger el contenedor
  const contenedor = document.querySelector("#container");
  //recpger el formulario
  const form = document.querySelector("#book-form");
  //insertar el alert antes de formulario
  contenedor.insertBefore(div, form);
  // esconder el alert
  setTimeout(function(){
    document.querySelector(".alert").remove();
  },2000);
};
document.querySelector("#book-form").addEventListener("submit", function (e) {
  const titulo = document.getElementById("title").value;
  const author = document.getElementById("autor").value;
  const isbn = document.getElementById("isbn").value;

  //instanciar la ui
  const ui = new UI();

  if (titulo === "" || author === "" || isbn === "") {
    ui.showAlert("tienes que poner informacion", "error");
  } else {
    //instanciamos un libro
    const book = new Libro(titulo, author, isbn);

    //añadir el libro
    ui.addBooktoList(book);
    //mpstramos el alert
    ui.showAlert('añadido con exito','success')
    //limpiar
    ui.clearFields();
  }

  e.preventDefault();
});
document.querySelector('#book-list').addEventListener("click", function(e){

    if(e.target.className == 'delete'){
        e.target.parentElement.parentElement.remove()
        //mostrar mensaje
        const ui = new UI()
        //ELMIMINAR UI
        ui.deleteBook(e.target)
        ui.showAlert('el libro se ha eliminado correctamente', 'success')
    }
})

