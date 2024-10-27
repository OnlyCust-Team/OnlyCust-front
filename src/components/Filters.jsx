import { useEffect, useState } from 'react';

function Filters() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const getReviews = async () => {
        const res = await fetch(`http://localhost:3001/review`);
        const data = await res.json();
        setReviews(data)
    }
    useEffect(() => {
        if (!isLoading) {
            getReviews();
        }
    }, [isLoading]);
    return (
        <div className="drawer lg:drawer-open">
            <div className="drawer-content flex flex-col justify-center">
                <h3 className="text-5l font-bold">Filters</h3>
                <ul className="menu bg-base-200 text-base-content min-h-full p-4">
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>

        </div>
    )
}

export default Filters;