// 1. Membaca file CSV
d3.csv("Data/cities.csv").then(function(data) {
    
    // 2. Konversi tipe data (Penting: agar populasi bisa dibandingkan secara numerik)
    data.forEach(d => {
        d.population = +d.population;
        d.x = +d.x;
        d.y = +d.y;
    });

    // 3. Filter Dataset: Hanya yang kolom eu === "true"
    // Tokyo, Wellington, dan New York akan terhapus di sini
    const filteredData = data.filter(d => d.eu === "true");
    
    console.log("Jumlah data setelah filter EU:", filteredData.length);

    // 4. Update paragraf di HTML dengan jumlah negara
    d3.select("#city-count")
        .text("Jumlah kota di Uni Eropa dalam dataset: " + filteredData.length);

    // 5. Inisialisasi SVG Container
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", 700)
        .attr("height", 550);

    // 6. Menggambar Lingkaran (Circles)
    svg.selectAll("circle")
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        // Logika Radius: < 1.000.000 = 4px, >= 1.000.000 = 8px
        .attr("r", d => (d.population < 1000000 ? 4 : 8))
        .attr("fill", "steelblue")
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    // 7. Menggambar Label Kota (Text)
    svg.selectAll(".city-label")
        .data(filteredData)
        .enter()
        .append("text")
        .attr("class", "city-label") // Menggunakan class sesuai instruksi
        .text(d => d.city)
        .attr("x", d => d.x)
        .attr("y", d => d.y - 12) // Posisi teks sedikit di atas lingkaran
        // Logika Opacity: Hanya muncul jika populasi >= 1.000.000
        .style("opacity", d => (d.population >= 1000000 ? 1 : 0));

}).catch(error => console.error("Error loading data:", error));
