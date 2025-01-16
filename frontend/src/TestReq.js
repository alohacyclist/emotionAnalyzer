import React, { useState } from 'react';
import axios from 'axios';

const TestReq = () => {
    axios.post('http://localhost:5001/analyze', {
        
    }).then((response) => {
        console.log(response.data);
    });
}

export default TestReq;