import React from "react";

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #ff385c, #ff914d)",
        color: "#fff",
        marginTop: "50px",
      }}
    >
      {/* Top Section */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "50px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "30px",
        }}
      >
        {/* About */}
        <div>
          <h3>Airbnb Clone</h3>
          <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
            Discover unique homes, experiences, and places around the world.
            Built with ❤️ using React.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3>Quick Links</h3>
          <p>Homes</p>
          <p>Bookings</p>
          <p>Favourites</p>
          <p>Host Homes</p>
          <p>Add Home</p>
        </div>

        {/* Support */}
        <div>
          <h3>Support</h3>
          <p>Help Center</p>
          <p>Safety Information</p>
          <p>Cancellation Policy</p>
          <p>Privacy Policy</p>
        </div>

        {/* Contact Me */}
        <div>
          <h3>Contact Me</h3>

          <input
            type="text"
            placeholder="Your Name"
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Your Email"
            style={inputStyle}
          />
          <textarea
            placeholder="Your Message"
            rows="3"
            style={inputStyle}
          ></textarea>

          <button
            style={{
              marginTop: "10px",
              padding: "10px",
              width: "100%",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#fff",
              color: "#ff385c",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Send Message
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.15)",
          padding: "14px",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        © {new Date().getFullYear()} Airbnb Clone | Designed by Gopal
      </div>
    </footer>
  );
}

/* Reusable input style */
const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "8px",
  borderRadius: "6px",
  border: "none",
  outline: "none",
};

export default Footer;
