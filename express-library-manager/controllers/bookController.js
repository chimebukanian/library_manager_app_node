const Book = require("../models/book");
const BookInstance=require('../models/bookinstance');
const Author=require('../models/author');
const Genre=require('../models/genre');

const {validaitionResult, body}=require('express-validator')
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
exports.book_detail = asyncHandler(async (req, res, next) => {
  const [book, bookInstances]=await Promise.all([
    Book.findById(req.params.id).populate("author").populate("genre").exec(),
    BookInstance.find({book:req.params.id}).exec()
  ]);
  if (book==null){
    const err=new Error("Book not found");
    err.status=404;
    return next(err);
  }
  res.render(`book_detail`,{
    title:book.title,
    book:book,
    book_instances:bookInstances
  });
});

// Display book create form on GET.
exports.book_create_get = asyncHandler(async (req, res, next) => {

  const [authors, genres]=await Promise.all([
    Author.find().exec(),
    Book.find().exec()]);

  res.render("book_form", {
    title:"Create book",
    authors, 
    genres
  });
});

// Handle book create on POST.
exports.book_create_post = [

  (req, res, next)=>{
    if (!(req.body.genre instanceof Array)){
      if((req.body.genre===undefined))
        req.body.genre = []
      else req.body.genre=[req.body.genre]
    }
    next();
  },

  body('title', "title must not be empty")
    .trim()
    .isLength({min:1})
    .escape(),
  body('author', "Author must not be empty")
    .trim()
    .isLength({min:1})
    .escape(),
  body('summary', "summary must not be empty")
    .trim()
    .isLength({min:1})
    .escape(),
  body('isbn', "ISBN must not be empty")
    .trim()
    .isLength({min:1})
    .escape(),
  body('genre.*').escape(),
   
  asyncHandler(async (req, res, next) => {
    const errors=validationResult(req);

    const book=new Book({
      title:req.body.title,
      author:req.body.author,
      summary:req.body.summary,
      isbn:req.body.isbn,
      genre:req.body.genre      
    });

    if(!errors.isempty){
      const [authors, genres]=await Promise.all([
        Author.find().exec(),
        Genre.find().exec()
      ]);

      for (const genre of genres){
        if (book.genre.includes(genre._id)){
          genre.checked="true";
        }
      }

      res.render("book_form", {
        title:'Create book',
        authors,
        genres,
        book,
        errors:errors.array(),

      });
    }else{
      await book.save();
      res.redirect(book.url)
    }
})
]

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
