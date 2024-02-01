function randome () {
    let code = (Math.floor(Math.random() * 999999) + 100000).toString();
    return code;
}
module.exports = {
    CODE: randome
}