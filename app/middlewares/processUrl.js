const { API_URL } = require("../../config/config");

const processUrl = async (req, res, next) => {
    const indexHost = req.rawHeaders.indexOf('Host');
    const hostValue = req.rawHeaders[indexHost + 1];

    req.url = `${API_URL}${req.baseUrl}${req.route.path}`;

    return await next();
};

module.exports = processUrl;