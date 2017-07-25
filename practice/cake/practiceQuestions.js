// 1
// var stockPricesYesterday = [10, 7, 5, 8, 11, 9];
// getMaxProfit(stockPricesYesterday);
// returns 6 (buying for $5 and selling for $11)

// No "shorting"—you must buy before you sell. You may not buy and sell in the same time step (at least 1 minute must pass).

function getMaxProfit(stockPricesYesterday){
  let minPrice = stockPricesYesterday[0];
  let profit = - Infinity;

  for(let i = 1; i < stockPricesYesterday.length; i++){
    let currentPrice = stockPricesYesterday[i];
    let potentialPrice = currentPrice - minPrice;
    profit = Math.max(profit, potentialPrice);
    minPrice = Math.min(minPrice, currentPrice);
  }
  return profit;
}

//2
// You have an array of integers, and for each index you want to find the product of every integer except the integer at that index.

// input [1, 7, 3, 4]
// output [84, 12, 28, 21]
