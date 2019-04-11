class LineChart {

    constructor (data) {
        this.data = Object.values(data).map(ele => ele.data)
        // this.data = data
        this.margin = {top: 50, right: 150, bottom: 80, left: 50};
        this.width = 900 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        
        this.svg = d3.select("svg")
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
            .style('stroke-width', '4')
            .style('stoke-linecap', 'round')
            .style('stroke', () => this.randomColor())
            .attr('d', d => {
                return this.line(d)
            })

        d3.selectAll('.line')
            .style('opacity', '0')

        this.animateLine();

    }

    lineHelper (data) {
        data.forEach(ele => `line-${ele.date}`)
    }

    animateLine () {
        d3.selectAll('.line')
            .style('opacity', '1')

        let totalLength = d3.selectAll('.line').node().getTotalLength() * 1.3;

        d3.selectAll('.line')
            .attr('stroke-dasharray', totalLength + " " + totalLength)
            .attr('stroke-dashoffset', totalLength)
            .transition()
            .delay((d, i) => 500 * i)
            .ease(d3.easeLinear)
            .duration(5000)
            .attr('stroke-dashoffset', 0);
    }

    randomColor () {
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    }

}

module.exports = LineChart;