const linkHarvester = (input = '') => {
  const regExp = /<a [^>]*(href="((mailto:|https?:\/\/)([^"]*)))"[^>]*>([^<]*)<\/a>/gi;
  const rawHarvest = [];
  let execResult;
  while ((execResult = regExp.exec(input)) !== null) {
    rawHarvest.push(execResult);
  }

  return rawHarvest.reduce((acc, curr) => {
    if (curr[3] === 'mailto:') {
      acc.emailAddresses = acc.emailAddresses || [];
      acc.emailAddresses.push(curr[4]);
    }
    if (/https?:\/\//.test(curr[3])) {
      acc.links = acc.links || [];
      acc.links.push({
        linkText: curr[5],
        url: curr[2]
      });
    }
    return acc;
  }, {});
};

export default linkHarvester;