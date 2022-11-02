import * as validator from 'class-validator';
import * as mongoose from 'mongoose';

export const ReportSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      min: 0,
      required: [true, 'PRICE_IS_BLANK'],
    },
    make: {
      type: String,
      required: [true, 'MAKE_IS_BLANK'],
    },
    model: {
      type: String,
      required: [true, 'MODEL_IS_BLANK'],
    },
    year: {
      type: Number,
      min: 1930,
      max: 2022,
      required: [true, 'YEAR_IS_BLANK'],
    },
    mileage: {
      type: Number,
      min: 0,
      max: 1000000,
      required: [true, 'MILEAGE_IS_BLANK'],
    },
    lng: {
      type: Number,
      validate: validator.IsLongitude,
    },
    lat: {
      type: Number,
      validate: validator.IsLatitude,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
