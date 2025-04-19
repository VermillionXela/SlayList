export const isGuildLoggedIn = (req, res, next) => {
    if (!req.session.guild_id) {
        return res.status(401).json({ error: 'Halt! Guild login required to proceed' })
    }
    next()
}


export const isSlayerLoggedIn = (req, res, next) => {
    if (!req.session.slayer_id) {
        return res.status(401).json({ error: 'Halt! Slayer login required to proceed' })
    }
    next()
}
