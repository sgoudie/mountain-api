import mongoose from 'mongoose';

/* Delete the the model so it can be recreated
by another endpoint without an error */
delete mongoose.connection.models['Mountain'];

const MountainSchema = new mongoose.Schema({
  created: Number,
  updated: Mumber,
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model('Mountain', MountainSchema);
