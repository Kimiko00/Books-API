const {
  addBookHandler,
  getAllBookhandler,
  getBookByIdhandler,
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
];

module.exports = routes;
