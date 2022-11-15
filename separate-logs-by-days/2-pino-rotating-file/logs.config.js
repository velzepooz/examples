const getCurrentDate = () => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

module.exports = {
  filter() { return true; } ,
  output: {
    path: () => `${getCurrentDate()}.log`,
    isJson: false,
    options: {
      path: 'logs/',
      interval: '1d',
      teeToStdout: true,
    }
  }
}