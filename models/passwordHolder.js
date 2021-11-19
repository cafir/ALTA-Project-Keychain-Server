import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    userName: String,
    creator: String,
    name: String,
    password: String,
    tags: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PasswordHolder = mongoose.model('PasswordHolder', postSchema);

export default PasswordHolder;