# CSC436_Project1

## Table of contents  
* [Task Description](#Task-description)
* [ScreenShots](#ScreenShots)

## Task Description
Using the public API https://api.coindesk.com/v1/bpi/currentprice.json

Use the Vite starter + styling of your choosing, i.e., Bootstrap, Tailwind, custom, whichever you are comfortable with, and do the following in a react application:

* Have a navbar with sections:

  * Current Conversions Rates
  * Display the conversion rate in both directions (see here and here and here)
  * $ (USD) to BTC, 1 BTC to $
  * 1 € (EUR) to BTC, 1 BTC to €
  * £ (GBP) to BTC, 1 BTC to £

* Conversions
  * Allow the user to sort the exchange rates (highest number of fiat to BTC to lowest number of fiat to BTC and reverse) by clicking a button
  * Create
    * a single SELECT dropdown with selections of Euro, GBP, and USD
    * an input
    * convert the selected currency and the amount to its value in BTC.

Always visible, regardless of the section displayed, in the app should be the following:

The data date (hint it comes back from the API) should always be visible to the user. Let’s see if you can convert the UTC time to the current browser’s time zone and output both times.
Allow a user to refetch the rate; limit them to once per 5 minutes (that should persist in refreshes; that is, if a user hits refresh, they should not be able to hit refresh again (and be warned if they try) in the same browser (assuming they don’t clear their local data manually) for 5 minutes, regardless if they refresh the browser.


## Screenshots
<img src="https://user-images.githubusercontent.com/89614960/223839553-0aceff54-eee6-40f3-9945-aee0d14af71a.png" width=60% height=60%>
The above image shows the current rates for the different currencies.

<img src="https://user-images.githubusercontent.com/89614960/223839661-6245c896-a5f8-4dda-98d3-ad3057d0bbe8.png" width=60% height=60%>
The above image allows the user to sort the different currency rates and shows the conversions for the different currencies to bitcoin.

