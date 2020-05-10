const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  text: {
    type: String,
    required: true
  },

  name: {
    type: String
  },

  avatar: {
    type: String
  },

  likes: [
    {
      user: {
        type: Schema.Types,
        ref: "users"
      }
    }
  ],

  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },

      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema); // we are passing here the PostSchema for the variable Post
