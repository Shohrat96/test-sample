import type { NextPage } from "next";
import { selectPriceState, setPriceState } from "../store/priceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from './index.module.scss';
import fetchBitcoinPrice from "../api/fetchBitcoinPrice";

const Home: NextPage = () => {
  const priceState = useSelector(selectPriceState);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async() => {
      setLoading(true);
      try {
        const priceData = await fetchBitcoinPrice();
        if (priceData) {
          const { bitcoinPrice, ethPrice } = priceData;
          dispatch(setPriceState({
            bpi: bitcoinPrice.bpi,
            updated: bitcoinPrice.time.updated,
            ethPrice: ethPrice?.current_price,
          }));
          return
        }
        throw new Error('Invalid response from fetch api')
      } catch (error) {
        setError(true);
        alert('Error happened in getting price data');
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    const fetchInterval = setInterval(fetchData, 5000);
    return () => clearInterval(fetchInterval);
  }, [dispatch])

  if (error) return <div className={styles.generalWrapper}>Error happened: {error}</div>
  if (loading) return <div className={styles.generalWrapper}>loading ...</div>

  return (
    <div className={styles.main}>
      <h1>Price Tracker (Updated regularly)</h1>
      <h2>Bitcoin</h2>
      <div>
        <span>Current price: {priceState?.bpi?.USD?.rate}</span>
        {' '}
        {priceState?.bpi?.USD?.code}
      </div>

      <h2>Etherium</h2>
      <div>
        <span>Current price: {priceState?.eth?.price} USD</span>
      </div>
  
      <div className={styles.timestamp}>
        <span><b>Last updated time:</b> {priceState?.time?.updated}</span>
      </div>
    </div>
  );
};

export default Home;
