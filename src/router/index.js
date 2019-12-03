import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from '../view/App';
import Location from '../view/location/location';
import Signature from '../view/signature/signature';

const RootStack = createStackNavigator(
  {
    Home: {screen: Home}, // 首页
    Location: {screen: Location}, // 定位经纬度
    Signature: {screen: Signature}, // 手写板
  },
  {
    // 默认页面
    initialRouteName: 'Home',
    headerMode: 'screen',
    // 用于屏幕的默认导航选项
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#515a6e',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      gesturesEnabled: true,
    },
  },
);

//将Navigation作为根路径导出
export default createAppContainer(RootStack);
