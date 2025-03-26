import mongoose, { Schema, Document } from 'mongoose';

export interface IWikiPage extends Document {
  title: string;
  content: string;
  slug: string;
  tags: string[];
  createdBy: mongoose.Types.ObjectId;
  lastEditedBy: mongoose.Types.ObjectId;
  contributors: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const WikiPageSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastEditedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contributors: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Create text index for search functionality
WikiPageSchema.index({ title: 'text', content: 'text', tags: 'text' });

// Generate slug from title
WikiPageSchema.pre<IWikiPage>('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

export default mongoose.model<IWikiPage>('WikiPage', WikiPageSchema); 