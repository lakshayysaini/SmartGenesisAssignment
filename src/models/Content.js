import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema( {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
} );

const Content = mongoose.models.Content || mongoose.model( "Content", ContentSchema );
export default Content;