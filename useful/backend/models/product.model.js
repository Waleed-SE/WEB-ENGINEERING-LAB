/**
 * Product Model
 *
 * Schema and methods for product data.
 */

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      trim: true,
      maxlength: [100, "A product name cannot have more than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
      min: [0, "Price must be above 0"],
    },
    discountedPrice: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },
    category: {
      type: String,
      required: [true, "A product must have a category"],
      trim: true,
    },
    tags: [String],
    imageCover: {
      type: String,
    },
    images: [String],
    inStock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A product must belong to a user"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexing for better query performance
productSchema.index({ price: 1, ratingsAverage: -1 });
productSchema.index({ category: 1 });
productSchema.index({ tags: 1 });

// Virtual property for pricing information
productSchema.virtual("priceInfo").get(function () {
  if (this.discountedPrice) {
    const discount = this.price - this.discountedPrice;
    const discountPercentage = Math.round((discount / this.price) * 100);
    return {
      original: this.price,
      discounted: this.discountedPrice,
      saving: discount,
      discountPercentage: `${discountPercentage}%`,
    };
  }
  return {
    price: this.price,
  };
});

// Virtual populate reviews
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre("save", function (next) {
  // Process the document here
  next();
});

// QUERY MIDDLEWARE: runs before any find query
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "createdBy",
    select: "name",
  });
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
