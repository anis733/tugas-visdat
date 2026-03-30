d3.csv("Data/sandwiches.csv").then(function(data) {

    console.log("Data berhasil dimuat:", data);

    data.forEach(d => {
        d.price = +d.price; 
    });

    d3.select("#chart").select("svg").remove();

    const width = 700; // Sedikit diperlebar agar teks tidak mepet
    const height = 400;

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    function getRadius(size) {
        return size.toLowerCase() === "large" ? 35 : 18;
    }

    function getColor(price) {
        return price < 7.00 ? "#ffa500" : "#4682b4";
    }

    // =========================================
    // 1. MENGGAMBAR LINGKARAN
    // =========================================
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => 80 + i * 90) // Jarak cx disesuaikan agar teks tidak tumpang tindih
        .attr("cy", 200)
        .attr("r", d => getRadius(d.size))
        .attr("fill", d => getColor(d.price))
        .attr("stroke", "#333")
        .attr("stroke-width", 2);

    // =========================================
    // 2. MENAMBAHKAN TEKS (KETERANGAN)
    // =========================================
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(d => d.name) // Menampilkan Nama Sandwich
        .attr("x", (d, i) => 80 + i * 90)
        .attr("y", 260)    // Posisi teks di bawah lingkaran
        .attr("font-size", "12px")
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle") // Agar teks rata tengah dengan lingkaran
        .attr("fill", "black");

    // Menambahkan Label Harga (Opsional)
    svg.selectAll(".price-label")
        .data(data)
        .enter()
        .append("text")
        .text(d => "$" + d.price)
        .attr("x", (d, i) => 80 + i * 90)
        .attr("y", 280)    // Di bawah nama sandwich
        .attr("font-size", "10px")
        .attr("text-anchor", "middle")
        .attr("fill", "gray");

}).catch(error => console.error("Error:", error));
