class BarChart {

    constructor(data, average) {
        this.data = data;
        this.margin = { top: 50, right: 50, bottom: 50, left: 50 };
        this.width = 50% - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;

        d3.selectAll('.barchart').remove();

        this.svg = d3.select('.charts').append('svg')
        .attr('class', 'barchart')
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append('g')
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        this.x = d3.scaleLinear()
        .range([0, this.width])
        .domain([d3.min(this.data, d => d) - 5, d3.max(this.data, d => d) + 5]);
        
        this.hist = d3.histogram()
        .domain(this.x.domain())
        .thresholds(this.x.ticks(20))(this.data)


        this.yMax = d3.max(this.hist, d => d.length)
        this.y = d3.scaleLinear()
        .range([this.height, 0])
        .domain([0, d3.max(this.hist, d => d.length)])

        this.colorScale = d3.scaleLinear()
        .domain([0, d3.max(this.hist, data => data.length)])
        .range([d3.rgb('lightgreen').brighter(), d3.rgb('lightgreen').darker()])

        this.svg.append('g')
        .attr('id', 'x-axis')
        .attr("transform", `translate(0, ${this.height})`)
        .call(d3.axisBottom(this.x))

        this.line = d3.line()
            .x(average)
            .y([0, this.yMax])

        this.bar = this.svg.selectAll('bar')
        .data(this.hist)
        .enter()
        .append('g')
        .attr('class', 'bar')
        .attr('transform', d => `translate(${this.x(d.x0)}, ${this.y(d.length)})`)

        this.bar.append('rect')
        .attr('height', 0)
        .attr('width', d => this.x(d.x1) - this.x(d.x0) - 1)
        .attr('y', d => this.height - this.y(d.length))
        // .attr('opacity', 0)
        .transition()
        .duration(8000)
        .delay((d, i) => i * 80 + 6000)
        .ease(d3.easeBounce)
        .attr('fill', d => this.colorScale(d.length))
        .attr('opacity', 1)
        .attr('y', 0)
        .attr('width', d => this.x(d.x1) - this.x(d.x0) - 1)
        .attr('height', d => this.height - this.y(d.length))

        this.line = d3.line()
            .x(this.x(average))
            .y([0, this.yMax])

        this.svg
        .append('g')
        .selectAll('line')
        .data([{y1: 0, y2: this.height, x1: this.x(average), x2: this.x(average)}])
        .enter()
        .append('line')
        .attr('class', 'avgLine')
        .attr('y1', this.height)
        .attr('y2', d => d.y2)
        .attr('x1', d => d.x1)
        .attr('x2', d => d.x2)
        .attr('stroke', 'orange')
        .attr('fill', 'none')
        .attr('stroke-width', '0')
        .transition()
            .delay((d, i) => i * 8000 + 6000)
        .duration(8000)
        .attr('y1', d => d.y1)
        .attr('stroke-width', '6')

        let currency = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })

        this.svg
        .append('text')
        .attr('stroke', 'none')
        .attr('y', this.height)
        .transition()
        .duration(8000)
        .delay((d, i) => i * 8000 + 6000)
        .attr('opacity', '1')
        .attr('fill', 'orange')
        .attr('x', this.x(average)-70)
        .attr('y', -5)
        .text(`Projected Price ${currency.format(average)}`)
        
        this.svg.append('g')
        .attr('class', 'xaxis')
        .attr('transform', `translate(0, ${this.height})`)

        this.svg.append('text')
        .text('Price ($)')
        .attr('y', this.height + 30)
        .attr('x', this.width / 2)
        
        this.svg.append('text')
            .text('Distribution of Projected Prices')
            .style('font-weight', '900')
            .attr('font-size', '22px')
            .attr('y', -30)
            .attr('x', this.width / 2 - 130)

    }

}

module.exports = BarChart