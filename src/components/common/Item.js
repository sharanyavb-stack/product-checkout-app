import { Card, Button, Tooltip, Skeleton , Rating, Typography} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { add } from "../../store/reducers/cartSlice";
import "./Item.css";

function Item({ product, loading }) {
  const dispatch = useDispatch();
  const handleAdd = (product) => {
    dispatch(add(product));
  };
  return loading ? (
    <div className="loading-card"><Skeleton width={"100%"} height={"100%"} /></div>
  ) : (
    <Card className="card">
      <img src={product.image} alt="" />
      <Tooltip title={product.title}>
        <Typography variant="subtitle2" mt={1} mb={1} className="overflowText">{product.title}</Typography>
      </Tooltip>
      <div className="rating-div">
      <Rating name="size-small" defaultValue={product.rating.rate} precision={0.5} size="small" readOnly/> 
      <Typography variant='caption' >({product.rating.count})</Typography>
      </div>
      <Typography variant="h6" sx={{fontSize: '16px'}} mt={1} mb={1} className="overflowText">${product.price}</Typography>
      
      <Button
        variant="contained"
        size="small"
        sx={{background: '#055393'}}
        startIcon={<ShoppingCart />}
        onClick={() => handleAdd(product)}
      >
        Add to Cart
      </Button>
    </Card>
  );
}
export default Item;
