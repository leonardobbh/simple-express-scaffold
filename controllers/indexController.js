const getIndex = async (req, res, next) => {
    return res.status(200).json({ status: "ONLINE" });
};

module.exports = {
    getIndex
};