const helpers = {}

helpers.random = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz$-_*1234567890';
    let randon = 0
    for (let i = 0; i < 7; i++) {
        randon += possible.charAt(Math.floor(Math.random() * possible.length))
        
    }
    return randon
}

module.exports = helpers;