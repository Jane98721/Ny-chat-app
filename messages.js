const router = require ('express').Router()

app.post('/messages', authenticateToken, async (req,res) => {
    try {
    const {id, createdBy, createdAt} = req.body
    const newMessage = newMessage ({  id,
        createdBy,
        createdAt})
        await newMessage.save()

        res.status(201).json(newMessage)
} catch (error) {
    res.status(500).json({error: 'Failed to create message'})
}
})