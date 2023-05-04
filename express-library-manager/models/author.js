const mongoose = require('mongoose');
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
        return `/catalog/author/$this._id}`;
    });

module.exports=mongoose.model('Author', authorSchema);
