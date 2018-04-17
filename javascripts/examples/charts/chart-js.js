"use strict";

var line = document.getElementById("line-chart");
var bar = document.getElementById("bar-chart");
var pie = document.getElementById("pie-chart");
var polar = document.getElementById("polar-chart");
var radar = document.getElementById("radar-chart");

var options ={
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
};

//LINE CHART EXAMPLE
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var dataLine = {
    labels: ["七月", "八月", "九月", "十月", "十一月"],
    datasets: [
        {
            label: "仿真部门",
            fill: false,
            backgroundColor: "#37d177",
            borderColor: "#37d177",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "343d3e",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [8, 15, 23, 20, 15],
            spanGaps: false
        },
        {
            label: "VR部门",
            fill: false,
            backgroundColor: "#FFCE56",
            borderColor: "#FFCE56",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#FFCE56",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [0, 5, 12, 8, 15],
            spanGaps: false
        }
    ]
};
var lineChart = new Chart(line, {
    type: 'line',
    data: dataLine
});


//BAR CHART EXAMPLE
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var dataBars = {
    labels: ["安全知识手册", "公司规则要点", "行业基本技能考核", "公司业务流程", "发展方向人员定位"],
    datasets: [
        {
            label: "仿真部门",
            fill: true,
            backgroundColor: "rgba(55, 209, 119, 0.45)",
            borderColor: "rgba(55, 209, 119, 0.45)",
            data: [12, 13, 11, 6, 9]
        },
        {
            label: "VR部门",
            fill: true,
            backgroundColor: "rgba(175, 175, 175, 0.26)",
            borderColor: "rgba(175, 175, 175, 0.26)",
            data: [14, 6, 9, 13, 12],
        }
    ],
    options: {
        scales: {
            yAxes: [{
                stacked: true
            }]
        }
    }
};

var barChar = new Chart(bar, {
    type: 'bar',
    data: dataBars,
    options: options

});

//PIE  & POLAR CHART EXAMPLE
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var dataPie = {
    labels: [
        "仿真部门",
        "VR部门",
        "虚拟现实部"
    ],
    datasets: [
        {
            data: [22, 12, 30],
            backgroundColor: [
                "rgba(55, 209, 119, 0.45)",
                "#FFCE56",
                "rgba(175, 175, 175, 0.26)"
            ],
            hoverBackgroundColor: [
                "rgba(55, 209, 119, 0.6)",
                "#FFCE56",
                "rgba(175, 175, 175, 0.4)"
            ]
        }]
};
var dataPie1 = {
    labels: [
        "仿真部门",
        "VR部门",
        "虚拟现实部"
    ],
    datasets: [
        {
            data: [92, 87, 90],
            backgroundColor: [
                "rgba(55, 209, 119, 0.45)",
                "#FFCE56",
                "rgba(175, 175, 175, 0.26)"
            ],
            hoverBackgroundColor: [
                "rgba(55, 209, 119, 0.6)",
                "#FFCE56",
                "rgba(175, 175, 175, 0.4)"
            ]
        }]
};

var pieChar = new Chart(pie, {
    type: 'pie',
    data: dataPie1

});

var polarChar = new Chart(polar, {
    type: 'polarArea',
    data: dataPie

});

