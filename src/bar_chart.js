class BarChart {

    constructor(data, range) {
        this.data = data;
        this.margin = { top: 50, right: 50, bottom: 50, left: 50 };
        this.width = 700 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;

        this.svg = d3.select('.barchart')
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append('g')
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        this.x = d3.scaleLinear()
        .range([0, this.width])
        .domain([20 + d3.min(this.data, d => d), d3.max(this.data, d => d) + 20]);
        
        this.hist = d3.histogram()
        .domain(this.x.domain())
        .thresholds(this.x.ticks(20))(this.data)


        this.y = d3.scaleLinear()
        .range([this.height, 0])
        .domain([0, d3.max(this.hist, d => d.length)])

        this.colorScale = d3.scaleLinear()
        .domain([0, d3.max(this.hist, data => data.length)])
        .range([d3.rgb('lightgreen').brighter(), d3.rgb('lightgreen').darker()])

        this.svg.append('g')
        .attr('id', 'x-axis')
        .attr("transform", `translate(0, ${this.height})`)
        .call(d3.axisBottom(this.x));

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
        .delay((d, i) => i * 80)
        .ease(d3.easeBounce)
        .attr('fill', d => this.colorScale(d.length))
        .attr('opacity', 1)
        .attr('y', 0)
        // .attr('width', d => this.x(d.x1) - this.x(d.x0) - 1)
        .attr('height', d => this.height - this.y(d.length))


        this.svg.append('g')
        .attr('class', 'xaxis')
        .attr('transform', `translate(0, ${this.height})`)
        
    }
    
    // refreshBar(data) {
    //     debugger;

    //     let x = d3.scaleLinear()
    //     .range([0, this.width])
    //     .domain([20 + d3.min(data, d => d), d3.max(data, d => d) + 20]);

    //     let hist = d3.histogram()
    //     .domain(this.x.domain())
    //     .thresholds(this.x.ticks(20))(data)

    //     let y = d3.scaleLinear()
    //     .range([this.height, 0])
    //     .domain([0, d3.max(hist, d => d.length)])


    //     let colorScale = d3.scaleLinear()
    //     .domain([0, d3.max(hist, data => data.length)])
    //     .range([d3.rgb('lightgreen').brighter(), d3.rgb('lightgreen').darker()])

    //     let bar = this.svg.selectAll('bar')
    //     .data(hist, d => d)

    //     // bar
    //     // .attr('transform', d => `translate(${x(d.x0)}, ${y(d.length)})`)

    //     bar.exit().remove()

    //     bar
    //     .enter()
    //     .append('rect')
    //     .attr('class', 'bar')
    //     .attr('height', this.height - y(0))
    //     // .attr('width', d => x(d.x1) - x(d.x0) - 1)
    //     .attr('fill', d => colorScale(d.length))

    //     bar
    //     .attr('x', d => d)
    //     .attr('fill', d => colorScale(d.length))
    //     .attr('height', d => this.height - y(d.length))
    //     .attr('width', 20)



    // }
}

module.exports = BarChart