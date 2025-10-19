const express = require('express')
const PORT = 3001
const app = express()



app.get('./api', (req, res) => {
    res.json({
        
    })
})



app.listen(PORT, () => {
    console.log(`ssop: ${PORT}`)
})