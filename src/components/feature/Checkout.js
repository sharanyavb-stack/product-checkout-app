import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Cart from '../../pages/Cart'
import { useDispatch, useSelector } from 'react-redux';
import { changeTabIndex } from '../../store/reducers/TabSlice';
import BillingAddress from '../../pages/BillingAddress';
import Payment from '../../pages/Payment';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Checkout() {
  const [value, setValue] = React.useState(0);
  const {tabIndex = 0} = useSelector(state => state.tab);
  const dispatch = useDispatch()
  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(changeTabIndex(newValue))
  };
  React.useEffect(() => {
    handleChange( '', tabIndex)
  }, [tabIndex])
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Cart" {...a11yProps(0)} />
          <Tab label="Delivery Address" {...a11yProps(1)} />
          <Tab label="Payment" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Cart/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BillingAddress/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Payment/>
      </TabPanel>
    </Box>
  );
}
