"use client"

import { OrderInterface } from "@/interfaces/OrderInterface";
import { useEffect, useState } from "react";


function AllOrders() {
  const [orders, setOrders] = useState([])

  async function getOrders() {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem("cartId")}`);
    const data = await response.json()
    setOrders(data)
  }

  useEffect(() => {
    getOrders()
  }, [])

  
  return (
    <div className="py-12 px-[3vw] lx:px-[7vw] container mx-auto">
      <h2 className="mb-5 text-2xl font-bold">AllOrders</h2>

      <div>

         {orders.map((order: OrderInterface) => {
          return (
            <div key={order._id} className="border-2  p-5 shadow mb-5 flex items-center justify-between">
              
              <div>
                <p>Username: {order.user.name}</p>
                <p>Email: {order.user.email}</p>
              </div>
              <div>
                <p>City: {order.shippingAddress.city}</p>
                <p>Details: {order.shippingAddress.details}</p>
                <p>Phone: {order.shippingAddress.phone}</p>
              </div>
             
                <p>Price:{order.totalOrderPrice} EGP</p>

                <p>{order.isDelivered ? "Delivered" : "Not Delivered"}</p>
                <p>{order.isPaid ? "Paid" : "Not Paid"}</p>
             
            </div>
          )
        })} 

      </div>

    </div>
  )
}

export default AllOrders