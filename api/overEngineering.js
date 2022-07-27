const crypto = require('node:crypto');

module.exports = class overengineering {
    
    random(method, min, max) {
        let random;

        if (method == 'math') {
            random = Math.floor(Math.random() * (max - min + 1)) + min;
            return random;
        }

        else if (method == 'crypto') {
            let byteArray = new Uint8Array(1);

            crypto.webcrypto.getRandomValues(byteArray);

            let randomNum = '0.' + byteArray.toString();
            random = Math.floor(randomNum * (max - min + 1)) + min;
            return random;
        };
    }
}