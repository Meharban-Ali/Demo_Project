const mongoose = require('mongoose');

const writerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'लेखक का नाम आवश्यक है'],
    trim: true
  },
  role: {
    type: String,
    trim: true
  },
  photoUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true;
        // स्थानीय फाइल पथ और URL दोनों को स्वीकारें
        return /^(http|https|\.?\/)/.test(v);
      },
      message: props => `${props.value} वैध फोटो URL नहीं है`
    }
  }
}, { _id: false });

const fileSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'फाइल URL आवश्यक है'],
    trim: true,
    validate: {
      validator: function(v) {
        // स्थानीय फाइल पथ और URL दोनों को स्वीकारें
        return /^(http|https|\.?\/)/.test(v);
      },
      message: props => `${props.value} वैध फाइल URL नहीं है`
    }
  },
  fileType: {
    type: String,
    enum: ['image', 'video', 'audio'],
    required: [true, 'फाइल प्रकार आवश्यक है']
  },
  originalName: {
    type: String,
    required: [true, 'मूल फाइल नाम आवश्यक है']
  },
  size: {
    type: Number,
    required: [true, 'फाइल आकार आवश्यक है']
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'शीर्षक आवश्यक है'],
    trim: true,
    maxlength: [200, 'शीर्षक 200 अक्षरों से अधिक नहीं हो सकता']
  },
  description: {
    type: String,
    required: [true, 'विवरण आवश्यक है'],
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'श्रेणी आवश्यक है']
  },
  type: {
    type: String,
    required: [true, 'सामग्री प्रकार आवश्यक है'],
    enum: {
      values: ['blog', 'news', 'video', 'audio'],
      message: '{VALUE} वैध सामग्री प्रकार नहीं है'
    },
    default: 'blog'
  },
  files: [fileSchema],
  writers: [writerSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  },
  toObject: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

// इंडेक्स बेहतर प्रदर्शन के लिए
contentSchema.index({ title: 'text', description: 'text' });
contentSchema.index({ type: 1 });
contentSchema.index({ category: 1 });
contentSchema.index({ createdAt: -1 });

// टाइमस्टैम्प अपडेट करने के लिए मिडलवेयर
contentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// फॉर्मेटेड डेट के लिए वर्चुअल
contentSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// फाइल URL के लिए वर्चुअल
contentSchema.virtual('fileUrls').get(function() {
  return this.files.map(file => file.url);
});

// राइटर नामों के लिए वर्चुअल
contentSchema.virtual('writerNames').get(function() {
  return this.writers.map(writer => writer.name);
});

module.exports = mongoose.model('Content', contentSchema);