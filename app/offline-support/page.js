import dynamic from "next/dynamic";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';

const Map = dynamic(() => import("/components/Map.js"), { ssr: false });

const Dashboard = () => {
  const services = [
    { id: 1, title: "Loans", icon: "💰" },
    { id: 2, title: "Opening Bank Accounts", icon: "🏦" },
    { id: 3, title: "Opening Fixed Deposits", icon: "📊" },
    { id: 4, title: "Government Scheme Assistance", icon: "📜" },
  ];

  return (
    <div style={dashboardStyle}>
      {/* Hero Section */}
      <div style={heroStyle}>
        <h1 style={headerStyle}>Offline Support Centers</h1>
        <p style={subHeaderStyle}>Find your nearest support center for banking services</p>
      </div>

      {/* Map Section */}
      <div style={mapContainerStyle}>
        <Map />
      </div>

      {/* Services Section */}
      <div style={servicesContainerStyle}>
        <h2 style={sectionHeaderStyle}>Our Services</h2>
        <div style={serviceGridStyle}>
          {services.map((service) => (
            <div key={service.id} style={serviceCardStyle}>
              <span style={serviceIconStyle}>{service.icon}</span>
              <h3 style={serviceTitleStyle}>{service.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div style={infoStyle}>
        <h3 style={infoHeaderStyle}>Why Choose Our Offline Support?</h3>
        <p style={infoTextStyle}>
          Our support centers provide personalized assistance with all your banking needs.
          Expert staff members are available to guide you through various financial services
          and ensure a smooth experience.
        </p>
      </div>

      {/* Contact Section */}
      <div style={contactSectionStyle}>
        <h2 style={contactHeaderStyle}>Contact Us</h2>
        <div style={contactGridStyle}>
          <div style={contactItemStyle}>
            <FaEnvelope style={iconStyle} />
            <a href="mailto:support@offlinecenter.com" style={contactLinkStyle}>
              support@offlinecenter.com
            </a>
          </div>
          <div style={contactItemStyle}>
            <FaPhone style={iconStyle} />
            <span>+91 123 456 7890</span>
          </div>
          <div style={contactItemStyle}>
            <FaBuilding style={iconStyle} />
            <span>123 Main Street, Bangalore, India</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const dashboardStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#f8fafc",
};

const heroStyle = {
  background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
  color: "white",
  padding: "60px 20px",
  textAlign: "center",
};

const headerStyle = {
  fontSize: "3rem",
  fontWeight: "bold",
  margin: 0,
  marginBottom: "10px",
};

const subHeaderStyle = {
  fontSize: "1.2rem",
  opacity: 0.9,
};

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  margin: "20px 0",
};

const servicesContainerStyle = {
  padding: "40px 20px",
  background: "white",
};

const sectionHeaderStyle = {
  fontSize: "2rem",
  textAlign: "center",
  marginBottom: "30px",
  color: "#1e3a8a",
};

const serviceGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 20px",
};

const serviceCardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
  cursor: "pointer",
  textAlign: "center",
  ":hover": {
    transform: "translateY(-5px)",
  },
};

const serviceIconStyle = {
  fontSize: "2.5rem",
  marginBottom: "15px",
  display: "block",
};

const serviceTitleStyle = {
  fontSize: "1.2rem",
  margin: 0,
  color: "#334155",
};

const infoStyle = {
  background: "white",
  padding: "40px 20px",
  maxWidth: "800px",
  margin: "40px auto",
  borderRadius: "15px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const infoHeaderStyle = {
  fontSize: "1.8rem",
  color: "#1e3a8a",
  marginBottom: "20px",
  textAlign: "center",
};

const infoTextStyle = {
  fontSize: "1.1rem",
  lineHeight: "1.7",
  color: "#475569",
  textAlign: "center",
};

const contactSectionStyle = {
  background: "#1e3a8a",
  color: "white",
  padding: "60px 20px",
  marginTop: "auto",
};

const contactHeaderStyle = {
  fontSize: "2.5rem",
  textAlign: "center",
  marginBottom: "40px",
};

const contactGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "30px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const contactItemStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  fontSize: "1.1rem",
};

const iconStyle = {
  fontSize: "1.5rem",
};

const contactLinkStyle = {
  color: "white",
  textDecoration: "none",
  ":hover": {
    textDecoration: "underline",
  },
};

export default Dashboard;
