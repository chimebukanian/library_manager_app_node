const mongoose = require('mongoose');
const {DateTime}=require("luxon");


const schema = mongoose.Schema

const authorSchema = new schema({
    first_name:{type: String, required: true, maxlength:100},
    last_name: {type: String, required: true, maxlength:100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});

authorSchema
    .virtual('name')
    .get(function(){
        
        let fullname='';
        if (this.first_name && this.last_name){
            fullname=`${this.last_name}, ${this.first_name}`;
        }

        if (!this.first_name || !this.last_name){
            fullname=''
        }
        return fullname;
    });

authorSchema
    .virtual('url')
    .get(function(){
        return `/catalog/author/${this._id}`;
    });

authorSchema
    .virtual('date_of_birth_formatted')
    .get(function(){
        return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
        
    });

authorSchema
    .virtual('date_of_death_formatted')
    .get(function(){
        return DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
        
    });    
module.exports=mongoose.model('Author', authorSchema);
