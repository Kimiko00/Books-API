const {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteNoteByIdHandler,
  getAllBooksQueryHandler,
} = require("./handler");

const routes = [
  // insert a new books in the server
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },

  // get all the books data in the server
  {
    method: "GET",
    path: "/books",
    handler: getAllBookHandler,
  },

  // get a signle books data in the server by id
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBookByIdHandler,
  },

  // update the existing book in the server by the existing id
  {
    method: "PUT",
    path: "/books/{id}",
    handler: updateBookByIdHandler,
  },

  // delete the existing book in the server by the existing id
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteNoteByIdHandler,
  },

  // get Books based on query parameter
  {
    method: "GET",
    path: "/books-query",
    handler: getAllBooksQueryHandler,
  },
];

module.exports = routes;
