import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Jan', mentions: 10 },
    { name: 'Feb', mentions: 20 },
    { name: 'Mar', mentions: 30 },
    ];

    export default function Dashboard() {
    return (
        <div>
        <h1>Tableau de bord</h1>
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
            top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="mentions" stroke="#8884d8" />
        </LineChart>
        </div>
    );
}
