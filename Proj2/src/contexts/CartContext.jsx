import React, { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]) // [{ businessId, businessName, items: [{ menuItem, quantity }] }]

  const addToCart = useCallback((businessId, businessName, menuItem, quantity = 1) => {
    setCart(prevCart => {
      const businessIndex = prevCart.findIndex(item => item.businessId === businessId)
      
      if (businessIndex === -1) {
        // New business - add new entry
        return [...prevCart, {
          businessId,
          businessName,
          items: [{ menuItem, quantity }]
        }]
      } else {
        // Business exists - add/update item
        const updatedCart = [...prevCart]
        const itemIndex = updatedCart[businessIndex].items.findIndex(
          item => item.menuItem.id === menuItem.id
        )
        
        if (itemIndex === -1) {
          // New item for this business
          updatedCart[businessIndex].items.push({ menuItem, quantity })
        } else {
          // Update quantity
          updatedCart[businessIndex].items[itemIndex].quantity += quantity
        }
        
        return updatedCart
      }
    })
  }, [])

  const updateQuantity = useCallback((businessId, menuItemId, quantity) => {
    setCart(prevCart => {
      const businessIndex = prevCart.findIndex(item => item.businessId === businessId)
      if (businessIndex === -1) return prevCart
      
      const updatedCart = [...prevCart]
      const itemIndex = updatedCart[businessIndex].items.findIndex(
        item => item.menuItem.id === menuItemId
      )
      
      if (itemIndex === -1) return prevCart
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        updatedCart[businessIndex].items.splice(itemIndex, 1)
        // Remove business entry if no items left
        if (updatedCart[businessIndex].items.length === 0) {
          updatedCart.splice(businessIndex, 1)
        }
      } else {
        updatedCart[businessIndex].items[itemIndex].quantity = quantity
      }
      
      return updatedCart
    })
  }, [])

  const removeFromCart = useCallback((businessId, menuItemId) => {
    setCart(prevCart => {
      const businessIndex = prevCart.findIndex(item => item.businessId === businessId)
      if (businessIndex === -1) return prevCart
      
      const updatedCart = [...prevCart]
      const itemIndex = updatedCart[businessIndex].items.findIndex(
        item => item.menuItem.id === menuItemId
      )
      
      if (itemIndex === -1) return prevCart
      
      updatedCart[businessIndex].items.splice(itemIndex, 1)
      
      // Remove business entry if no items left
      if (updatedCart[businessIndex].items.length === 0) {
        updatedCart.splice(businessIndex, 1)
      }
      
      return updatedCart
    })
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, business) => {
      const businessTotal = business.items.reduce((sum, item) => {
        return sum + (item.menuItem.price * item.quantity)
      }, 0)
      return total + businessTotal
    }, 0)
  }, [cart])

  const getCartItemCount = useCallback(() => {
    return cart.reduce((count, business) => {
      return count + business.items.reduce((sum, item) => sum + item.quantity, 0)
    }, 0)
  }, [cart])

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

