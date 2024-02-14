import { uiAction } from "./ui-slice"
import { cartAction } from "./cart-slice";

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://advanced-redux-fbc7e-default-rtdb.firebaseio.com/cart.json')
            
            
            if(!response.ok) {
                throw new Error('Could not fetch cart data!')
            }
            const data = await response.json();

            return data;
        }
        try {
            const cartData = await fetchData();
            dispatch(cartAction.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))
            
        } catch (error) {
            dispatch(uiAction.showNotificatioin({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed!'
              }))
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiAction.showNotificatioin({
            status: 'pending',
            title: 'Sending',
            message: 'Sending cart data!'
          }))

          const sendRequest = async () => {
            const response = await fetch('https://advanced-redux-fbc7e-default-rtdb.firebaseio.com/cart.json', { 
      method: 'PUT',
      body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}),
    });

    if (!response.ok) {
      throw new Error('Sending car data failed')
    }
    }

    try {
        await sendRequest();

        dispatch(uiAction.showNotificatioin({
            status: 'success',
            title: 'Success!',
            message: 'Sending cart data successfully!'
          }))

    }catch (error) {
        dispatch(uiAction.showNotificatioin({
            status: 'error',
            title: 'Error!',
            message: 'Sending cart data failed!'
          }))
    }
    }
}
