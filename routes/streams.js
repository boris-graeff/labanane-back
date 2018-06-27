const youtubeStream = require('youtube-audio-stream')

module.exports = function(req, res) {
    const requestUrl = 'https://youtube.com/watch?v='+req.params.videoId
    try {
        youtubeStream(requestUrl).pipe(res)
    } catch (err) {
        res.status(500).send(err)
    }
}
