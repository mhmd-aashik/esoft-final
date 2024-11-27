import { Schema, models, model, Document } from "mongoose";

// Interface for the Meme schema
export interface IMeme extends Document {
  name: string;
  key: string;
  url: string;
  size: number;
  uploadedAt: Date;
}

const MemeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Meme = models.Meme || model("Meme", MemeSchema);

export default Meme;
