const Book = require("../models/book");
const BookInstance=require('../models/bookinstance');
const Author=require('../models/author');
const Genre=require('../models/genre');

const asyncHandler=require('express-async-handler');
const aysnc=require('async');
exports.index = asyncHandler(async (req, res, next) => {
  const [
    numBooks, 
    numBookInstances, 
    numAvailableBookInstances, 
    numAuthors, 
    numGenres,]
  = await Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({status:"available"}).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);
  let data={
    title: "Local Library Home",
    book_count:numBooks,
    book_instance_count:numBookInstances,
    book_instance_available_count:numAvailableBookInstances,
    author_count:numAuthors,
    genre_count:numGenres,
  }
  res.render("index", {data})
});
 
      
     
// Display list of all books.
exports.book_list = asyncHandler(async (req, res) => {
  const allBooks=await Book.find({}, "title author")
  .sort({title:1})
  .populate("author")
  .exec();
  res.render("book_list", {title:"all books", book_list:allBooks});
});

// Display detail page for a specific book.
exports.book_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
};

// Display book create form on GET.
exports.book_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book create GET");
};

// Handle book create on POST.
exports.book_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book create POST");
};

// Display book delete form on GET.
exports.book_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// Handle book delete on POST.
exports.book_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

// Display book update form on GET.
exports.book_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update GET");
};

// Handle book update on POST.
exports.book_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update POST");
};
