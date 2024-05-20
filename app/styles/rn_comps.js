import {StyleSheet} from 'react-native';
import {COLORS} from './../styles/colors.js';

const rncomps = StyleSheet.create({
    
    pri_l1:{
        backgroundColor: COLORS.PRI.alt_light1
    },
    pri_l2:{
        backgroundColor: COLORS.PRI.alt_light2
    },
    pri_d1:{
        backgroundColor: COLORS.PRI.alt_dark1
    },
    pri_d2:{
        backgroundColor: COLORS.PRI.alt_dark2
    },
    pri:{
        backgroundColor: COLORS.PRI._
    },
    mid_rad:{
        borderRadius: 0
    },
    right_rad:{
        borderTopRightRadius: 5,
        borderBottomRightRadius: 15,
    },
    left_rad:{
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 5
    },
    full_rad:{
        borderRadius: 5,
    },
  
  });

  export default rncomps