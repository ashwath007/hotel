var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const { StringDecoder } = require("string_decoder");


var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    code: {
        type: String
    },
    verifyed: {
        type: Boolean
    },
    order: [{
        type: String
    }],
    loc: {
        type: String
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],

        },
        coordinates: {
            type: [Number],

        }
    },
    address: {
        type: String
    },
    cart: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, { timestamps: true });


//SMS Verification
// const CODE = uuidv1().substr(1, 4);
// userSchema.virtual(CODE)
//     .set(function(CODE) {
//         this.code = CODE
//     })
//     .get(() => {
//         return this.code
//     })



// userSchema
//     .virtual("password")
//     .set(function(password) {
//         this._password = password;
//         this.salt = uuidv1();
//         this.encry_password = this.securePassword(password);
//     })
//     .get(function() {
//         return this._password;
//     });

// userSchema.methods = {
//     autheticate: function(plainpassword) {
//         return this.securePassword(plainpassword) === this.encry_password;
//     },

//     securePassword: function(plainpassword) {
//         if (!plainpassword) return "";
//         try {
//             return crypto
//                 .createHmac("sha256", this.salt)
//                 .update(plainpassword)
//                 .digest("hex");
//         } catch (err) {
//             return "";
//         }
//     }
// };

module.exports = mongoose.model("User", userSchema);