class Barchart {
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 1000,
            containerHeight: _config.containerHeight || 600,
            margin: _config.margin || { top: 70, right: 50, bottom: 100, left: 60 }
        }
        this.data = _data;
        this.initVis();
    }

    initVis() {
        let vis = this;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        // TO DO: Inisialisasi Scales
        vis.xScale = d3.scaleBand()
            .range([0, vis.width])
            .padding(0.2);

        vis.yScale = d3.scaleLinear()
            .range([0, vis.height]); // Akan dibalik kalkulasinya di renderVis

        // TO DO: Inisialisasi Axes
        vis.xAxis = d3.axisBottom(vis.xScale);
        vis.yAxis = d3.axisLeft(vis.yScale.copy().range([vis.height, 0]));

        // Setup SVG
        vis.svg = d3.select(vis.config.parentElement)
            .append('svg')
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // Group untuk sumbu
        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`);

        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis');

        // Label Sumbu Y
        vis.yAxisG.append('text')
            .attr('class', 'axis-title')
            .attr('y', -45)
            .attr('x', -vis.height / 2)
            .attr('transform', `rotate(-90)`)
            .attr('fill', 'black')
            .style('text-anchor', 'middle')
            .text('Percent Drinking (%)');
            
        // Label Sumbu X
        vis.xAxisG.append('text')
            .attr('class', 'axis-title')
            .attr('y', 50)
            .attr('x', vis.width / 2)
            .attr('fill', 'black')
            .style('text-anchor', 'middle')
            .text('State');
    }

    updateVis() {
        let vis = this;

        // TO DO: Tentukan accessor functions (sesuai kolom di CSV)
        vis.xValue = d => d.state;   // Kolom kode negara bagian (AL, AK, dll)
        vis.yValue = d => d.percent; // Kolom persentase

        // TO DO: Set input domains
        vis.xScale.domain(vis.data.map(vis.xValue));
        vis.yScale.domain([0, d3.max(vis.data, vis.yValue)]);

        vis.renderVis();
    }

    renderVis() {
        let vis = this;

        // Bind data ke elemen rect (bar)
        let bars = vis.chart.selectAll('.bar')
            .data(vis.data, vis.xValue);

        // EXIT: Hapus bar yang tidak ada di data filter terbaru
        bars.exit().remove();

        // ENTER: Tambahkan bar baru
        let barEnter = bars.enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('fill', '#4e79a7'); // Warna steelblue

        // UPDATE + ENTER (Pola Merge)
        barEnter.merge(bars)
            .transition().duration(800)
            .attr('x', d => vis.xScale(vis.xValue(d)))
            .attr('width', vis.xScale.bandwidth())
            .attr('y', d => vis.height - vis.yScale(vis.yValue(d)))
            .attr('height', d => vis.yScale(vis.yValue(d)));

        // Panggil Sumbu
        vis.xAxisG.call(vis.xAxis)
            .selectAll("text")
            .style("text-anchor", "middle")
            .attr("font-size", "9px");

        vis.yAxisG.call(vis.yAxis);
    }
}
