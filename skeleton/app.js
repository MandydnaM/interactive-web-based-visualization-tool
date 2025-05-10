

const App = () => {

    const width = 960;
    const height = 500;
    const dateHistogramSize = 0.2;

    const worldAtlas = useWorldAtlas();
    const data = useData();

    if (!data) {
        return <p>Loading data...</p>;
    }

    const projection = d3.geoNaturalEarth1()
        .scale(width / 6)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath(projection);

    const Bwidth = 960;
    const Bheight = 100;


    return (
        <>
            <Introduction d={data} />
            <svg width={width} height={height}>

                <WorldGraticule projection={projection} />
                <Countries worldAtlas={worldAtlas} path={d3.geoPath(projection)} />
                <Bubbles data={data} projection={projection} />
                <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
                    <Histogram width={Bwidth} height={Bheight} data={data} />
                </g>
            </svg>
        </>
    );

};


ReactDOM.render(<App />, document.getElementById("root"));