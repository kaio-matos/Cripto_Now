import { isValidDate } from "@/utils/date"

const SECOND = 1000
const MINUTE = SECOND * 60

class Api {
    url = "https://api.coingecko.com/api/v3"
    interval

    /**
     * Starts an javascript interval with the passed callback.
     * 
     * By default the time is 10 * SECOND (1000).
     * 
     * This means that will trigger the cb 6 times per minute.
     * 
     * A good amount of requests to don't reach the limit of the API.
     * @param {Function} cb - Example - () => { makeRequest() }
     * @param {Number} time - Default - 10
     */
    startInterval(cb, time = 10) {
        this.interval = setInterval(cb, time * SECOND)
    }

    /**
     * Clear the started interval
     */
    endInterval() {
        clearInterval(this.interval)
    }

    simple = {
        uri: `${this.url}/simple`,

        /**
         * 
         * @param {String} criptoId 
         * @param {String} currency 
         * @returns {{Number}}
         */
        async current_price(criptoId, currency = 'brl') {
            if (!criptoId) return
            const res = await fetch(`${this.uri}/price?ids=${criptoId}&vs_currencies=${currency}`)
            const data = await res.json()
            return data[criptoId][currency]
        }
    }

    coins = {
        uri: `${this.url}/coins`,

        /**
         * @param {String} criptoId
         * - Example: 'bitcoin'
         * 
         * @param {String} currency
         * - Default: 'brl'
         * 
         * @param {Number} returnDays
         * - Default: 30 
         * 
         * @returns {[Number, Number][]}
         * -------------------------------------------------------------
         * Historical market data with granuality auto:
         * 
         * 1 day from query time = 5 minute interval data
         * 
         * 1 - 90 days from query time = hourly data
         * 
         * above 90 days from query time = daily data (00:00 UTC)
         */
        async get_history(criptoId, returnDays = 30, currency = 'brl') {
            if (!criptoId) return
            const res = await fetch(`${this.uri}/${criptoId}/market_chart?vs_currency=${currency}&days=${returnDays}&interval=daily`)
            const data = await res.json()
            return data.prices
        },

        /**
         * @param {String} criptoId
         * - Example: 'bitcoin'
         * 
         * @param {{ from: Date; to: Date }} range
         * - Example: { from: 1392577232, to: 1422577232 }
         * 
         * @param {String} currency
         * - Default: 'brl'
         * 
         * @returns { [Number, Number][] }
         * -------------------------------------------------------------
         * Historical market data with granuality auto:
         * 
         * 1 day from query time = 5 minute interval data
         * 
         * 1 - 90 days from query time = hourly data
         * 
         * above 90 days from query time = daily data (00:00 UTC)
         */
        async get_history_range(criptoId, range, currency = 'brl') {
            if (!criptoId) return
            const fromUnix = range.from.getTime() / SECOND;
            const toUnix = range.to.getTime() / SECOND;

            const res = await fetch(`${this.uri}/${criptoId}/market_chart/range?vs_currency=${currency}&from=${fromUnix}&to=${toUnix}`)
            const data = await res.json()
            return data.prices
        },

        /**
         * Function get the nearest price from the input date of a cripto
         * 
         * @param {String} criptoId
         * - Example: 'bitcoin'
         * 
         * @param {Date} date
         * - Example: 1422577232
         * 
         * @param {String} currency
         * - Default: 'brl'
         * 
         * @returns {{date: number, price: number}}
         */
        async get_specific_time(criptoId, date, currency = 'brl') {
            if (!criptoId || !isValidDate(date)) return
            const range = 60 * 24
            const timeBefore = new Date(date.getTime() - MINUTE * range)
            const timeLater = new Date(date.getTime() + MINUTE * range)

            const data = await this.get_history_range(criptoId,
                {
                    from: timeBefore,
                    to: timeLater
                }, currency)

            const approximately = data.reduce((previousPrice, currentPrice) => {
                const [prevDate] = currentPrice
                const [currDate] = previousPrice
                if (Math.abs(currDate - date.getTime()) > Math.abs(prevDate - date.getTime()))
                    return currentPrice
                else
                    return previousPrice
            })

            return { date: approximately[0], price: approximately[1] }
        }
    }


}
const api = new Api()
export { api };