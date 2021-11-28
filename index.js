import words from "./google-books-common-words.json" assert {type: 'json'};
import * as echarts from 'https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.esm.min.js';

const textarea1 = document.getElementById('textarea1');
textarea1.addEventListener('input', onInput);

const textarea2 = document.getElementById('textarea2');
textarea2.addEventListener('input', onInput);

const chartDom = document.getElementById('chart');
const chart = echarts.init(chartDom);

onInput();

function onInput() {
    const data1 = process(textarea1);
    const data2 = process(textarea2);
    render([data1, data2]);
}

function process(textarea) {
    const input = textarea.value;
    const ws = input.split(/[\W\s+]/);
    const m = {};
    ws.forEach(w => {
        const _w = w.trim().toUpperCase();
        let f = m[_w] || 0;
        f++;
        m[_w] = f;
    });
    
    const data = [];
    for(const w in m) {
        const f = words[w];
        if (f) {
            data.push([f, m[w], w]);
        }
    }
    return data;
}

function render(data) {
    const option = {
        xAxis: {},
        yAxis: {},
        grid: {
            left: 60,
            right: 60,
            top: 30,
            bottom: 30
        },
        series: data.map(d => (
            {
              symbolSize: 6,
              data: d,
              type: 'scatter',
              emphasis: {
                  focus: 'series',
                  label: {
                      show: true,
                      formatter: function(param) {
                          return param.data[2].toLowerCase();
                      },
                      position: 'top'
                  }
              }
            }
        )),
      };

    chart.setOption(option);
}