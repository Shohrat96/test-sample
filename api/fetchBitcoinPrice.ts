const fetchBitcoinPrice = async () => {

  try {
    const [bitcoinData, ethData] = await Promise.all([
      fetch('https://api.coindesk.com/v1/bpi/currentprice.json'),
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    ])
    const bitcoinJson = await bitcoinData.json()
    const ethJson = await ethData.json()
    return {
      ethPrice: ethJson?.find((coin: any) => coin?.id === 'ethereum'),
      bitcoinPrice: bitcoinJson
    }
  } catch (error) {
    throw new Error('Error happened in getting price data');
  }
}
export default fetchBitcoinPrice