// controllers/dashboardController.js
const Content = require('../models/Content');
const User = require('../models/User'); // अब User मॉडल का उपयोग करें
const View = require('../models/View'); // View ट्रैकिंग के लिए

exports.getDashboardStats = async (req, res) => {
  try {
    // सभी काउंट्स को एक साथ पैरलल में प्राप्त करें
    const [
      totalContents,
      blogCount,
      videoCount,
      newsCount,
      audioCount,
      userCount,
      currentMonthViews,
      lastMonthViews,
      // अलग-अलग ग्रोथ रेट के लिए
      lastMonthBlogs,
      lastMonthVideos,
      lastMonthNews,
      lastMonthAudio,
      lastMonthUsers
    ] = await Promise.all([
      Content.countDocuments(),
      Content.countDocuments({ type: 'blog' }),
      Content.countDocuments({ type: 'video' }),
      Content.countDocuments({ type: 'news' }),
      Content.countDocuments({ type: 'audio' }),
      User.countDocuments(), // अब User मॉडल से काउंट करें
      
      // मासिक विज़िटर्स की गणना (उदाहरण के लिए)
      View.aggregate([
        { 
          $match: { 
            date: { 
              $gte: new Date(new Date().setDate(1)), // महीने की शुरुआत
              $lte: new Date() // आज तक
            }
          }
        },
        { $group: { _id: null, total: { $sum: "$count" } } }
      ]),
      
      // पिछले महीने के विज़िटर्स
      View.aggregate([
        { 
          $match: { 
            date: { 
              $gte: new Date(new Date().setMonth(new Date().getMonth() - 1, 1)),
              $lte: new Date(new Date().setDate(0)) // पिछले महीने का अंत
            }
          }
        },
        { $group: { _id: null, total: { $sum: "$count" } } }
      ]),
      
      // ग्रोथ कैलकुलेशन के लिए पिछले महीने के डेटा
      Content.countDocuments({ 
        type: 'blog',
        createdAt: { $lt: new Date(new Date().setDate(1)) }
      }),
      Content.countDocuments({ 
        type: 'video',
        createdAt: { $lt: new Date(new Date().setDate(1)) }
      }),
      Content.countDocuments({ 
        type: 'news', 
        createdAt: { $lt: new Date(new Date().setDate(1)) }
      }),
      Content.countDocuments({ 
        type: 'audio',
        createdAt: { $lt: new Date(new Date().setDate(1)) }
      }),
      User.countDocuments({ 
        createdAt: { $lt: new Date(new Date().setDate(1)) }
      })
    ]);

    // ग्रोथ प्रतिशत की गणना
    const calculateGrowth = (current, previous) => {
      return previous > 0 ? ((current - previous) / previous) * 100 : current > 0 ? 100 : 0;
    };

    const monthlyViews = currentMonthViews[0]?.total || 0;
    const previousViews = lastMonthViews[0]?.total || 0;

    res.status(200).json({
      totalContents,
      blogs: blogCount,
      videos: videoCount,
      news: newsCount,
      audio: audioCount,
      monthlyViews,
      totalUsers: userCount,
      recentGrowth: calculateGrowth(monthlyViews, previousViews),
      // अलग-अलग ग्रोथ रेट्स
      blogGrowth: calculateGrowth(blogCount, lastMonthBlogs),
      videoGrowth: calculateGrowth(videoCount, lastMonthVideos),
      newsGrowth: calculateGrowth(newsCount, lastMonthNews),
      audioGrowth: calculateGrowth(audioCount, lastMonthAudio),
      userGrowth: calculateGrowth(userCount, lastMonthUsers)
    });

  } catch (error) {
    console.error("Dashboard stats fetch error:", error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch dashboard stats',
      ...(process.env.NODE_ENV === 'development' && { 
        message: error.message,
        stack: error.stack 
      })
    });
  }
};