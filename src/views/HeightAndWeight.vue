
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
                        <th class="weight-col">体重 (kg)</th>
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

            // 按记录日期排序（从新到旧）
            processedList.sort((a, b) => {
                return new Date(b.record_date) - new Date(a.record_date);
            });

            if (processedList.length === 0) {
                listBody.innerHTML = '<tr><td colspan="4" class="no-data">暂无记录数据</td></tr>';
                return;
            }

            let html = '';
            processedList.forEach(item => {
                const age = formatAge({ years: item.year, months: item.month, days: item.day });
                const height = item.height && item.height !== '' ? item.height : '--';
                const weight = item.weight && item.weight !== '' ? item.weight : '--';

                html += `
                    <tr>
                        <td>${item.record_date}</td>
                        <td>${age}</td>
                        <td>${height}</td>
                        <td>${weight}</td>
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
            max-width: 1000px;
            margin: 0 auto;
            padding: 0;
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
        .record-list {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            margin-bottom: 20px;
        }

        .record-list h3 {
            margin-bottom: 15px;
            color: #333;
            text-align: center;
        }

        .record-table {
            width: 100%;
            border-collapse: collapse;
        }

        .record-table th {
            background-color: #f8f8f8;
            padding: 12px 15px;
            text-align: left;
            font-weight: 600;
            border-bottom: 2px solid #eee;
        }

        .record-table td {
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
        }

        .record-table tbody tr:hover {
            background-color: #f9f9f9;
        }

        .record-table .date-col {
            width: 20%;
        }

        .record-table .age-col {
            width: 30%;
        }

        .record-table .height-col,
        .record-table .weight-col {
            width: 25%;
            text-align: right;
        }

        .no-data {
            text-align: center;
            padding: 20px;
            color: #999;
            font-style: italic;
        }
    </style>