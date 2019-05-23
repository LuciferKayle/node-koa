const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const movieSchame = new Schema({
    MvId: {
      unique: true,
      type: String
    },
    score: Number,
    playCount: Number,
    name: String,
    artistId: {
        type: String,
        ref: 'Artist'
    },
    artistName: String,
    cover: String,
    video: String,

    videoKey: String,
    coverKey: String,

    meta: {
        createdAt: {
          type: Date,
          default: Date.now()
        },
        updatedAt: {
          type: Date,
          default: Date.now()
        }
    }

});


movieSchame.pre('save', function (next) {
  if(this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now();
  } else {
      this.meta.updatedAt = Date.now();
  }
  next();
});

mongoose.model('Movie', movieSchame)
