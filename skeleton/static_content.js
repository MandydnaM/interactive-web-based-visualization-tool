const Introduction = ({ d }) => {

    console.log("d==>", d)

    const introText = "Below is a visualization of the missing migrants dataset by the 'Missing Migrants Project. The original data has " + d.length
        + " and " + Object.keys(d[0]).length + " columns! The data is visualized and can be explored using two connected views, " +
        "The rest view shows a world map which contains bubbles placed at the location of the incident. The bubbles are scaled by the number of migrants that went missing. The second view contains a bar chart which shows the number of missing migrants for each month. The bar char allows the user to select time spans which should be" +
        "shown on the map, This enables an interactive exploration of the, data. By default all incidents are shown.";

    return (
        <>
            <div className="introTitle">Description</div>
            <br />
            <div className="introTitle"></div>
            <div className="intro">{introText}</div>
        </>
    )
};



const WorldGraticule = ({ projection }) => {

    const path = d3.geoPath(projection);
    const graticule = d3.geoGraticule();

    return (
        <g className="worldGraticule">
            <path d={path({ type: "Sphere" })} fill="#fbfbfb" />
            <path d={path(graticule())} fill="none" stroke="#ececec" />
        </g>
    )
};


const Countries = ({ worldAtlas, path }) => {
    if (!worldAtlas || !worldAtlas.land || !worldAtlas.interiors) {
        return null;
    }

    return (
        <g className="countries">
            {worldAtlas.land.features.map((feature, i) => (
                <path key={i} d={path(feature)} className="land" />
            ))}

            <path d={path(worldAtlas.interiors)} className="interiors" />
        </g>
    );
};
