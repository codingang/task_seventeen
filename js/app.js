/**
 * Created by hongbojing on 3/23/16.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};


// 用于渲染图表的数据
var chartData = {};
var chartArray = [];
// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化

    // 设置对应数据

    // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化

    // 设置对应数据

    // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

    // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();
// first: make a change to the prototype to get the nth week of a date
Date.prototype.getWeek = function (dowOffset) {

    dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() -
            (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1,0,1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
             the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
};
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// second: get the element of the display area
//var text = '<div class="month-cell" style="width: 33%; height: 100px; background-color: #000; position: relative; display: inline-block;"></div>';
//document.getElementById('aqiChartResult').innerHTML = text;

// third: declare the variables
var dateValue = '', cityValue = '北京', cityMatchData = {};
var dayValue = '', weekValue = '', monthValue = '', yearValue = '';

// fourth: define the event function on the time element
document.getElementById('form-gra-time').addEventListener("click", getDateAndCity);
function getDateAndCity(cityValue){
    //everytime you click on this, it should be initialized
    var readyArray = [];// to store the data from the huge obj, and store as an array
    // this is what is gonna happen after you clicking on the time component
    dateValue = document.querySelector('input[name = "graTime"]:checked').value;
    cityElement = document.getElementById('city-select');
    cityValue = cityElement.options[cityElement.selectedIndex].value;
    // get the data that matches the city you select
    cityMatchData = aqiSourceData[cityValue];
    //console.log('step 1: ' + dateValue + ' ' + cityValue);
    //console.log('step 2: get the match city data from raw data');
    //console.log(cityMatchData);
    //console.log(Object.keys(cityMatchData).length);
    for(item in cityMatchData){
        // get the values of "year", "month", "day" from the property in the object
        yearValue = item.slice(0,4);
        monthValue = item.slice(5,7);
        dayValue = item.slice(8,10);
        // use the three values to generate a new date to get the number of which week it is on
        var newDateValue = new Date(yearValue,monthValue-1,dayValue);
        weekValue = newDateValue.getWeek();
        // use the data piece you get to generate a new array whose elements are objects
        readyArray.push({value:cityMatchData[item], year: yearValue, month: monthValue, day: dayValue, week: weekValue});

    }
    // get how many weeks are there in the data
    var totalWeekAmount = Math.round(readyArray.length / 7);
    // define a new array to store the data of the total number for each week
    var readyWeekArray = new Array(totalWeekAmount);//for rendering week been selected

    for(var i = 0; i <= totalWeekAmount; i++){
        var sum = 0;
        for(var j = 0; j<readyArray.length; j++){
            if(i == readyArray[j].week){
                sum += readyArray[j].value;
            }
        }
        readyWeekArray[i] = sum;
    }
    console.log(readyWeekArray);
    // use this "readyWeekArray" to render if "week" is been clicked

    var totalMonthAmount = readyArray[readyArray.length - 1].month;
    var readyMonthArray = new Array(totalMonthAmount);
    for(var x = 0; x < totalMonthAmount; x++){
        var sum2 = 0;
        for(var y = 0; y<readyArray.length; y++){
            if(x == (readyArray[y].month - 1)){
                sum2 += readyArray[y].value;
            }
        }
        readyMonthArray[x] = sum2;
    }
    console.log(readyMonthArray);

    var renderTarget = document.getElementById('aqiChartResult');
    var renderContent = '';
    switch (dateValue){
        case 'day':
            for(var a = 0; a < readyArray.length; a++) {
                renderContent+= '<div class="month-cell" style="position: relative; display: inline-block;width: ' + 100/(readyArray.length) + '%; height: '+ readyArray[a].value +'px; background-color:'+ getRandomColor() +';"></div>';
            }
            break;
        case 'week':
            for(var b = 0; b < readyWeekArray.length; b++) {
                renderContent+= '<div class="month-cell" style="position: relative; display: inline-block;width: ' + 100/(readyWeekArray.length) + '%; height: '+ readyWeekArray[b]/10 +'px; background-color:'+ getRandomColor() +';"></div>';
            }
            break;
        case 'month':
            for(var c = 0; c < readyMonthArray.length; c++) {
                renderContent+= '<div class="month-cell" style="position: relative; display: inline-block;width: ' + 100/(readyMonthArray.length) + '%; height: '+ readyMonthArray[c]/30 +'px; background-color:'+ getRandomColor() +';"></div>';
            }
            break;
    }
    renderTarget.innerHTML = renderContent;

}
