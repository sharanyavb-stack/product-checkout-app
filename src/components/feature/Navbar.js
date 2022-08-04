import React from "react";
import { Link } from "react-router-dom";
import { IconButton, Badge } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { ShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {totalItems = 0} = useSelector((state) => state.cart);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "10%",
        padding: "0% 2%",
        backgroundImage: "linear-gradient( 45deg,#055393,#0097e6)",
        color: "#fff",
      }}
    >
      <IconButton>
        <ShoppingCart sx={{ color: "#fff" }} />
        <span className="logo">Store</span>
      </IconButton>

      <div>
        {/* <Link className="navLink" to="/">
          Home
        </Link>
        <Link className="navLink" to="/cart">
          Cart
        </Link> */}
        <Badge
          badgeContent={totalItems}
          sx={{
            "& .MuiBadge-badge": {
              color: "white",
              backgroundColor: "darkorange",
            },
          }}
        >
          <ShoppingBasketIcon />
        </Badge>
      </div>
    </div>
  );
};

export default Navbar;
