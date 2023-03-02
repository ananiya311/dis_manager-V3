const notfound = (req, res , next) => {
    res.status(404).send("Rout not found")
}

module.exports = notfound