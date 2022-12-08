import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import {format} from "timeago.js"
import axios from "axios";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('')
  const [int, setInt] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users");
   
        setUsers(res.data);
      } catch {}
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("order");
        // let result = res.data.map(a => a.userId);
        // console.log(result);
        setOrders(res.data);
        console.log(status);
      } catch {}
    };
    getOrders();
  }, [status]);

  // useEffect(() => {
  //   const getRealOrders = async () => {
  //     try {
       
  //    console.log(orders);
  //    console.log(users);
  //    let array = []
  //   //  let res = orders.map(order => ({...users, id: orders.includes(order)}))
  //       let res = orders.forEach((order,x) => {
         
  //         for(var i = 0; i < users.length; i++) 
  //         if( users[i].id.includes(order[x]))
  //         console.log('radi');
  //         array.push(users[i])
    
  //       })
  //       console.log(array);
  //     setInt(res)
  //     console.log(res);
    
  //   } catch {}
  // }
  //   getRealOrders()
       
  // },[users.length !== 0 && orders.length !== 0])

  async function pendingHandle(order) {
    try {
      let patch = await axios.put('order/' + order.id + '/', {status: 'approved'})
      setStatus(patch.status)
      console.log(patch);
      
    } catch(err) {
      console.error(err);
    }

  }
  console.log(orders);
  const Button = ({ type,order }) => {
    return <button onClick={() => pendingHandle(order)} style={{cursor: 'pointer'}} className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            {users.map(user => {
              if(user.id === order.userId) {
                return <td style={{display: 'flex', alingItems: 'center'}}><span style={{marginLeft: '15px', fontWeight: 'bold'}}>{order.userId}</span><img style={{width:'25px',height: '25px', borderRadius: '100%',padding: '0 10px'}} src={user.img} alt="" />{user.username}</td>
            
              }
            })}
         
            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">${order.amount}</td>
        
            <td className="widgetLgStatus">
              {order.status === 'pending' ?  <Button order={order} value={order.status} type={order.status} /> : <p style={{color: 'green'}}>{order.status}</p>}
              </td>
          </tr>
         
        ))}
         {status === 200 ? <p>Succesufly approved</p> : <p></p>}
      </table>
    </div>
  );
}
