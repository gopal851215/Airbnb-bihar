// import React, { useEffect, useState } from "react";

// function Favourite() {
//   const [favourites, setFavourites] = useState([]);

//   useEffect(() => {
//     const storedFav = JSON.parse(localStorage.getItem("favourites")) || [];
//     setFavourites(storedFav);
//   }, []);

//   const removeFavourite = (home) => {
//     const updatedFav = favourites.filter(
//       (f) => f.name !== home.name
//     );

//     setFavourites(updatedFav);
//     localStorage.setItem("favourites", JSON.stringify(updatedFav));
//   };

//   return (
//     <div style={container}>
//       <h2 style={heading}>❤️ My Favourite Homes</h2>

//       {favourites.length === 0 ? (
//         <p style={emptyText}>No favourites added yet</p>
//       ) : (
//         <div style={grid}>
//           {favourites.map((home, index) => (
//             <div key={index} style={card}>
//               <img src={home.photo} alt={home.name} style={image} />

//               <div style={content}>
//                 <h3>{home.name}</h3>
//                 <p>📍 {home.location}</p>
//                 <p>⭐ {home.rating}</p>
//                 <p style={desc}>{home.description}</p>

//                 <button
//                   onClick={() => removeFavourite(home)}
//                   style={removeBtn}
//                   onMouseOver={(e) =>
//                     (e.target.style.transform = "scale(1.05)")
//                   }
//                   onMouseOut={(e) =>
//                     (e.target.style.transform = "scale(1)")
//                   }
//                 >
//                   💔 Remove Favourite
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// /* 🎨 STYLES */

// const container = {
//   padding: "30px",
//   background: "#f7f7f7",
//   minHeight: "100vh",
// };

// const heading = {
//   textAlign: "center",
//   marginBottom: "30px",
//   fontSize: "28px",
// };

// const emptyText = {
//   textAlign: "center",
//   fontSize: "18px",
//   color: "#666",
// };

// const grid = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//   gap: "20px",
// };

// const card = {
//   background: "#fff",
//   borderRadius: "16px",
//   overflow: "hidden",
//   boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
//   transition: "transform 0.3s ease",
// };

// const image = {
//   width: "100%",
//   height: "180px",
//   objectFit: "cover",
// };

// const content = {
//   padding: "16px",
// };

// const desc = {
//   fontSize: "14px",
//   color: "#555",
//   marginBottom: "12px",
// };

// /* ❤️ IMPROVED REMOVE BUTTON */
// const removeBtn = {
//   padding: "10px 18px",
//   borderRadius: "30px",
//   border: "none",
//   background: "linear-gradient(135deg, #ff385c, #ff5a5f)",
//   color: "#fff",
//   cursor: "pointer",
//   fontWeight: "600",
//   fontSize: "14px",
//   display: "inline-flex",
//   alignItems: "center",
//   gap: "6px",
//   boxShadow: "0 6px 14px rgba(255,56,92,0.35)",
//   transition: "all 0.3s ease",
// };

// export default Favourite;
import React, { useEffect, useState } from "react";
import { getUserId } from "../utils/auth";

function Favourite() {
  // 🧑 Logged-in user
  const userId = getUserId();

  // 🔑 User specific key
  const favKey = `favourites_${userId}`;

  const [favourites, setFavourites] = useState([]);

  // 🔄 Load favourites on page load
  useEffect(() => {
    if (!userId) return;

    const storedFav =
      JSON.parse(localStorage.getItem(favKey)) || [];
    setFavourites(storedFav);
  }, [favKey, userId]);

  // ❌ Remove favourite
  const removeFavourite = (home) => {
    const updatedFav = favourites.filter(
      (f) => f.name !== home.name
    );

    setFavourites(updatedFav);
    localStorage.setItem(favKey, JSON.stringify(updatedFav));
  };

  // 🚫 If user not logged in
  if (!userId) {
    return (
      <div style={container}>
        <h2 style={heading}>❤️ My Favourite Homes</h2>
        <p style={{ textAlign: "center" }}>
          Please login to view favourites
        </p>
      </div>
    );
  }

  return (
    <div style={container}>
      <h2 style={heading}>❤️ My Favourite Homes</h2>

      {favourites.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No favourites added yet
        </p>
      ) : (
        <div style={grid}>
          {favourites.map((home, index) => (
            <div key={index} style={card}>
              <img
                src={home.photo}
                alt={home.name}
                style={image}
              />

              <div style={content}>
                <h3>{home.name}</h3>
                <p>📍 {home.location}</p>
                <p>⭐ {home.rating}</p>
                <p style={desc}>{home.description}</p>

                <button
                  onClick={() => removeFavourite(home)}
                  style={removeBtn}
                >
                  ❌ Remove Favourite
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  padding: "30px",
  background: "#f7f7f7",
  minHeight: "100vh",
};

const heading = {
  textAlign: "center",
  marginBottom: "30px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "20px",
};

const card = {
  background: "#fff",
  borderRadius: "14px",
  overflow: "hidden",
  boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
};

const image = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
};

const content = {
  padding: "15px",
};

const desc = {
  fontSize: "14px",
  color: "#555",
};

const removeBtn = {
  marginTop: "12px",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#ff385c",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "600",
};

export default Favourite;
