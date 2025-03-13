import mongoose from "mongoose";

const shopsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    shop_name: {
      type: String,
      required: true,
    },
    shop_address: {
      type: String,
      required: true,
    },

    //  Use GeoJSON format for geospatial queries
    shop_location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
  },
  { timestamps: true }
);

// Create geospatial index for location-based queries
shopsSchema.index({ shop_location: "2dsphere" });

const Shop = mongoose.model("Shop", shopsSchema);
export default Shop;
