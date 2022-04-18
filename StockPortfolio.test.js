
const StockPortfolio = require("./StockPortfolio.js");

const testPortfolio = new StockPortfolio();

const defaultPortfolio = [
    {stockSymbol: "GME",numOfShares: 5},
    {stockSymbol: "RBLX",numOfShares: 10}
]; 

function createTestPortfolioWithItems()
{
    testPortfolio.emptyPortfolio();
    testPortfolio.initializePortfolio(...arguments);
}

test('checking if empty', () => {
    expect(testPortfolio.portfolio.length).toBe(0);
});

test('count num of unique tickers', () =>{
    createTestPortfolioWithItems(defaultPortfolio);

    const targetCnt = 2;

    let cntUniqueTickers =   
        testPortfolio.countUniqueTickers();

    expect(cntUniqueTickers).toBe(targetCnt);
});

test('purchase a new stock symbol', () => {
    const newStock = { stockSymbol: "ASDF", numOfShares: 3};
    
    testPortfolio.purchase(newStock);

    expect(testPortfolio.findItem(newStock)).not.toBe(undefined);
});

test('add shares to a symbol', () => {
    createTestPortfolioWithItems([
        {stockSymbol: "SPY",numOfShares: 68},
        {stockSymbol: "VB",numOfShares: 23},
        {stockSymbol: "ARKF",numOfShares: 45}
    ]);

    const targetStock = {stockSymbol: "VB",numOfShares: 20};
    const targetNumOfShares = 43;

    testPortfolio.purchase(targetStock);

    expect(testPortfolio.findByStockSymbol(targetStock.stockSymbol).numOfShares)
        .toBe(targetNumOfShares);
});

test('sell # of shares of a stock - successful', () => {
    createTestPortfolioWithItems([
        {stockSymbol: "GME",numOfShares: 5},
        {stockSymbol: "RBLX",numOfShares: 10},
        {stockSymbol: "ASDF",numOfShares: 20}
    ]);

    const targetNumOfShares = 17;
    const stockToBeSold = { stockSymbol: "ASDF", numOfShares: 3};

    const remainingShares = testPortfolio.sell(stockToBeSold);

    expect(remainingShares).toBe(targetNumOfShares);
});

test('getNumOfShares - successful', () => {
    createTestPortfolioWithItems(defaultPortfolio);

    const targetStock = { stockSymbol: "RBLX", numOfShares: 10};
    
    let result = testPortfolio.getNumOfShares(targetStock.stockSymbol);
    
    expect(result).toBe(targetStock.numOfShares);
});

test('getNumOfShares of a non existing stockSymbol', () =>{
    createTestPortfolioWithItems(defaultPortfolio);
    const stockSymbol = "SPY";

    expect(() => testPortfolio.getNumOfShares(stockSymbol))
        .toThrow(/Cannot find stock symbol/);
})

test('stock has num of shares <=0', () => {
    createTestPortfolioWithItems([
         {stockSymbol: "GME",numOfShares: -1},
         {stockSymbol: "RBLX",numOfShares: 10},
         {stockSymbol: "ASDF",numOfShares: 0}
    ]);
    const targetPorfolio = [
        {stockSymbol: "RBLX",numOfShares: 10}
    ];
 
    expect(testPortfolio.portfolio).toEqual(targetPorfolio);
});

test('sell more than currently owned shares', ()=>{
    createTestPortfolioWithItems(defaultPortfolio);
    const stockToBeSold = {stockSymbol: "GME", numOfShares: 30};

    expect(() => testPortfolio.sell(stockToBeSold))
        .toThrow(/ShareSaleException/);
});

test('sell a stock that is not owned', () => {
    createTestPortfolioWithItems(defaultPortfolio);
    const stockToBeSold = {stockSymbol: "ADSF", numOfShares: 30};

    expect(() => testPortfolio.sell(stockToBeSold))
    .toThrow(/ShareSaleException/);
});

test('sell all shares of a stock', () => {
    createTestPortfolioWithItems(defaultPortfolio);
    const stockToBeSold = { stockSymbol: "RBLX", numOfShares: 10};

    const targetPorfolio = [
        {stockSymbol: "GME",numOfShares: 5}
    ];
 
    testPortfolio.sell(stockToBeSold);

    expect(testPortfolio.portfolio).toEqual(targetPorfolio);
});