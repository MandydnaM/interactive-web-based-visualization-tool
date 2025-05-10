
const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';


const useWorldAtlas = () => {

    const [data, setData] = React.useState(null);


    React.useEffect(() => {

        d3.json(jsonUrl).then(topology => {

            const { countries, land } = topology.objects;

            setData({

                land: topojson.feature(topology, land),
                interiors: topojson.mesh(topology, countries, (a, b) => a !== b)
            });
        });
    }, []);
    return data;
};

// the URL where the missing migrants data is downloaded from
const csvUrl = 'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';


const row = d => {
    d.coords = d['Location Coordinates'].split(',').map(Number).reverse();
    d['Total Dead and Missing'] = Number(d['Total Dead and Missing']);
    d['Reported Date'] = new Date(d['Reported Date']);
    return d;
};


const useData = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        d3.csv(csvUrl, row).then(setData);
    }, []);

    return data;
}; 
