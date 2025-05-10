
const sizeValue = (d) => d["Total Dead and Missing"];


const maxRadius = 15;

const Bubbles = ({ data, projection }) => {

    const sizeScale = d3.scaleSqrt()
        .domain([0, d3.max(data, sizeValue)])
        .range([0, maxRadius]);


    return (
        <g className="bubbleMarks">
            {/*<g> is a grouping element of SVG. When drawing a scatter plot, <g> is usually used as a container to bring all the dots (scatter points) together.*/}
            {

                data.map((d, i) => {
                    const [x, y] = projection(d.coords);
                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r={sizeScale(sizeValue(d))}
                        />
                    );
                })
            }
        </g>
    );
};
