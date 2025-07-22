import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ModelAccuracyGraph({ useCaseId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/accuracy/${useCaseId}`).then((res) => {
      setData(res.data);
    });
  }, [useCaseId]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Model Accuracy (Last 3 Months)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" />
          <XAxis dataKey="accuracy_date" />
          <YAxis domain={[0, 1]} />
          <Tooltip />
          <Line type="monotone" dataKey="accuracy_value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ModelAccuracyGraph;
