import { createError } from "../error.js";
import Video from "../models/Video.js"
import  User  from "../models/User.js"




export const addVideo = async (req, res, next) => {
    const newVideo = new Video({userId: req.user.id, ...req.body});
    try{
        const savedVideo =await newVideo.save();
        res.status(200).json(savedVideo);
    }catch(err){
        next(err);
    }
}




export const updateVideo = async (req, res, next) => {

    try{
        
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "video not found!"));
        // if request video === video model or database video
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {new: true}
            );
            res.status(200).json(updatedVideo);
        }else {
            return next(createError(403, "You can update only your video!"));
        }
    }catch(err){
        next(err);
    }
}



export const deleteVideo = async (req, res, next) => {
    try{
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "video not found!"));
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(
                req.params.id,
            );
            res.status(200).json("The video has deleted!");
        } else {
            return next(createError(403, "You can delete only your video!"))
        }
    }catch(err){
        next(err);
    }
}



export const getVideo = async (req, res, next) => {

    try{
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    }catch(err){
        next(err);
    }
}




export const addView = async (req, res, next) => {
    try{
        await Video.findByIdAndUpdate(req.params.id,{
           $inc: {views: 1} 
        });
        res.status(200).json("The view has been increased.");
    }catch(err){
        next(err);
    }
}



export const random = async (req, res, next) => {
    try{
        const videos = await Video.aggregate([{ $sample: { size: 40 } }])
        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}



export const trend = async (req, res, next) => {
    try{
        // -1 shows most views videos and 1 shows least views videos.
        const videos = await Video.find().sort({ views: -1});
        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}




export const sub = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;
        // Promise all created for getting all the user id data to a list.
        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.find({ userId: channelId})
            })
        );
        // to prevent this nested array use  -> flat()
        // show descending order or newest video  first -> sort((a, b) => b.createdAt - a.createdAt)
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    }catch(err){
        next(err);
    }
}


export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try{
        // in: -> in properties check inside the array whether the value is inside the array or not.
        // .limit(20)  ->  limit method value 20 get only 20 value from array.
        const videos = await Video.find({tags: {$in:tags}}).limit(20);
        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}


export const search = async (req, res, next) => {
    // q is send the key to post api url and key value is search keyword you want to find.
    const query = req.query.q
    try{
        const videos = await Video.find({title: { $regex: query, $options: "i" }}).limit(40);
        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}


