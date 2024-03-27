import { useLoaderData } from "react-router-dom"

export default function ProductManagement() {
    const user = useLoaderData();
    console.log(user)
    return <>
    <p>Product Management</p>
    </>
}