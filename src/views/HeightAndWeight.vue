
<template>
   <div class="container">
        <div class="header">
            <h1>宝宝成长曲线</h1>
            <p>跟踪宝宝身高、体重发育情况</p>
        </div>

        <!-- 用户选择器 -->
        <div class="user-selector">
            <button
                class="user-btn active"
                data-user="chuichui"
            >锤锤</button>
            <button
                class="user-btn"
                data-user="yaya"
            >丫丫</button>
            <button
                class="user-btn"
                data-user="linlin"
            >琳琳</button>
        </div>

        <div class="type-selector">
            <button
                class="type-btn active"
                data-type="1"
            >身高曲线</button>
            <button
                class="type-btn"
                data-type="2"
            >体重曲线</button>
        </div>

        <div class="chart-container">
            <button
                class="today-btn"
                id="todayBtn"
            >回到今天</button>
            <div
                class="chart"
                id="chart"
            ></div>
        </div>

        <div class="controls">
            <button
                class="btn"
                id="reloadBtn"
            >重新加载</button>
        </div>

        <!-- 记录列表 -->
        <div class="record-list">
            <h3>成长记录列表</h3>
            <table class="record-table">
                <thead>
                    <tr>
                        <th class="date-col">记录日期</th>
                        <th class="age-col">年龄</th>
                        <th class="height-col">身高 (cm)</th>
                        <th class="height-rate-col">增长速率(cm/月)</th>
                        <th class="standard-rate-col">标准P50速率 (cm/月)</th>
                        <th class="weight-col">体重 (kg)</th>
                        <th class="weight-rate-col">体重增长 (kg/月)</th>
                    </tr>
                </thead>
                <tbody id="record-list-body">
                    <!-- 记录将通过JS动态生成 -->
                </tbody>
            </table>
        </div>

        <div class="info-panel">
            <h3>使用说明</h3>
            <p>• 图表显示宝宝的身高/体重发育曲线，参考线表示标准范围</p>
            <p>• 可以通过鼠标滚轮或拖动图表区域进行缩放</p>
            <p>• 点击数据点可以查看详细数值</p>
            <p>• 点击"回到今天"按钮可快速定位到当前日期</p>
            <p>• 记录列表显示每次测量的增长速率，并与标准P50速率进行比较</p>
            <p>• <span style="color:#4CAF50; font-weight:600">绿色</span>表示比标准快，<span style="color:#f44336; font-weight:600">红色</span>表示比标准慢</p>
        </div>
    </div>

</template>

<script>
import GrowthChartHelper, { processUserData, formatAge } from '../common/GrowthChartHelper'
import dayjs from 'dayjs';
import { dataReference } from '../common/Data'
import { usersData } from '../common/UserData'
import * as echarts from 'echarts';


export default {
    name: "HeightAndWeight",
    methods: {
    },

    mounted() {


        // 当前用户信息
        let currentUser = 'chuichui';
        window.userInfo = {
            bbbirthday: dayjs(usersData[currentUser].birthday).valueOf()
        };
     // 计算标准P50身高速率
        function calculateStandardHeightRate(ageYears, ageMonths) {
            // 找到对应的年龄段
            for (let i = 0; i < dataReference.length - 1; i++) {
                const current = dataReference[i];
                const next = dataReference[i + 1];

                // 检查是否在当前年龄段内
                if ((ageYears > current.year || (ageYears === current.year && ageMonths >= current.month)) &&
                    (ageYears < next.year || (ageYears === next.year && ageMonths < next.month))) {

                    // 计算时间跨度（月）
                    const timeSpanMonths = parseFloat(current.day_number) / 30.44;

                    if (timeSpanMonths > 0) {
                        // 计算身高增长量
                        const currentHeight = parseFloat(current.height[2]); // P50身高
                        const nextHeight = parseFloat(next.height[2]); // 下一个年龄段的P50身高
                        const heightDiff = nextHeight - currentHeight;

                        // 计算月均增长率
                        return heightDiff / timeSpanMonths;
                    }
                    break;
                }
            }
            return null;
        }

        // 计算增长速率（优化版本，处理不连续数据）
        function calculateGrowthRates(processedList) {
            // 按日期从早到晚排序
            const sortedList = [...processedList].sort((a, b) =>
                new Date(a.record_date) - new Date(b.record_date)
            );

            // 为每条记录计算速率
            for (let i = 0; i < sortedList.length; i++) {
                const current = sortedList[i];

                // 初始化速率数据
                current.heightRate = null;
                current.weightRate = null;
                current.heightTimeDiff = null;
                current.weightTimeDiff = null;
                current.standardHeightRate = null;

                // 计算标准P50身高速率
                current.standardHeightRate = calculateStandardHeightRate(current.year, current.month);

                // 查找最近的有效身高记录
                let prevHeightIndex = i - 1;
                while (prevHeightIndex >= 0) {
                    const prevRecord = sortedList[prevHeightIndex];
                    if (prevRecord.height && prevRecord.height !== '') {
                        const currentDate = dayjs(current.record_date);
                        const prevDate = dayjs(prevRecord.record_date);

                        // 计算时间差（月）
                        const timeDiffDays = currentDate.diff(prevDate, 'day');
                        const timeDiffMonths = timeDiffDays / 30.44; // 平均每月天数

                        if (timeDiffMonths > 0) {
                            const heightDiff = parseFloat(current.height) - parseFloat(prevRecord.height);
                            current.heightRate = heightDiff / timeDiffMonths;
                            current.heightTimeDiff = timeDiffMonths;
                        }
                        break;
                    }
                    prevHeightIndex--;
                }

                // 查找最近的有效体重记录
                let prevWeightIndex = i - 1;
                while (prevWeightIndex >= 0) {
                    const prevRecord = sortedList[prevWeightIndex];
                    if (prevRecord.weight && prevRecord.weight !== '') {
                        const currentDate = dayjs(current.record_date);
                        const prevDate = dayjs(prevRecord.record_date);

                        // 计算时间差（月）
                        const timeDiffDays = currentDate.diff(prevDate, 'day');
                        const timeDiffMonths = timeDiffDays / 30.44; // 平均每月天数

                        if (timeDiffMonths > 0) {
                            const weightDiff = parseFloat(current.weight) - parseFloat(prevRecord.weight);
                            current.weightRate = weightDiff / timeDiffMonths;
                            current.weightTimeDiff = timeDiffMonths;
                        }
                        break;
                    }
                    prevWeightIndex--;
                }
            }

            return sortedList;
        }

        // 格式化速率显示
        function formatRate(rate, timeDiff) {
            if (rate === null || rate === undefined || isNaN(rate)) {
                return '--';
            }
            // 保留两位小数，正数前加+号
            const formatted = rate >= 0 ? `+${rate.toFixed(2)}` : rate.toFixed(2);

            if (timeDiff && timeDiff > 0) {
                const months = Math.floor(timeDiff);
                const days = Math.round((timeDiff - months) * 30.44);
                let timeText = '';
                if (months > 0) {
                    timeText += `${months}月`;
                }
                if (days > 0) {
                    timeText += `${days}天`;
                }
                if (timeText) {
                    return `${formatted}<span class="time-diff">${timeText}期间</span>`;
                }
            }
            return formatted;
        }

        // 获取速率显示样式类名
        function getRateClass(rate) {
            if (rate === null || rate === undefined || isNaN(rate)) {
                return 'rate-neutral';
            }
            return rate > 0 ? 'rate-positive' : rate < 0 ? 'rate-negative' : 'rate-neutral';
        }

        // 获取比较结果的样式类名
        function getComparisonClass(actualRate, standardRate) {
            if (actualRate === null || standardRate === null || isNaN(actualRate) || isNaN(standardRate)) {
                return 'rate-neutral';
            }

            const diff = actualRate - standardRate;
            if (diff > 0.1) return 'rate-better';    // 比标准快0.1以上
            if (diff < -0.1) return 'rate-worse';     // 比标准慢0.1以上
            return 'rate-same';                      // 与标准相近
        }

        // 格式化比较结果
        function formatComparison(actualRate, standardRate) {
            if (actualRate === null || standardRate === null || isNaN(actualRate) || isNaN(standardRate)) {
                return '<span class="comparison-indicator">--</span>';
            }

            const diff = actualRate - standardRate;
            let indicator = '';
            if (diff > 0.1) {
                indicator = `↑ 比标准快${Math.abs(diff).toFixed(2)}`;
            } else if (diff < -0.1) {
                indicator = `↓ 比标准慢${Math.abs(diff).toFixed(2)}`;
            } else {
                indicator = `≈ 与标准相近`;
            }

            return `<span class="comparison-indicator">${indicator}</span>`;
        }


        // 颜色配置
        window.color = ['#fc8ac6'];


        // 初始化图表
        let chartHelper = new GrowthChartHelper();
        let chartInstance = null;
     // 获取当前用户的图表数据
        function getCurrentChartData() {
            const processedList = processUserData(usersData[currentUser].data);
            console.log(processedList)
            return {
                dataReference: dataReference,
                list: processedList
            };
        }
        // 更新记录列表
        function updateRecordList() {
            const listBody = document.getElementById('record-list-body');
            const userData = usersData[currentUser];
            const processedList = processUserData(userData.data,true);

            // 计算增长速率
            const listWithRates = calculateGrowthRates(processedList);

            // 按记录日期排序（从新到旧）
            listWithRates.sort((a, b) => {
                return new Date(b.record_date) - new Date(a.record_date);
            });

            if (listWithRates.length === 0) {
                listBody.innerHTML = '<tr><td colspan="7" class="no-data">暂无记录数据</td></tr>';
                return;
            }

            let html = '';
            listWithRates.forEach((item) => {
                const age = formatAge({ years: item.year, months: item.month, days: item.day });
                const height = item.height && item.height !== '' ? item.height : '--';
                const weight = item.weight && item.weight !== '' ? item.weight : '--';

                // 格式化速率
                const heightRate = formatRate(item.heightRate, item.heightTimeDiff);
                const weightRate = formatRate(item.weightRate, item.weightTimeDiff);
                const standardRate = item.standardHeightRate !== null ? item.standardHeightRate.toFixed(2) + ' cm/月' : '--';

                // 获取速率样式类
                const heightRateClass = getRateClass(item.heightRate);
                const weightRateClass = getRateClass(item.weightRate);
                const comparisonClass = getComparisonClass(item.heightRate, item.standardHeightRate);
                const comparisonText = formatComparison(item.heightRate, item.standardHeightRate);

                html += `
                    <tr>
                        <td>${item.record_date}</td>
                        <td>${age}</td>
                        <td>${height}</td>
                        <td class="${heightRateClass}">${heightRate}</td>
                        <td class="${comparisonClass}">
                            ${standardRate}
                            ${comparisonText}
                        </td>
                        <td>${weight}</td>
                        <td class="${weightRateClass}">${weightRate}</td>
                    </tr>
                `;
            });

            listBody.innerHTML = html;
        }

        function initChart(typeId = '1') {
            const chartDom = document.getElementById('chart');
            if (chartInstance) {
                chartInstance.dispose();
            }
            chartInstance = echarts.init(chartDom);

            const currentChartData = getCurrentChartData();
            chartHelper.init(chartInstance, currentChartData, typeId);

            // 更新记录列表
            updateRecordList();

            window.addEventListener('resize', function () {
                chartInstance.resize();
            });
        }



        function init() {
            // 初始化图表
            initChart();

            // 用户切换按钮
            document.querySelectorAll('.user-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    document.querySelectorAll('.user-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');

                    currentUser = this.getAttribute('data-user');
                    window.userInfo.bbbirthday = dayjs(usersData[currentUser].birthday).valueOf();

                    // 更新标题显示当前用户
                    document.querySelector('.header h1').textContent = `${usersData[currentUser].name}的成长曲线`;

                    chartHelper = new GrowthChartHelper();
                    initChart(chartHelper.typeId);
                });
            });

            // 类型切换按钮
            document.querySelectorAll('.type-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');

                    const typeId = this.getAttribute('data-type');
                    chartHelper = new GrowthChartHelper();
                    initChart(typeId);
                });
            });

            // 重新加载按钮
            document.getElementById('reloadBtn').addEventListener('click', function () {
                chartHelper = new GrowthChartHelper();
                initChart(chartHelper.typeId);
            });

            // 回到今天按钮
            document.getElementById('todayBtn').addEventListener('click', function () {
                chartHelper.chartGoToDay();
            });
        }
        init()



    }
}
</script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #f5f5f5;
            color: #333;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .user-selector {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
        }

        .user-btn {
            padding: 8px 20px;
            background-color: #e0e0e0;
            color: #666;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        }

        .user-btn.active {
            background-color: #4CAF50;
            color: white;
        }

        .chart-container {
            position: relative;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            overflow: hidden;
            margin-bottom: 20px;
        }

        .chart {
            width: 100%;
            height: 500px;
        }

        .controls {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
        }

        .btn {
            padding: 8px 16px;
            background-color: #fc8ac6;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.2s;
        }

        .btn:hover {
            background-color: #f76cb0;
        }

        .btn:active {
            transform: translateY(1px);
        }

        .info-panel {
            background: white;
            border-radius: 12px;
            padding: 15px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            margin-bottom: 20px;
        }

        .info-panel h3 {
            margin-bottom: 10px;
            color: #333;
        }

        .info-panel p {
            margin-bottom: 8px;
            font-size: 14px;
            line-height: 1.5;
        }

        .type-selector {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
        }

        .type-btn {
            padding: 8px 20px;
            background-color: #f0f0f0;
            color: #666;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        }

        .type-btn.active {
            background-color: #fc8ac6;
            color: white;
        }

        .today-btn {
            position: absolute;
            right: 20px;
            top: 20px;
            z-index: 10;
            padding: 6px 12px;
            background-color: #ec7268;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            display: none;
        }

        /* 记录列表样式 */

    /* 记录列表样式 */
    .record-list {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;
        overflow-x: auto; /* 添加水平滚动 */
    }

    .record-list h3 {
        margin-bottom: 15px;
        color: #333;
        text-align: center;
    }

    .record-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        min-width: 800px; /* 设置最小宽度，确保表格不会被压缩 */
        white-space: nowrap; /* 防止内容换行 */
    }

    .record-table th {
        background-color: #f8f8f8;
        padding: 12px 8px;
        text-align: left;
        font-weight: 600;
        border-bottom: 2px solid #eee;
        white-space: nowrap; /* 表头不换行 */
    }

    .record-table td {
        padding: 12px 8px;
        border-bottom: 1px solid #eee;
        white-space: nowrap; /* 单元格内容不换行 */
    }

    .record-table tbody tr:hover {
        background-color: #f9f9f9;
    }

    /* 调整列宽，确保所有列都能正常显示 */
    .record-table .date-col {
        min-width: 100px;
    }

    .record-table .age-col {
        min-width: 80px;
    }

    .record-table .height-col,
    .record-table .weight-col {
        min-width: 80px;
        text-align: right;
    }

    .record-table .height-rate-col,
    .record-table .weight-rate-col,
    .record-table .standard-rate-col {
        min-width: 120px;
        text-align: right;
    }

    /* 确保时间差和比较指示器不换行 */
    .time-diff,
    .comparison-indicator {
        white-space: nowrap;
        display: inline-block;
    }

    .rate-positive {
        color: #4CAF50;
        font-weight: 500;
    }

    .rate-negative {
        color: #f44336;
        font-weight: 500;
    }

    .rate-neutral {
        color: #666;
    }

    .rate-better {
        color: #4CAF50;
        font-weight: 600;
    }

    .rate-worse {
        color: #f44336;
        font-weight: 600;
    }

    .rate-same {
        color: #666;
        font-weight: 500;
    }

    .no-data {
        text-align: center;
        padding: 20px;
        color: #999;
        font-style: italic;
    }

    /* 添加滚动条样式 */
    .record-list::-webkit-scrollbar {
        height: 8px;
    }

    .record-list::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    .record-list::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
    }

    .record-list::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
    }
        .record-table .standard-rate-col {
            width: 15%;
            text-align: right;
        }

        .rate-positive {
            color: #4CAF50;
            font-weight: 500;
        }

        .rate-negative {
            color: #f44336;
            font-weight: 500;
        }

        .rate-neutral {
            color: #666;
        }

        .rate-better {
            color: #4CAF50;
            font-weight: 600;
        }

        .rate-worse {
            color: #f44336;
            font-weight: 600;
        }

        .rate-same {
            color: #666;
            font-weight: 500;
        }

        .no-data {
            text-align: center;
            padding: 20px;
            color: #999;
            font-style: italic;
        }

        .time-diff {
            font-size: 12px;
            color: #999;
            display: block;
            margin-top: 2px;
        }

        .comparison-indicator {
            font-size: 12px;
            display: block;
            margin-top: 2px;
            font-weight: 500;
        }
    </style>