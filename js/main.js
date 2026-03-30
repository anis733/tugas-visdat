// Memuat data dari file CSV (Pastikan pemisah di file .csv adalah koma)
d3.csv("Data/sandwiches.csv").then(function(data) {

    console.log("Data dari CSV berhasil dimuat:", data);

    // =========================
    // 1. KONVERSI TIPE DATA
    // =========================
    data.forEach(d => {
        d.price = +d.price; // Mengubah string "7.95" menjadi angka 7.95
    });

    // =========================
    // 2. PENGATURAN CANVAS SVG
    // =========================
    // Menghapus SVG lama jika ada (mencegah duplikasi saat refresh)
    d3.select("#chart").select("svg").remove();

    const width = 600;
    const height = 400;

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // =========================
    // 3. FUNGSI LOGIKA VISUAL
    // =========================
    
    // Ukuran berdasarkan kategori 'size'
    function getRadius(size) {
        return size.toLowerCase() === "large" ? 35 : 18;
    }

    // Warna berdasarkan ambang batas harga $7.00
    function getColor(price) {
        return price < 7.00 ? "#ffa500" : "#4682b4"; // Orange atau Steelblue
    }

    // =========================
    // 4. MENGGAMBAR LINGKARAN
    // =========================
    const circles = svg.selectAll("circle")
        .data(data);

    circles.enter()
        .append("circle")
        .merge(circles) // Menggabungkan data baru dengan elemen yang sudah ada
        .attr("cx", (d, i) => 70 + i * 85) // Jarak antar lingkaran
        .attr("cy", height / 2)           // Posisi vertikal di tengah
        .attr("r", d => getRadius(d.size))
        .attr("fill", d => getColor(d.price))
        .attr("stroke", "#333")
        .attr("stroke-width", 2)
        // Tambahkan efek transisi halus (opsional)
        .style("opacity", 0)
        .transition()
        .duration(800)
        .style("opacity", 1);

    // Menghapus elemen yang tidak lagi memiliki data
    circles.exit().remove();

}).catch(function(error) {
    // Menampilkan pesan jika file tidak ditemukan atau error loading
    console.error("Gagal memuat file CSV. Pastikan path 'Data/sandwiches.csv' sudah benar.", error);
});
