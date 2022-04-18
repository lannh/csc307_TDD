

module.exports = class StockPortfolio
{
    portfolio;

    constructor()
    {
        this.portfolio = [];
    }

    initializePortfolio(listStocks)
    {
        for(let stock of listStocks)
        {
            this.portfolio.push(new Stock(
                stock.stockSymbol, stock.numOfShares));
        }

        this.validatePortfolio();
    }

    emptyPortfolio()
    {
        this.portfolio.splice(0, this.portfolio.length);
    }

    countUniqueTickers()
    {
        return this.portfolio.length;
    }

    purchase(newStock)
    {
        let index = this.portfolio.findIndex(stock => 
            newStock.stockSymbol === stock.stockSymbol);

        if(index !== -1)
            this.portfolio[index].numOfShares += newStock.numOfShares;
        else
            this.portfolio.push(new Stock(
                newStock.stockSymbol, newStock.numOfShares));    
    }

    sell(targetStock)
    {
        let remainingShares = 0;

        let index = 
            this.portfolio.findIndex(portfolioItem => 
                portfolioItem.stockSymbol === targetStock.stockSymbol);

        if(index === -1 ||
            this.portfolio[index].numOfShares < targetStock.numOfShares)
            throw new Error("ShareSaleException");        

        this.portfolio[index].numOfShares -= targetStock.numOfShares;

        remainingShares = this.portfolio[index].numOfShares;

        if(remainingShares === 0)
            this.portfolio.splice(index, 1);

        return remainingShares;
    }

    findItem(item)
    {
        return this.portfolio.find(portfolioItem => 
            //_.isEqual(portfolioItem, item));
            JSON.stringify(portfolioItem)===JSON.stringify(item));
    }

    findByStockSymbol(stockSymbol)
    {
        return this.portfolio.find(portfolioItem => 
            portfolioItem.stockSymbol === stockSymbol);
    }

    getNumOfShares(stockSymbol)
    {
        let targetStock = this.findByStockSymbol(stockSymbol);
        if(targetStock === undefined)
            throw new Error("Cannot find stock symbol " + stockSymbol);
        return targetStock.numOfShares;
    }

    validatePortfolio()
    {
        let updatedPorfolio = this.portfolio.filter(stock => {
            return stock.numOfShares > 0;
        });
        this.portfolio = updatedPorfolio;
    }
}

function Stock(stockSymbol, numOfShares)
{
    this.stockSymbol = stockSymbol;
    this.numOfShares = numOfShares;
}

