const BookInstance=require('../models/bookinstance');
const Author=require('../models/author');
const Genre=require('../models/genre');
const Book=require('../models/book');

const asyncHandler = require('express-async-handler');
const {validationResult, body} = require('express-validator')


exports.bookinstance_list=asyncHandler(async (req, res)=>{
    allBookInstance= await BookInstance.find().populate('book').exec();

    res.render('bookinstance_list', {title: "All bookinstances", bookinstance_list:allBookInstance });
});

exports.bookinstance_detail=asyncHandler(async (req, res, next)=>{

    const bookInstance = await BookInstance.findById(req.params.id).populate().exec();
    if (bookInstance==null){
        const err=new Error("Book copy not found");
        err.status=404;
        return next(err);
    }
    res.render(`bookinstance_detail`, {
        title: "book copy:",
        bookinstance
    });
});

exports.bookinstance_create_get=asyncHandler(async (req, res, next)=>{
    const books=await Book.find({}, "title").exec()

    res.render("bookinstance_form",
    {title:"Create bookinstance", books});
});

exports.bookinstance_create_post=[
    body("book", "book must be specified")
        .trim().isLength({min:1}).escape(),
    body("imprint", "imprint must be specified")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        .trim().isLength({min:1}).escape(),
    body("status").escape(),
    body("due_back", "Invalid_date")
        .optional({values:"falsy"})
        .isISO8601()
        .toDate(),

    asyncHandler(async (req,res, next)=>{
        const errors=validationResult(req);

        const bookinstance=new BookInstance({
            book:req.body.book,
            imprint:req.body.imprint,
            status:req.body.status,
            due_back:req.body.due_back,
        });

        if (!errors.isEmpty()){
            const books=await Book.find({}, "title").exec();

            res.render("bookinstance_form",
            {title:"Create Bookinstance",
            books,
            selected_book:bookInstance.book._id,
            errors:errors.array(),
            bookinstance:bookInstance
    });
    return;
        }else{
            await b=BookInstance.save();
            res.redirect(bookinstance.url);
        }
        }
    
)
];

exports.bookinstance_delete_get=(req,res)=>{
    res.send("not implemented:bookinstance delete get");
};


exports.bookinstance_delete_post=(req,res)=>{
    res.send("not implemented:bookinstance delete post");
};

exports.bookinstance_update_get=(req, res)=>{
    res.send("not implemented: bookinstance update gEt");
};

exports.bookinstance_update_post=(req,res)=>{
    res.send("not implemented: bookinstance post");
};
