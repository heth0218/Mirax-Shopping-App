import { createStackNavigator } from 'react-navigation-stack';// New in React
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import { createAppContainer } from 'react-navigation';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import Colors from '../constants/Colors'
import { Platform } from 'react-native'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import UserProductScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary

}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen

}, {
    //applys to only where this navigator is used
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name={Platform.OS === 'android' ? "md-cart" : 'ios-cart'}
            size={23}
            color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNavOptions
})

const OrdersNavigator = createStackNavigator({
    orders: OrdersScreen
}, {
    //applys to only where this navigator is used
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name={Platform.OS === 'android' ? "md-list" : 'ios-list'}
            size={23}
            color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNavOptions
})

const AdminNavigator = createStackNavigator({
    userProducts: UserProductScreen,
    EditProduct: EditProductScreen
}, {
    //applys to only where this navigator is used
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name={Platform.OS === 'android' ? "md-create" : 'ios-create'}
            size={23}
            color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
})

export default createAppContainer(ShopNavigator)