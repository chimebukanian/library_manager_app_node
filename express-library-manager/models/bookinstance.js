const mongoose = require('mongoose');
const {DateTime}=require("luxon");

const Schema = mongoose.Schema;

const bookInstanceSchema=new Schema({
    book: {type: Schema.Types.ObjectId, ref:'Book', required:true},
    imprint: {type: String, required: true},
    status: {type: String, required:true, enum: ['Available', 'Maintenance', 'loaned', 'Reserved'], defalult:'Maintenance'},
    due_back: {type:Date, default:Date.now}
    
});

bookInstanceSchema
    .virtual('url')
    .get(function(){
        return `/catalog/bookinstance/${this._id}`;
    })

bookInstanceSchema
    .virtual('due_date_formatted')
    .get(function(){
        return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
        
    });

module.exports=mongoose.model('Bookinstance', bookInstanceSchema);