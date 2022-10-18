// 操作DOM
// cheerio模块是jquery核心功能的一个简单灵活的实现
const cheerio = require('cheerio');
// axios模块是相当于一个封装好的promiseajax获取数据
const axios = require('axios');

// 爬取拉勾网职位
axios({
        url: 'https://www.lagou.com/',
    })
    .then(res => {
        // res.data获取整个拉勾网的html结构
        // console.log(res.data);
        spider(res.data);
    })
    .catch(err => {
        console.log('err=', err);
    })
/* spider蜘蛛（一种天天在web上闲逛采集露水与小虫的贪婪生物）=> 爬虫 */
// 定义一个空数组用来存放最后爬取的数据
const dataList = [];
//封装一个爬取拉勾网职位数据的方法
function spider(html) {
    // 声明一个变量来操作htmlDOM
    const $ = cheerio.load(html);
    // jquery方法遍历获取到的class名为category-list所有标签
    $('.category-list').each((index, item) => {
        // 定义一个空对象来存放爬取的数据
        const obj = {};

        // 把获取h2标签的内容添加到对象中，属性为name
        obj.name = $(item).find('h2').text().trim();

        // 每个category-list都有很多h3，所有要遍历h3获取数据
        // 定义一个空数组存放爬取的h3数据，并且把改数组放到对象中
        obj.positions = [];
        $(item).find('h3').each((idx, it) => {

            // 把获取h3标签的内容放到数组中
            obj.positions.push($(it).text().trim())
        })

        // 把新的对象obj放到数组datalist中
        dataList.push(obj);
    })
    console.log("爬取数据完毕", dataList);
}