class LineChart {

    constructor (data, averageLine, avgEndPrice) {
        this.data = Object.values(data).map(ele => ele.data)
        // this.averageLine = Object.values(averageLine).map(ele => ele.data)
        this.margin = {top: 50, right: 100, bottom: 50, left: 70};
        this.width = 700 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        
        this.svg = d3.select(".linechart")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append('g')
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        this.x = d3.scaleLinear()
        .range([0, this.width])
        .domain([0, this.data[0].length]);

        this.y = d3.scaleLinear()
        .range([this.height, 0])
        .domain([d3.min(this.data, sim => d3.min(sim, data => data.price)), d3.max(this.data, sim => d3.max(sim, data => data.price))]);

        this.svg.append('g')
            .attr('id', 'x-axis')
            .attr("transform", `translate(0, ${this.height})`)
            .call(d3.axisBottom(this.x));


        this.svg.append("g")
            .attr('id', 'y-axis')
            .attr('transform', `0, translate(${this.width})`)
            .call(d3.axisLeft(this.y));

        this.line = d3.line()
            .x(data => this.x(data.date))
            .y(data => this.y(data.price))

        this.lines = this.svg.selectAll('.lines')
            .data(this.data)
            .enter()
            .append('g')
            .attr('class', '.lines')

            
        this.lines
            .append("path")
            .attr("class", 'line')
            .style('fill', 'none')
            .style('stroke-width', '3')
            .style('stoke-linecap', 'round')
            .style('stroke', () => this.randomColor())
            .attr('d', d => {
                this.line(d)
                return this.line(d)
            })

        this.lines
            .append('path')
            .attr('class', 'line')
            .style('fill', 'none')
            .style('stroke-width', '6')
            .style('stoke-linecap', 'round')
            .style('stroke', 'orange')
            .attr('d', () => {
                this.line(averageLine)
                return this.line(averageLine)
            })
            
        this.svg.append('text')
            .attr('class', 'projected')
        .text('Projected')
        .attr('fill', 'orange')
        .attr('opacity', 0)
        .attr('x', this.width)
        .attr('y', this.y(avgEndPrice)-10)


        this.svg.append('text')
            .attr('class', 'projected')
            .text('Path')
            .attr('fill', 'orange')
            .attr('opacity', '0')
            .attr('x', this.width)
            .attr('y', this.y(avgEndPrice)+10)

        this.svg.append('text')
            .text('Price ($)')
            .attr('y', -30)
            .attr('x', -(this.height / 2))
            .attr('transform', 'rotate(-90)')

        this.svg.append('text')
            .text('Days from Today')
            .attr('y', this.height + 30)
            .attr('x', this.width / 2 - 50)

        this.svg.append('text')
            .text('Future Stock Price Simulations')
            .style('font-weight', '900')
            .attr('font-size', '22px')
            .attr('y', -20)
            .attr('x', this.width / 2 - 130)
        

        this.animateLine();

    }

    lineHelper (data) {
        data.forEach(ele => `line-${ele.date}`)
    }

    animateLine () {
        d3.selectAll('.line')
            .style('opacity', '1')
            .style('font-weight', '900')

        let totalLength = d3.selectAll('.line').node().getTotalLength() * 1.7;

        d3.selectAll('.line')
            .attr('stroke-dasharray', totalLength + " " + totalLength)
            .attr('stroke-dashoffset', totalLength)
            .transition()
            .delay((d, i) => 40 * i)
            .ease(d3.easeExp)
            .duration(10000)
            .attr('stroke-dashoffset', 0);


        d3.selectAll('.projected')
        .transition()
        .duration(7000)
        .attr('opacity', '1')
    }

    randomColor () {
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    }

}

module.exports = LineChart;