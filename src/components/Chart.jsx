import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Chart = ({ data }) => {
  const selectData = data.reduce((acc, item) => {
    if (!acc[item.category])
      acc[item.category] = { category: item.category, total: 0, count: 0 };
    else {
      acc[item.category].total += item.price;
      acc[item.category].count += 1;
    }
    return acc;
  }, {});
//   const d = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];
  const datapoints = Object.values(selectData).map((item) => ({
    category: item.category,
    average: (item.total / item.count).toFixed(2),
  }));

  console.log(datapoints);
  return (
    <div>
      <LineChart
        width={600}
        height={300}
        data={datapoints}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
         <Line type="monotone" dataKey="average" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="category" />
        <YAxis domain={[0, 400]} />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default Chart;
