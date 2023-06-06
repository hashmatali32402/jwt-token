const User =require('../models/User');


const getAllUsers = async(req,res,next)=>{
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalCount = await User.countDocuments();

    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      page,
      totalPages,
      users
    });
  } catch (error) {
    console.log('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
    getAllUsers,
    
}