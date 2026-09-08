const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    { timestamps: true }
);

// password kabhi bhi JSON response mein na jaaye
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
