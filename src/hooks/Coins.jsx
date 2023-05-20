import {useState, useEffect} from 'react';

function Coins () {

const [usdRate, setUSDRate] = useState([]);
const [eurRate, setEURRate] = useState([]);
const [gbpRate, setGBPRate] = useState([]);

useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 6000);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

const fetchData = async () => {
   const data = await fetch (`https://api.coindesk.com/v1/bpi/currentprice.json`);
   const currentPrice = await data.json();
   setUSDRate(currentPrice.bpi.USD.rate);
   setEURRate(currentPrice.bpi.EUR.rate);
   setGBPRate(currentPrice.bpi.GBP.rate);
   console.log(JSON.stringify(currentPrice, null, 2))
}

   return (
       <div className='coins'> 
             <h1>Live Bitcoin price</h1>
             <div className='currencies'>
                 <div className='usd'>
           <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/US_one_dollar_bill%2C_obverse%2C_series_2009.jpg/640px-US_one_dollar_bill%2C_obverse%2C_series_2009.jpg' alt="dollar"/>
           <h2>USD rate </h2><h3>{usdRate}</h3></div>
           <div className='eur'>           
           <img src='https://banknotenews.com/wp-content/uploads/2019/12/european_monetary_union_ecb_5_euros_2013.00.00_b8y3_pnl_ya_0669436217_f.jpg' alt='euro'/>
           <h2>EUR rate </h2>
           <h3>{eurRate}</h3>
           </div>
            <div className='gbp'>
           <img src='https://www.foreigncurrencyandcoin.com/wp-content/uploads/2020/04/gbp-20-front.jpg' alt="pound"/>
        <h2>GBP rate</h2>
        <h3>{gbpRate}</h3>
        </div>
        </div>
       </div>
   )
}

export default Coins;