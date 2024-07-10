// src/PenaltyDetail.js

import React from 'react';
import { useParams } from 'react-router-dom';

const penaltyData = {
    penaltyIndex: 1,
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/parkjavastorage.appspot.com/o/123%E1%84%92%E1%85%A5123123.png?alt=media&token=9b3e9cec-827e-4d64-a8f8-fe4106bbd9ef',
    carNumber: '123허1234',
    penaltyCash: '120000',
    fineDate: '2024-03-01T15:00:00.000+00:00'
};

function PenaltyDetail() {
    const { id } = useParams();

    if (parseInt(id) !== penaltyData.penaltyIndex) {
        return <div>No data available</div>;
    }

    return (
        <div>
            <h1>Penalty Detail</h1>
            <p>Penalty Index: {penaltyData.penaltyIndex}</p>
            <img src={penaltyData.imageUrl} alt="Car" />
            <p>Car Number: {penaltyData.carNumber}</p>
            <p>Penalty Cash: {penaltyData.penaltyCash}</p>
            <p>Fine Date: {new Date(penaltyData.fineDate).toLocaleString()}</p>
        </div>
    );
}

export default PenaltyDetail;
