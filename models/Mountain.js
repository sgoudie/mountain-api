import mongoose from 'mongoose'
/* Delete the the model so it can be recreated
by another endpoint without an error */
delete mongoose.connection.models['Mountain']

const MountainSchema = new mongoose.Schema({
  created: Number,
  updated: Number,
  name: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true,
    enum: ['England', 'N.Ireland', 'Scotland', 'Wales']
  },
  county: String,
  height: {
    metres: Number,
    feet: Number
  },
  prominence: {
    metres: Number,
    feet: Number
  },
  os_grid_ref: String,
  classification: [String]
})

export default mongoose.model('Mountain', MountainSchema)
