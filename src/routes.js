const {
  addBookHandler,
  getAllBookhandler,
  getBookByIdhandler,
  updateBookByIdHandler,
  deleteNoteByIdHandler,
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
    handler: getAllBookhandler,
  },

  // get a signle books data in the server by id
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBookByIdhandler,
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
];

module.exports = routes;
