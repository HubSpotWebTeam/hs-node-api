module.exports = {
  tomorrow() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    return currentDate.getTime();
  }
};
