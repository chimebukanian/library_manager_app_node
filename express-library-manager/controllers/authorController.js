const Author=require("../models/author");
const Book=require("../models/book");
const {validationResult, body} = require('express-validator');

const asyncHandler=require('express-async-handler');
const async=require('async');

exports.author_list=asyncHandler(async (req,res)=>{
    const allAuthors=await Author.find().sort({last_name:1}).exec();

    res.render("author_list", {
        title: "Author List",
        author_list: allAuthors,
    });
});

exports.author_detail=asyncHandler(async (req,res, next)=>{
    const [author, authorbooks]=await Promise.all([
        Author.findById(req.params.id).exec(),
        Book.find({author:req.params.id}, "title summary").exec()])

        if(author==null){
            const err=new Error("Author not found");
            err.status=404
            return next(err);
        }
    res.render(`author_detail`, {
        title: `${author} Detail`,
        author:author,
        author_books:authorbooks
    });
});

exports.author_create_get=(req, res, next)=>{
    res.render('author_form', {title:"Create author",});
};

exports.author_create_post= [
    body("first_name")
        .trim()
        .isLength({min:1})
        .escape()
        .withMessage("first name must be specified")
        .isAlphanumeric()
        .withMessage("first name has non-alphanumeric characters"),
    body("last_name")
        .trim()
        .isLength({min:1})
        .escape()
        .withMessage("last name must be specified")
        .isAlphanumeric()
        .withMessage("Last name has non-alphanumeric characters"),
    body("date_of_birth", "invalid date of birth")
        .optional({values:'falsy'})
        .isISO8601()
        .toDate(),
    body("date_of_death", "invalid date of death")
        .optional({values:"falsy"})
        .isISO8601()
        .toDate(),
    
    asyncHandler(async (req, res, next)=>{
        const errors=validationResult(req);

        const author=new Author({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            date_of_birth:req.body.date_of_birth,
            date_of_death:req.body.date_of_death,
        });
        if (!errors.isEmpty()){
            res.render("author_form", {
                title:"Create author",
                author:author,
                errors:errors.array()
            });
            return;
        } else {
            await author.save()
            res.redirect(author.url)
        }
})
]

exports.author_delete_get=(req, res)=>{
    res.send("not implemented: AUthor delete get");
};


exports.author_delete_post=(req, res)=>{
    res.send("not implemented: AUthor delete post");
};

exports.author_update_get=(req, res)=>{
    res.send("not implemented:author update get");
};

exports.author_update_post=(req, res)=>{
    res.send('not implemented: author update post');
};
