import React, { useState, useEffect } from 'react';

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/test');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="App">
            <h1>Data from API</h1>
            {data ? (
                <div>
                    <p>ID: {data.id}</p>
                    <p>Name: {data.name}</p>
                    <p>Email: {data.email}</p>
                </div>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}

export default App;
