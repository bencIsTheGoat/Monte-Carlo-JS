* Monte Carlo Simulator for Stocks
* Background and Overview
    * I chose to do this project because I have a strong interest in finance and I wanted to demonstrate my quantitative finance and applied statistics skills through my javascript.
    * This project will be able to search and select a stock and then an animated line chart will display a line representing a simulation as well as a barchart displaying the distribution of final stocks price at time n
* Functionality and MVP Features
    * Search
        * Store company information in google firebase (name, ticker)
        * Display input field asking user to search company
        * Dropdown menu that allows user to select companies
    * Line Chart
        * Animates lines drawn that represent each simluation or future stock price
        * Implmented using D3
    * Bar Chart
        * Animates distribution of stock price at time n, each bar represents a range of stock prices and the height of bar will represent frequency of values
* Architecture and Tech
    * D3
        * Data visualization tool used in javascript
        * I will use for D3 for both bar and line chart
    * Google Firebase - for storing stock info
        * Database
        * I will use to store stocks for search function
    * JQuery
        * Javascript library
        * I will use to get stock price data from external API
    * IEX 
        * External API
        * I will use to get stock price data
* Implementation Timeline
    * Thursday 4/10
        * Setup up Google Firebase with stock information
        * Setup file structure in VS Code
        * Implement search functionality with dropdown and external API query
        * Get a sample line chart rendering with actual stock price data
        * Setup up math for line to input into linechart
    * Friday 4/11
        * Get linechart to animate lines on chart
        * Style chart
    * Weekend/Monday 4/14
        * Finish Linechart with animations
        * Start barchart and get first animation
        * Synchronize animation between linechart and barchart
    * Tuesday 4/15
        * Finish barchart and all animations
        * Style barchart
    * Wednesday 4/16
        * Final debugging and styling day
        