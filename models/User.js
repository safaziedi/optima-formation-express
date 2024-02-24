const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{type: String},
    email:{type: String,required: true, unique: true},
    pwd:{type: String,required: true},
    phone:{type: String},
    // role: {
    //     type: String,
    //     enum : [roles.admin, roles.client],
    //     default: roles.client
    // }

});

// Hash the plain text pwd before saving
userSchema.pre('save', async function (next) {
    try {
      if (this.isNew) {
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(this.pwd, salt);
        this.pwd = hashedPwd;
      }
      next();
    } catch (error) {
      next(error);
    }
  });

userSchema.virtual('id').get(
    function(){
      return this._id.toHexString()
    }
  );
  
userSchema.set('toJSON', {
    virtuals: true
  });


const User = mongoose.model("User",userSchema)
module.exports = User;