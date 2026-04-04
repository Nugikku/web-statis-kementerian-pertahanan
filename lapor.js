
        // Form submission handler
        document.getElementById('laporForm').addEventListener('submit', function(event) {
            event.preventDefault();

            // Get form values
            const nama = document.getElementById('nama').value.trim();
            const kontak = document.getElementById('kontak').value.trim();
            const judul = document.getElementById('judul').value.trim();
            const isi = document.getElementById('isi').value.trim();
            const asal = document.getElementById('asal').value.trim();
            const instansi = document.getElementById('instansi').value;

            // Validate required fields
            if (!nama || !kontak || !judul || !isi || !asal) {
                alert('❌ Mohon lengkapi data dan permintaan anda!');
                return;
            }

            // Create report object
            const laporan = {
                id: Date.now(), // Unique ID for each report
                nama: nama,
                kontak: kontak,
                judul: judul,
                isi: isi,
                asal: asal,
                instansi: instansi || 'Tidak dipilih',
                waktu: new Date().toLocaleString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                status: 'Terkirim'
            };

            // Get existing reports from memory (simulating localStorage)
            let riwayatLaporan = JSON.parse(sessionStorage.getItem('riwayatLaporan') || '[]');

            // Add new report
            riwayatLaporan.push(laporan);

            // Save back to session storage
            sessionStorage.setItem('riwayatLaporan', JSON.stringify(riwayatLaporan));

            // Show success message
            showSuccessMessage();

            // Update history display
            tampilkanRiwayat();

            // Reset form
            this.reset();

            // Scroll to history section
            setTimeout(() => {
                document.getElementById('riwayat-laporan').scrollIntoView({
                    behavior: 'smooth'
                });
            }, 500);
        });

        // Show success message
        function showSuccessMessage() {
            const successMsg = document.getElementById('success-message');
            successMsg.style.display = 'block';

            // Hide after 5 seconds
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
        }

        // Display report history
        function tampilkanRiwayat() {
            const container = document.getElementById('list-riwayat');
            const data = JSON.parse(sessionStorage.getItem('riwayatLaporan') || '[]');

            container.innerHTML = '';

            if (data.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <p>Belum ada laporan yang dikirim.</p>
                        <p>Kirim laporan pertama Anda menggunakan formulir di atas.</p>
                    </div>
                `;
                return;
            }

            // Show reports in reverse order (newest first)
            data.slice().reverse().forEach((laporan, index) => {
                const reportHtml = `
                    <div class="riwayat-item">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                            <strong>📋 ${laporan.judul}</strong>
                            <small style="background: #28a745; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px;">
                                ✅ ${laporan.status}
                            </small>
                        </div>
                        <small><em>📅 ${laporan.waktu}</em></small>

                        <div class="report-detail">
                            <p><strong> Nama:</strong> ${laporan.nama}</p>
                            <p><strong> Kontak:</strong> ${laporan.kontak}</p>
                            <p><strong> Asal:</strong> ${laporan.asal}</p>
                            <p><strong> Instansi:</strong> ${laporan.instansi}</p>
                            <p><strong> Isi Laporan:</strong></p>
                            <div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin-top: 5px; border-left: 3px solid #CB0404;">
                                ${laporan.isi}
                            </div>
                        </div>

                        <div style="text-align: right; margin-top: 10px;">
                            <small style="color: #666;">📋 ID Laporan: #${laporan.id}</small>
                        </div>

                        ${index < data.length - 1 ? '<hr>' : ''}
                    </div>
                `;
                container.innerHTML += reportHtml;
            });
        }

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            tampilkanRiwayat();

            // Add some animation effects
            const formInputs = document.querySelectorAll('input, textarea, select');
            formInputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.style.transform = 'translateY(-2px)';
                });

                input.addEventListener('blur', function() {
                    this.parentElement.style.transform = 'translateY(0)';
                });
            });
        });

        // Add smooth scrolling for navigation
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    document.querySelector(href).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add loading animation for form submission
        document.getElementById('laporForm').addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = '⏳ Mengirim...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });

        document.addEventListener('DOMContentLoaded', function() {
            const namaInput = document.getElementById('nama');
            const kontakInput = document.getElementById('kontak');
    
            // Periksa apakah ada data pengguna yang tersimpan di sessionStorage
            const loggedInUserName = sessionStorage.getItem('loggedInUserName');
            const loggedInUserContact = sessionStorage.getItem('loggedInUserContact');
    
            if (loggedInUserName && loggedInUserContact) {
                // Isi otomatis field jika data ditemukan
                if (namaInput) {
                    namaInput.value = loggedInUserName;
                    namaInput.readOnly = true; // Opsional: Jadikan field hanya bisa dibaca
                    namaInput.style.backgroundColor = '#e9e9e9'; // Opsional: Beri warna abu-abu
                }
                if (kontakInput) {
                    kontakInput.value = loggedInUserContact;
                    kontakInput.readOnly = true; // Opsional: Jadikan field hanya bisa dibaca
                    kontakInput.style.backgroundColor = '#e9e9e9'; // Opsional: Beri warna abu-abu
                }
                console.log('Formulir diisi otomatis dengan data pengguna yang login.');
            } else {
                console.log('Tidak ada data pengguna yang login ditemukan di sessionStorage.');
            }
        });