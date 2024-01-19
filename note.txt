posts in create structure
 const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

user
photo in user structure
    profilePhoto: {
      publicId: result.public_id,
      url: result.secure_url,
    },