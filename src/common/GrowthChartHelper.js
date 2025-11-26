// GrowthChartHelper类
import dayjs from 'dayjs';
class GrowthChartHelper {
    constructor() {
        this.chart = null;
        this.chartData = null;
        this.typeId = '1';
        this.xAxisData = [];
        this.seriesData = [];
        this.xMax = 0;
        this.yAxisConfig = {
            initialYMin: 25,
            initialYMax: 75,
            finalYMin: 130,
            finalYMax: 200,
            tickInterval: 10,
            visibleTicks: 6,
            yuliang: 4
        };
        this.yMax = this.yAxisConfig.initialYMax + this.yAxisConfig.yuliang;
        this.today = dayjs();
        this.initIndex = 0;
        this.todayIndex = 0;
        this.isShowButton = false;
        this.bbBirthday = 0;
        this.activeIndex = null;
        this.isInit = true;
        this.maxIndex = 0;


    }

    async init(chart, chartData, typeId) {
        this.chart = chart;
        this.chartData = chartData;
        this.bbBirthday = window.userInfo.bbbirthday;
        this.typeId = typeId;
        this.setYConfig();
        this.setXAxisData();
        this.todayIndex = this.calculateGrowthIndex(
            dayjs(this.bbBirthday).format('YYYY-MM-DD'),
            dayjs().format('YYYY-MM-DD'),
            this.chartData.dataReference
        );
        this.setSeriesData();
        this.chartInit();
    }

    setYConfig() {
        if (this.isWeight(this.typeId)) {
            this.yAxisConfig = {
                initialYMin: 0,
                initialYMax: 20,
                finalYMin: 0,
                finalYMax: 110,
                tickInterval: 10,
                visibleTicks: 6,
                yuliang: 4
            };
            this.yMax = this.yAxisConfig.initialYMax + this.yAxisConfig.yuliang;
        }
    }

    calculateGrowthIndex(birthDate, currentDate, growthData) {
        const birth = dayjs(birthDate);
        const current = dayjs(currentDate);

        let years = current.year() - birth.year();
        let months = current.month() - birth.month();
        let days = current.date() - birth.date();

        if (days < 0) {
            months--;
            const lastMonth = current.subtract(1, 'month');
            days += lastMonth.daysInMonth();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        console.log(`年龄差: ${years}年${months}月${days}天`);

        let matchedIndex = -1;

        for (let i = 0; i < growthData.length; i++) {
            const item = growthData[i];
            if (item.year === years && item.month === months) {
                matchedIndex = i;
                break;
            }
        }

        if (matchedIndex === -1) {
            for (let i = growthData.length - 1; i >= 0; i--) {
                const item = growthData[i];
                if (item.year < years || (item.year === years && item.month <= months)) {
                    matchedIndex = i;
                    break;
                }
            }
        }

        if (matchedIndex === -1) {
            matchedIndex = 0;
        }

        const matchedItem = growthData[matchedIndex];
        console.log(`匹配到条目: ${matchedItem.lable} (year=${matchedItem.year}, month=${matchedItem.month})`);

        let remainingDays = 0;

        if (matchedItem.year === years && matchedItem.month === months) {
            remainingDays = days;
        } else {
            // let remainingMonths = months - matchedItem.month;
            // const remainingYears = years - matchedItem.year;
            // remainingMonths += remainingYears * 12;

            const startDateForMatched = birth.add(matchedItem.year, 'year').add(matchedItem.month, 'month');
            const actualDaysDiff = current.diff(startDateForMatched, 'day');
            remainingDays = actualDaysDiff;
        }

        const dayNumber = parseFloat(matchedItem.day_number);

        if (dayNumber <= 0) {
            return matchedIndex;
        }

        const finalIndex = matchedIndex + remainingDays / dayNumber;
        console.log(`基础索引: ${matchedIndex}, 剩余天数: ${remainingDays}, day_number: ${dayNumber}, 最终索引: ${finalIndex}`);

        return finalIndex > growthData.length - 2 ? growthData.length - 2 : finalIndex;
    }

    setXAxisData() {
        this.xAxisData = this.chartData.dataReference.map(item => item.lable);
        this.xMax = this.chartData.dataReference.length;
    }

    setSeriesData() {
        const this_ = this;
        function findIndexs(item) {
            const findIndex = this_.chartData.dataReference.findIndex(
                items => items.year === item.year && items.month === item.month
            );
            const findItem = this_.chartData.dataReference.find(
                items => items.year === item.year && items.month === item.month
            );
            console.log(this_.chartData.dataReference, findIndex, findItem)


            if (findIndex > -1) {
                const xIndex = findIndex + item.day / Number(findItem.day_number);
                console.log('xIndex', xIndex, item.day / Number(findItem.day_number))
                return [xIndex, this_.isWeight(this_.typeId) ? item.weight : item.height];
            }
        }

        const dateMap = new Map();
        this.chartData.list.forEach(item => {
            const dateKey = item.record_date;
            const existingItem = dateMap.get(dateKey);

            if (!existingItem) {
                dateMap.set(dateKey, item);
            } else {
                const existingTime = dayjs(`${existingItem.record_date} ${existingItem.record_time || '00:00'}`).unix();
                const currentTime = dayjs(`${item.record_date} ${item.record_time || '00:00'}`).unix();

                if (currentTime > existingTime) {
                    dateMap.set(dateKey, item);
                }
            }
        });

        const filteredList = Array.from(dateMap.values());
        this.seriesData = filteredList.map(item => findIndexs(item)).filter(Boolean);

        this.activeIndex = this.seriesData.findLastIndex(item => item[1] > 0);
        this.initIndex = this.seriesData[0] ? this.seriesData[this.seriesData.length - 1][0] : 0;
        console.log('activeIndex', this.activeIndex)
        console.log('initIndex', this.initIndex);
        console.log('todayIndex', this.todayIndex);

        if (this.initIndex !== this.todayIndex) {
            this.isShowButton = true;
            document.getElementById('todayBtn').style.display = 'block';
        } else {
            document.getElementById('todayBtn').style.display = 'none';
        }
    }

    isWeight(typeId) {
        return typeId === '2';
    }

    chartInit() {
        this.setXYAxis();
        this.setGird();
        this.setDataZoom();
        this.setSeries();
        this.setTooltip();

        setTimeout(() => {
            this.setDataZoom();
            setTimeout(() => {
                this.isInit = false;
            }, 50);
        }, 100);

        this.initMax();
        this.addClick();
        this.dispatch();
    }

    setTooltip() {
        const option = {
            tooltip: {
                trigger: 'item',
                show: true,
                position: 'top',
                extraCssText: 'box-shadow: none !important;',
                backgroundColor: window.color[0],
                textStyle: {
                    fontSize: 16,
                    fontWeight: 400,
                    textAlign: 'center',
                    color: '#fff',
                    shadowColor: 'transparent',
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0
                },
                formatter: params => {
                    return this.isWeight(this.typeId) ? `${params?.value?.[1]}kg` : `${params?.value?.[1]}cm`;
                },
                padding: 8,
                borderWidth: 0
            }
        };
        this.chart.setOption(option);
    }

    initMax() {
        const listMax = this.chartData.dataReference.length - 1;
        const scrollPercent = this.calculateScrollPercent(
            (this.getStartValue() / listMax) * 100,
            (this.getEndValue() / listMax) * 100
        );

        const yRange = this.calculateYAxisRange(scrollPercent);
        this.chart.setOption({
            yAxis: {
                min: yRange.min,
                max: yRange.max
            }
        });
    }

    calculateScrollPercent(start, end) {
        const visibleRange = end - start;
        const scrollableRange = 100 - visibleRange;

        if (scrollableRange <= 0) {
            return 0;
        }

        return (start / scrollableRange) * 100;
    }

    addClick() {
        this.chart.on('datazoom', (params) => {
            if (params.batch) {
                params = params.batch[0];
            }

            const start = params.start;
            const end = params.end;

            const scrollPercent = this.calculateScrollPercent(start, end);
            const yRange = this.calculateYAxisRange(scrollPercent);

            this.chart.setOption({
                yAxis: {
                    min: yRange.min,
                    max: yRange.max
                }
            });

            this.isShowButton = true;
            document.getElementById('todayBtn').style.display = 'block';
        });

        this.chart.on('click', params => {
            if (params.componentType === 'series') {
                console.log(`点击了系列 ${params.seriesIndex} 的数据 ${params.dataIndex}`);
                console.log(`数据名称: ${params.name}, 数据值: ${params.value}`);
                this.activeIndex = params.dataIndex;
            }
        });
    }

    setXYAxis() {
        const option = {
            animation: false,
            xAxis: {
                type: 'time',
                boundaryGap: false,
                min: 0,
                max: this.chartData.dataReference.length,
                axisLabel: {
                    fontSize: 12,
                    margin: 10,
                    color: '#020202',
                    formatter: value => {
                        return value >= 0 && value < this.xAxisData.length ? this.xAxisData[value] : '';
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(127, 127, 127, 0.3)',
                        type: 'solid'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#c9e3f2',
                        width: 1
                    }
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '10%'],
                min: this.yAxisConfig.initialYMin,
                max: this.yMax,
                interval: this.yAxisConfig.tickInterval,
                axisLabel: {
                    fontSize: 12,
                    color: '#020202',
                    show: true,
                    formatter: value => {
                        if (value === this.yMax) {
                            return '';
                        }
                        return value;
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#F0F0F0',
                        width: 1
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(127, 127, 127, 0.3)',
                        type: 'solid'
                    }
                }
            }
        };
        this.chart.setOption(option);
    }

    setSeries() {
        const seriesData = this.getSeries();

        // 今天竖线
        seriesData.push({
            data: [],
            type: 'line',
            markLine: {
                symbol: ['none', 'none'],
                data: [{ xAxis: this.todayIndex }],
                itemStyle: {
                    normal: {
                        lineStyle: { color:   window.color[0] }
                    }
                },
                label: {
                    borderType: 'dashed',
                    position: 'start',
                    backgroundColor: '#ec7268',
                    color: '#fff',
                    fontSize: 12,
                    offset: [20, -20],
                    padding: 3,
                    formatter: () => {
                        return '今天';
                    }
                },
                selectedMode: false,
                silent: true,
                emphasis: {
                    disabled: true
                }
            }
        });

        // 实际数据
        seriesData.push({
            data: this.seriesData,
            type: 'line',
            lineStyle: {
                color:   window.color[0],
                width: 3
            },
            showSymbol: true,
            symbol: 'circle',
            symbolSize: 8,
            showAllSymbol: true,
            connectNulls: true,
            itemStyle: {
                color:   window.color[0]
            },
            select: {
                itemStyle: {
                    color:   window.color[0],
                    borderColor: '#ffe8f0',
                    borderWidth: 1
                }
            },
            emphasis: {
                scale: true
            },
            selectedMode: 'single'
        });

        const option = {
            series: seriesData
        };
        this.chart.setOption(option);
    }

    getSeries() {
        const this_ = this;
        function getWeight(i) {
            return this_.chartData.dataReference
                .filter(item => item.weight && item.weight.length > 0)
                .map((item, idx) => [
                    idx,
                    i > 0 ? parseFloat(item.weight[i]) - parseFloat(item.weight[i - 1]) : parseFloat(item.weight[i])
                ]);
        }

        function getHeight(i) {
            return this_.chartData.dataReference
                .filter(item => item.height && item.height.length > 0)
                .map((item, idx) => [
                    idx,
                    i > 0 ? parseFloat(item.height[i]) - parseFloat(item.height[i - 1]) : parseFloat(item.height[i])
                ]);
        }

        const seriesData = [];
        const colors = [
            'transparent',
            'rgba(255,199,241,0.4)',
            'rgba(147,235,255,0.4)',
            'rgba(255,238,40,0.4)',
            'rgba(154,254,154,0.4)'
        ];
        const textColors = ['#fcbad9', '#fcbad9', '#bbabec', '#f3c082', '#abe99b'];

        for (let i = 0; i < 5; i++) {
            const data = this.isWeight(this.typeId) ? getWeight(i) : getHeight(i);

            seriesData.push({
                type: 'line',
                stack: 'total',
                data: data,
                areaStyle: {
                    color: colors[i]
                },
                showAllSymbol: true,
                connectNulls: true,
                lineStyle: {
                    width: 0
                },
                symbol: 'none',
                endLabel: {
                    show: true,
                    distance: 0,
                    offset: [-40, 0],
                    color: textColors[i],
                    fontSize: 12,
                    formatter: () => {
                        const p = ['3%', '15%', '50%', '85%', '97%'];
                        return p[i];
                    }
                }
            });
        }
        return seriesData;
    }

    calculateYAxisRange(zoomPercent) {
        const computerMinY = this.yAxisConfig.initialYMin +
            (this.yAxisConfig.finalYMin - this.yAxisConfig.initialYMin) * (zoomPercent / 100)
        const computerMaxY = this.yAxisConfig.initialYMax +
            (this.yAxisConfig.finalYMax - this.yAxisConfig.initialYMax) * (zoomPercent / 100)
        const min = computerMinY < this.yAxisConfig.initialYMin ? this.yAxisConfig.initialYMin : computerMinY;
        const max = computerMaxY < this.yAxisConfig.initialYMax ? this.yAxisConfig.initialYMax : computerMaxY;

        return {
            min: Math.round(min),
            max: Math.round(max)
        };
    }

    setDataZoom() {
        const option = {
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    filterMode: 'none',
                    show: false,
                    startValue: this.getStartValue(),
                    endValue: this.getEndValue(),
                    realtime: false,
                    zoomOnMouseWheel: false, // 禁止滚轮缩放
                    moveOnMouseWheel: false,
                    preventDefaultMouseMove: false,
                    inertia: 1
                }
            ]
        };
        this.chart.setOption(option);
    }

    getStartValue() {
        const index = this.isInit ? this.initIndex : this.todayIndex;
        return index - 2.5 > this.chartData.dataReference.length - 6
            ? this.chartData.dataReference.length - 6
            : index - 2.5;
    }

    getEndValue() {
        const index = this.isInit ? this.initIndex : this.todayIndex;
        this.maxIndex = index;
        console.log('getEndValue', this.maxIndex + 2.5 > this.chartData.dataReference.length - 1
            ? this.chartData.dataReference.length - 1
            : this.maxIndex + 2.5)
        return this.maxIndex + 2.5 > this.chartData.dataReference.length - 1
            ? this.chartData.dataReference.length - 1
            : this.maxIndex + 2.5;
    }

    setGird() {
        const option = {
            grid: {
                top: 50,
                left: 40,
                right: 40,
                bottom: 50
            }
        };
        this.chart.setOption(option);
    }

    chartGoToDay() {
        this.setDataZoom();
        this.initMax();

        if (this.maxIndex > this.initIndex) {
            this.isShowButton = false;
            document.getElementById('todayBtn').style.display = 'none';
        }
    }

    dispatch() {
        if (this.activeIndex !== null) {
            setTimeout(() => {
                this.chart.dispatchAction({
                    type: 'select',
                    seriesIndex: 6,
                    dataIndex: this.activeIndex
                });
                this.chart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 6,
                    dataIndex: this.activeIndex
                });
            }, 50);
        }
    }
}

export default GrowthChartHelper

// 格式化年龄显示
 export function formatAge(age) {
    let result = "";
    if (age.years > 0) {
        result += age.years + "岁";
    }
    if (age.months > 0) {
        result += age.months + "个月";
    }
    if (age.days > 0 || result === "") {
        result += age.days + "天";
    }
    return result;
}

// 处理数据，计算year, month, day
export function processUserData(userData, isList) {
    return userData.map(item => {
        const age = isList ? calculateAge1(window.userInfo.bbbirthday, item.record_date) : calculateAge(window.userInfo.bbbirthday, item.record_date);
        return {
            year: age.years,
            month: age.months,
            day: age.days,
            ...item
        };
    });
}

// 图表用
export function calculateAge(birthDate, recordDate) {
    const birth = dayjs(birthDate);
    const record = dayjs(recordDate);

    let years = record.year() - birth.year();
    let months = record.month() - birth.month();
    let days = record.date() - birth.date();

    // 处理天数负数情况
    if (days < 0) {
        months--;
        // 获取上一个月的天数
        const lastMonth = record.subtract(1, 'month');
        days += lastMonth.daysInMonth();
    }

    // 处理月份负数情况
    if (months < 0) {
        years--;
        months += 12;
    }

    // 根据年龄段调整计算方式
    if (years >= 6) {
        // 大于等于6岁，将月份转换为天数叠加到天数上，月份设为0
        days = months * 30 + days; // 简单按30天一个月计算
        months = 0;
    } else if (years >= 1 && years < 6) {
        // 1岁到6岁之间，只有month等于6的时候才保留month，否则将月份转换为天数
        if (months !== 6) {
            // 将月份转换为天数
            days = months * 30 + days;
            months = 0;
        }
    }
    console.log({ years, months, days })
    return { years, months, days };
}
// 列表用
export function calculateAge1(birthDate, recordDate) {
    const birth = dayjs(birthDate);
    const record = dayjs(recordDate);

    let years = record.year() - birth.year();
    let months = record.month() - birth.month();
    let days = record.date() - birth.date();

    // 如果天数小于0，需要从月份借位
    if (days < 0) {
        months--;
        // 获取上一个月的天数
        const lastDayOfPrevMonth = record.subtract(1, 'month').daysInMonth();
        days += lastDayOfPrevMonth;
    }

    // 如果月份小于0，需要从年份借位
    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}