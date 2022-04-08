router = require('express').Router();

router.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
  });

router.get('/api', (req, res) => {
    const unixRes = Date.now();
    let utcRes = new Date().toUTCString();
    res.status(200).json({"unix":unixRes, "utc":utcRes})
})

router.get('/api/:date?', (req, res) => {
    let date = req.params.date;
    const splittedDate = date.split("-");
    let unixRes;
    let utcRes;
    if (splittedDate.length==1){
        unixRes = date;
        utcRes = new Date(parseInt(date)).toUTCString();
        if (utcRes === "Invalid Date"){
            res.json({ error : "Invalid Date" })
        }
    } else {
        unixRes = new Date(date).valueOf();
        utcRes = new Date(date).toUTCString();
    }

    res.status(200).json({"unix":unixRes, "utc":utcRes})
})

module.exports = router;