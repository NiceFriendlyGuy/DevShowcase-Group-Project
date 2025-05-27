const profileData = require('../models/profile.model');
const mongoose = require('mongoose');

const statisticsController = {};

statisticsController.getStats = async function (req, res) {
    try {
        // total number of users
        const totalUsers = await profileData.countDocuments();

        // number of users created in the last 7 days
        const currentDate = new Date();
        const sevenDays = 7 * (24 * 60 * 60 * 1000);
        const date7DaysAgo = new Date(currentDate - sevenDays);
        const usersCreatedThisWeek = await profileData.countDocuments({ createdAt: { $gte: date7DaysAgo } });

        // number of users active this week
        const usersActiveThisWeek = 'not implemented because activity needs to be defined';

        // user growth for the week
        const previousUsers = totalUsers - usersCreatedThisWeek;
        const userGrowthThisWeek = previousUsers > 0
        ? (usersCreatedThisWeek / previousUsers) * 100
        : 100;

        res.status(200).json({
            totalUsers: totalUsers,
            usersCreatedThisWeek: usersCreatedThisWeek,
            usersActiveThisWeek: usersActiveThisWeek,
            userGrowthThisWeek: userGrowthThisWeek
        })
    } catch (err) {
        res.status(400).json({ message: 'Data error', error: err.message})
    }
}

module.exports = statisticsController;