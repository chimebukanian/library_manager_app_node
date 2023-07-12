const Genre = require("../models/genre");
const Book = require("../models/book");
const asyncHandler = require('express-async-handler');
const {body, validationResult}=require('express-validator');
// Display list of all Genre.
exports.genre_list=asyncHandler(async (req, res, next)=>{
  const allgenres=await Genre.find().sort({name:1}).exec();

  res.render("genre_list", {
      title: "genre List",
      genre_list: allgenres,
  });
});

// Display detail page for a specific Genre.
exports.genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, genreBooks]= await Promise.all([Genre.findById(req.params.id).exec(), 
    Book.find({genre:req.params.id}, "title summary").exec() ]);
    if(genre==null){
      const err=new Error("Genre not found");
      err.status=404;
    }
  res.render("genre_detail", {
    title: "Genre detail",
    genre:genre,
    genre_books:genreBooks,
  });
});

// Display Genre create form on GET.
exports.genre_create_get = (req, res, next) => {

  res.render("genre_form",{title:"Create genre"});
};

// Handle Genre create on POST.
exports.genre_create_post = [
  // name field validation/sanitization
  body("name", "Genre name must contain at least 3 characters")
    .trim().isLength({min:3}).escape(),

  // req processing
  asyncHandler(async (req, res, next) => {
    // get req validation errors
    const errors=validationResult(req);
    // create genre objecct
    const genre = new Genre({name: req.body.name});

    if (!errors.isEmpty()){
      // errors!
      res.render("genre_form", {
        title: "Create genre",
        genre,
        errors:errors.array(),
      });
      return;
    } else{
      // valid form
      // check if already exists
      const genreExists= await Genre.findOne({name:req.body.name}).exec();
      if (genreExists){
        res.redirect(genreExists.url);
      } else {
        await genre.save();
        res.redirect(genre.url);
      }
    }
  })
]
// Display Genre delete form on GET.
exports.genre_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
};

// Handle Genre delete on POST.
exports.genre_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
};

// Display Genre update form on GET.
exports.genre_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
};

// Handle Genre update on POST.
exports.genre_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
};
