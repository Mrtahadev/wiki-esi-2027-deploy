import mongoose, { Document, Schema } from 'mongoose';

export interface IWiki extends Document {
  title: string;
  content: string;
  slug: string;
  tags: string[];
  createdBy: mongoose.Schema.Types.ObjectId;
  lastEditedBy: mongoose.Schema.Types.ObjectId;
  contributors: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const WikiSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastEditedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contributors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

export default mongoose.model<IWiki>('Wiki', WikiSchema); 