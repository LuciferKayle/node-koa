const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId


const artistSchame = new Schema({

    artistId: {
        unique: true,
        type: String
    },

    mvs: [
        {
            type: ObjectId,
            ref: 'Movie'
        }
    ],

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


artistSchame.pre('save', function (next) {
  if(this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now();
  } else {
      this.meta.updatedAt = Date.now();
  }
});


mongoose.model('Artist', artistSchame)
