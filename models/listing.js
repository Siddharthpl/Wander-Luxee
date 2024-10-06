const mongoose = require('mongoose');
const default_img = 'https://unsplash.com/photos/a-pool-with-lounge-chairs-and-an-umbrella-next-to-it-rcpK_THwJNg';
const Review = require('./review.js');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,


    },
    image: {
        filename: String,
        url: {
            type: String,
            default: default_img,
            set: (v) => v === "" ? default_img : v
        },

    },
    price: {
        type: Number,
        required: true,

    },
    location: {
        type: String,
        required: true,
        set: (v) => v.toUpperCase()

    },
    country: {
        type: String,
        set: (v) => v.toUpperCase()
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    tags: [{
        type: String,
        // enum: ["Trending", "Rooms", "Iconic cities", "Mountains", "Castles", "Amazing pools", "Camping", "Farms", "Arctic"]
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } })
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


