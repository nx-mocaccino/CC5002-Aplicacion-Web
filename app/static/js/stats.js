Highcharts.chart('circle-contaniner', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Total de Pedidos por Comuna'
    },
    series: [{
        name: 'Pedidos',
        data: []
    }],
    accessibility: {
        enabled: false
    }
});




fetch("get-stats-data-pedido", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
}).then ((response) => {
    if (!response.ok) {
        throwError(response.statusText);
    }
    return response.json();
}).then((data) => {
    let parseData = data.map((item) => {
        return {
            name: item.comuna,
            y: item.cantidad,
        };
    });
    // query graph
    const chart = Highcharts.charts.find((chart) => chart.renderTo.id === "circle-contaniner");

    chart.update({
        series: [
            {
                data: parseData,
            },
        ],
    });
}).catch((error) => {
    console.error("Error:", error);
}
);

Highcharts.chart('bar-container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Total de Productos por Tipo de Fruta'
    },
    
    xAxis: {
        categories: []
    },
    yAxis: {
        title: {
            text: 'Cantidad de Productos'
        }
    },
    series: [{
        name: 'Cantidad',
        data: [25, 30, 20, 15, 35].map(value => parseInt(value))
    }],
    accessibility: {
        enabled: false
    }
});


fetch("get-stats-data-producto", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
}).then((response) => {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}).then((data) => {
    let parseData = data.map((item) => {
        
        return {
            category: item.tipo,
            value: item.cantidad
        };
    });
    console.log(parseData);
    // Actualizar el gráfico
    const chart = Highcharts.charts.find((chart) => chart.renderTo.id === "bar-container");

    chart.update({
        xAxis: {
            categories: parseData.map(item => item.category)
        },
        series: [{
            data: parseData.map(item => item.value)
        }]
    });
}).catch((error) => {
    console.error("Error:", error);
});