

const getPosts = async(req, res)=>{
    res.json({
        message:"Posts are retrieved successfully",
        user:req.user,
        posts:[]
    })
}


export {getPosts, }