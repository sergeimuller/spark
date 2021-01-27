import { useEffect, useState } from "react"
import Layout from "../../components/layout"

export default function Campaigns() {
    const [data, setData] = useState([])

    const fetchData = async () => {
        const data = await fetch('/api/campaigns')
        const jsonData = await data.json()
        setData(jsonData)
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <Layout>
            <h1>Campaigns</h1>
            {
                data.map((campaignItem, index) => {
                    return (
                        <div key={index}>
                            <h2>{campaignItem.name}</h2>
                        </div>
                    )
                })
            }
        </Layout>
    )
}
