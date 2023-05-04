const BookInstance=require('../models/bookinstance');
const Author=require('../models/author');
const Genre=require('../models/genre');
const Book=require('../models/book');

exports.bookinstance_list=(req, res)=>{
    res.send('not implemented: bookinstance list');
};

exports.bookinstance_detail=(req,res)=>{
    res.send(`not implemented:bookinstsance detail: ${req.params.id}`);
};

exports.bookinstance_create_get=(req, res)=>{
    res.send("not implement:bookinstance create get");
};

exports.bookinstance_create_post=(req,res)=>{
    res.send("not implemented: bookinstance create get");
};

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
