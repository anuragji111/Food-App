function generateRandom(min = 10000, max = 99999) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor( rand * difference);
    rand = rand + min;
    return rand;
}
module.exports = generateRandom
