const Author=require("../models/author");
const asyncHandler=require('express-async-handler');
const async=require('async');

exports.author_list=asyncHandler(async (req,res)=>{
    const allAuthors=await Author.find().sort({family_name:1}).exec();

    res.render("author_list", {
        title: "Author List",
        author_list: allAuthors,
    });
});

exports.author_detail=(req,res)=>{
    res.send(`NOT IMPLEmENTED: Author Detail ${req.params.id}`);;
};

exports.author_create_get=(req, res)=>{
    res.send('not implemented: author create get');
};

exports.author_create_post=(req, res)=>{
    res.send('not implemented: author create post');
};

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
