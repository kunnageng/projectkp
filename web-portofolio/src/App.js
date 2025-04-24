import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from "./assets/logoDGB4.jpg";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="header-text">
          <h1>PT Duta Global Baswara</h1>
          <p>Mitra logistik terpercaya Anda</p>
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          &#9776;
        </div>
      </header>

      {/* OVERLAY */}
      <div
        className={`overlay${menuOpen ? " open" : ""}`}
        onClick={toggleMenu}
      />

      {/* SIDEBAR MENU */}
      <nav className={`menu${menuOpen ? " open" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Menu
            </Link>
          </li>
          <li>
            <Link to="/cek-ongkir" onClick={toggleMenu}>
              Cek Ongkir
            </Link>
          </li>
          <li>
            <Link to="/tracking" onClick={toggleMenu}>
              Tracking
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* ROUTING HALAMAN */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cek-ongkir" element={<CekOngkir />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2025 PT Duta Global Baswara</p>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <div className="home-section">
      <section className="profile">
        <h2>🏢 Profil Perusahaan</h2>
        <p>
          <strong>PT Duta Global Baswara</strong> adalah perusahaan yang
          bergerak di bidang logistik dan ekspedisi, menyediakan layanan
          pengiriman barang dengan cepat, aman, dan terjangkau ke seluruh
          wilayah Indonesia. Kami hadir sebagai mitra logistik yang dapat
          diandalkan untuk kebutuhan personal maupun bisnis Anda.
        </p>
      </section>

      <section className="struktur">
        <h2>📊 Struktur Organisasi</h2>
        <div className="struktur-grid">
          <div className="struktur-card">
            <h3>👨‍💼 Direktur Utama</h3>
            <p>Budi Santoso</p>
          </div>
          <div className="struktur-card">
            <h3>🧑‍💼 Manager Operasional</h3>
            <p>Rina Kartika</p>
          </div>
          <div className="struktur-card">
            <h3>👩‍💼 Manager Keuangan</h3>
            <p>Andi Wijaya</p>
          </div>
        </div>
      </section>

      <section className="lokasi">
        <h2>📍 Lokasi Perusahaan</h2>
        <p>
          Kantor pusat kami berlokasi di:
          <br />
          <strong>Jl. Logistik No. 88, Jakarta Barat, Indonesia</strong>
        </p>
      </section>

      <section className="why-choose-us">
        <h2>🌟 Mengapa Memilih Kami?</h2>
        <div className="keunggulan-grid">
          <div className="keunggulan-card">
            <h3>🔒 Keamanan Terjamin</h3>
            <p>Paket Anda kami jaga dengan sistem tracking & proteksi ketat.</p>
          </div>
          <div className="keunggulan-card">
            <h3>⚡ Pengiriman Cepat</h3>
            <p>Pengiriman dalam & luar kota lebih cepat dan tepat waktu.</p>
          </div>
          <div className="keunggulan-card">
            <h3>📍 Jangkauan Luas</h3>
            <p>Hadir di lebih dari 100 kota besar di Indonesia.</p>
          </div>
          <div className="keunggulan-card">
            <h3>📱 Tracking Real-Time</h3>
            <p>Cek posisi paket kapan saja dengan sistem real-time.</p>
          </div>
        </div>
      </section>

      <section className="anak-usaha">
        <h2>🚚 Anak Usaha</h2>
        <ul>
          <li>
            📦 <strong>Lion Parcel</strong> – Pengiriman cepat antar kota dan
            pulau
          </li>
          <li>
            🛵 <strong>J&T Express</strong> – Kurir modern dengan layanan
            real-time
          </li>
          <li>
            🚛 <strong>J&T Cargo</strong> – Solusi logistik untuk pengiriman
            skala besar
          </li>
        </ul>
      </section>
    </div>
  );
}

function CekOngkir() {
  const [berat, setBerat] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [estimasi, setEstimasi] = useState(null);

  const hitung = () => {
    if (!berat || !tujuan) return;
    const biaya = 10000 + berat * 5000;
    setEstimasi(`Rp ${biaya.toLocaleString()}`);
  };

  return (
    <section className="form-section">
      <h2>Cek Ongkir</h2>
      <input
        type="number"
        placeholder="Berat (kg)"
        value={berat}
        onChange={(e) => setBerat(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="Tujuan"
        value={tujuan}
        onChange={(e) => setTujuan(e.target.value)}
      />
      <button onClick={hitung}>Hitung</button>
      {estimasi && (
        <p>
          Estimasi ongkir ke {tujuan}: {estimasi}
        </p>
      )}
    </section>
  );
}

function Tracking() {
  const [resi, setResi] = useState("");
  const [courier, setCourier] = useState("jnt");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const lacak = async () => {
    if (!resi || !courier) return;

    setLoading(true);
    setError("");
    setStatus(null);

    try {
      const response = await fetch("http://localhost:3001/api/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resi, courier }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setStatus(data.data);
      } else {
        setError(data.message || "Tracking gagal. Coba lagi.");
      }
    } catch (err) {
      setError("Gagal menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-section">
      <h2>Tracking Pengiriman</h2>

      <label>Pilih Ekspedisi:</label>
      <select value={courier} onChange={(e) => setCourier(e.target.value)}>
        <option value="jnt">J&T Express</option>
        <option value="jnt_cargo">J&T Cargo</option>
        <option value="lion">Lion Parcel</option>
      </select>

      <input
        type="text"
        placeholder="Masukkan Nomor Resi"
        value={resi}
        onChange={(e) => setResi(e.target.value)}
      />

      <button onClick={lacak}>Lacak</button>

      {loading && <p>🔄 Sedang melacak...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {status && (
        <div>
          <p>
            <strong>Status:</strong> {status.summary.status}
          </p>
          <p>
            <strong>Kurir:</strong> {status.summary.courier}
          </p>
          <p>
            <strong>Penerima:</strong> {status.summary.receiver}
          </p>
          <ul>
            {status.history.map((item, index) => (
              <li key={index}>
                {item.date} - {item.desc} ({item.location})
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function Contact() {
  return (
    <section className="contact">
      <h2>Contact</h2>
      <p>Email: info@dutaglobalbaswara.co.id</p>
      <p>Telepon: (021) 1234-5678</p>
      <p>Alamat: Jl. Logistik No. 88, Jakarta Barat</p>
    </section>
  );
}

export default App;
