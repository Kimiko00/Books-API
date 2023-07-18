const { nanoid } = require("nanoid");
const books = require("./books");

// ADD NEW BOOKS
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = readPage == pageCount;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (name.trim() === "") {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400)
      .type("application/json");
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400)
      .type("application/json");
  }

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: id,
        },
      })
      .code(201)
      .type("application/json");
  }

  return h
    .response({
      status: "fail",
      message: "buku gagal ditambahkan",
    })
    .code(500)
    .type("application/json");
};

// DISPLAY ALL BOOKS
const getAllBookhandler = () => ({
  status: "success",
  data: {
    books: books.map(({ id, name, publisher }) => ({ id, name, publisher })),
  },
});

// DISPLAY BOOKS by id
const getBookByIdhandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((bookId) => bookId.id === id)[0];

  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  return h
    .response({
      status: "fail",
      message: "Buku tidak ditemukan",
    })
    .code(404)
    .type("application/json");
};

// UPDATE EXISTING BOOKS
const updateBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    if (name.trim() === "") {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku",
        })
        .code(400)
        .type("application/json");
    }

    const trimmedName = name === null ? "" : name.trim();

    if (readPage > pageCount) {
      return h
        .response({
          status: "fail",
          message:
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400)
        .type("application/json");
    }

    books[index] = {
      ...books[index],
      name: trimmedName,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbaiki",
      })
      .code(200)
      .type("application/json");
  }

  return h
    .response({
      status: "fail",
      message: "Gagal memperbarui buku, Id tidak ditemukan",
    })
    .code(404)
    .type("application/json");
};

// DELETE EXISTING BOOKS
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);

    return h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200)
      .type("application/json");
  }

  return h
    .response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    })
    .code(404)
    .type("application/json");
};

module.exports = {
  addBookHandler,
  getAllBookhandler,
  getBookByIdhandler,
  updateBookByIdHandler,
  deleteNoteByIdHandler,
};
