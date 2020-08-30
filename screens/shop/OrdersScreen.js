import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet, Text, Platform, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import * as OrdersAction from '../../store/actions/orders'
import Colors from '../../constants/Colors'

const OrdersScreen = (props) => {
    const orders = useSelector(state => state.orders.orders)

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        const loading = async () => {
            setIsLoading(true)
            await dispatch(OrdersAction.fetchOrders())
            setIsLoading(false)
        }
        loading()
    }, [dispatch])

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    if (orders.length === 0) {
        return <View style={styles.centered}>
            <Text>No orders made yet!!</Text>
            <Text>Hurry !! Lets order some</Text>
        </View>
    }

    return (
        <FlatList
            data={orders}
            renderItem={itemData =>
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            }
        />
    )
}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )

    }

}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrdersScreen
