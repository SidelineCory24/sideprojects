# MetaPhase Consulting Code Challenge

API: https://www.balldontlie.io/#introduction

## Overview:
This script returns an NBA players statistics for the 2019-2020 season and displays them on a chart.

Initially, only a header and search button are displayed. Clicking the search button will prompt the user to enter a name.

The best results are found when a first and last name are entered. If a common name like "Jones" is entered, the user will be alerted of all the results returned (up to 100). The user can then do a more specific search.

A successful search will create a bar chart of the players stats. An alert will be shown on the page for any unsuccessful searches.

To do a new search, simply click the "search" button again.


### Files needed (in the same directory):
1. index.html
2. styles.ccs
3. app.js


### Build Requirements:
1. Latest version of Google Chrome
2. Open the "index.html" file
3. Click the search button


*There is a rate limit of 60 requests per minute and the API can only return 100 results in a pagination.*

