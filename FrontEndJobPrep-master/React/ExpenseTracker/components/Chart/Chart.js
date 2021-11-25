import ChartBar from "./ChartBar";
import "./Chart.css";

const Chart = (props) => {
  // expenseChart props.dataPoints
  //map transform from object to numbers 
  //  expenseChart.js dataPoints object
  const dataPointsValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  //max 
  const totalMaximum = Math.max(...dataPointsValues);

  return (
    <div className={"chart"}>
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
