
const AxisLeft = ({ yScale, innerWidth, tickOffset = 5 }) => (
    yScale.ticks().map(tickValue => (
        <g
            className="tick"
            key={tickValue}
            transform={`translate(0, ${yScale(tickValue)})`}
        >
            <line x2={innerWidth} stroke="black" />
            <text
                x={-tickOffset}
                dy="0.32em"
                style={{ textAnchor: "end" }}
            >
                {tickValue}
            </text>
        </g>
    ))
);


const AxisBottom = ({ xScale, innerHeight, tickOffset = 5 }) => (
    xScale.ticks().map(tickValue => (
        <g
            className="tick"
            key={tickValue}
            transform={`translate(${xScale(tickValue)}, 0)`}
        >
            <line y2={innerHeight} stroke="black" />
            <text
                y={innerHeight + tickOffset}
                dy="0.71em"
                style={{ textAnchor: "middle" }}
            >
                {d3.timeFormat("%Y-%m-%d")(tickValue)}
            </text>
        </g>
    ))
);


const Bars = ({ data, xScale, yScale, innerHeight }) => (
    data.map((d, i) => (
        <rect
            className="bar"
            key={i}
            x={xScale(d.x0)}
            y={yScale(d.y)}
            width={xScale(d.x1) - xScale(d.x0) - 5}
            height={innerHeight - yScale(d.y)}
            fill="#137B80"
        />
    ))
);


const yValue = d => d["Total Dead and Missing"];
const yAxisLabel = "Total Dead and Missing";
const yAxisLabelOffset = 30;

const margin = { top: 0, right: 30, bottom: 20, left: 45 };

const timeFormat = d3.timeFormat("%Y-%m-%d");

const Histogram = ({ width, height, data }) => {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xValue = d => d["Reported Date"];


    const xScale = d3.scaleTime()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();


    const xDomain = d3.extent(data, xValue);
    const [start, end] = xDomain;


    const binGenerator = d3.histogram()
        .value(xValue)
        .domain(xDomain)
        .thresholds(d3.timeMonth.range(start, end));


    const binnedData = binGenerator(data).map(array => ({
        x0: array.x0, // bin的起始值
        x1: array.x1, // bin的结束值
        y: d3.sum(array, yValue) // 对bin中数据的y值加和
    }));


    const yScale = d3.scaleLinear()
        .domain([0, d3.max(binnedData, d => d.y)])
        .range([innerHeight, 0]);




    return (

        <svg width={width} height={height}>
            <rect width={width} height={height} fill="white" />
            <g transform={`translate(${margin.left},${margin.top})`}>
                <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={10} />
                <AxisBottom xScale={xScale} innerHeight={innerHeight} tickOffset={5} />
                <Bars data={binnedData} xScale={xScale} yScale={yScale} innerHeight={innerHeight} />
                <text
                    className="axis-label"
                    transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
                    textAnchor="middle"
                >
                    Total Dead and Missing
                </text>
            </g>
        </svg>


    )
};
