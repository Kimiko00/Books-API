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

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (name == "") {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "buku gagal ditambahkan",
  });
  response.code(500);
  return response;
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

  const response = h.response({
    status: "fail",
    message: "buku tidak ditemukan",
  });
  response.code(404);
  return response;
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
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbaiki",
    });
    response.code(200);
    return response;
  }

  if (name == "") {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku, Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// DELETE EXISTING BOOKS

module.exports = {
  addBookHandler,
  getAllBookhandler,
  getBookByIdhandler,
  updateBookByIdHandler,
};
