import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ErrorBanner from "../../components/ErrorBanner";
import Products from "./Products";
import Options from "./Options";
import OrderContext from "../../contexts/OrderContext";

const Type = ({ orderType }) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const [orderDatas, updateItemCount] = useContext(OrderContext);

    useEffect(() => {
        loadItems(orderType)
    }, [orderType])

    const loadItems = async (orderType) => {
        try {
            const r = await axios.get(`http://localhost:5000/${orderType}`)
            setItems(r.data);
        } catch(e) {
            setError(true)
        }
    }

    if (error) {
        return <ErrorBanner message="에러가 발생했습니다." />
    }

    const ItemComponents = orderType === "products" ? Products : Options;
    const optionItems = items.map((item) => (
        <ItemComponents
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, orderType)}
        />
    ))

    let typeName = orderType === "products" ? "상품" : "옵션"
    return (
        <>
        <h2>주문 종류</h2>
        <p>하나의 가격</p>
        <p>${typeName} 총 가격:{orderDatas.totals[orderType]}</p>
        <div style={{ display: "flex", flexDirection: orderType === "options" && "column"}}>
            {optionItems}
        </div>
        </>
        
    )
}

export default Type;