import mysql from "./crowdfunding_db.js";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
// 使用 import.meta.url 获取当前文件的路径，并解析成 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 配置页面
app.use(express.static(path.join(__dirname, '../client')));
// 列表
app.get("/fundraisers", async (req, res) => {
    mysql.query('SELECT * FROM FUNDRAISER').then(data=>{
        res.status(200).send(data[0])
    }).catch(()=>res.status(500))
});
// 分类
app.get("/categories", async (req, res) => {
    mysql.query("SELECT * FROM CATEGORY").then(data=>{
        res.status(200).send(data[0])
    }).catch(()=>res.status(500))
});
// 搜索
app.get("/search", async (req, res) => {
    const { organizer, city, category } = req.query;
    let sql = ''
    if (organizer) {
        sql += sql ? 'AND' : 'WHERE' + ` ORGANIZER = '${organizer}'`
    }
    if (city) {
        sql += sql ? 'AND' : 'WHERE' + ` CITY = '${city}'`
    }
    if (category) {
        sql += sql ? 'AND' : 'WHERE' + ` CATEGORY_ID = ${category}`
    }
    mysql.query(`SELECT * FROM FUNDRAISER ` + sql).then(data=>{
        res.status(200).send(data[0])
    }).catch(()=>res.status(500))
});
// 获取详情
app.get("/fundraiser/:id", async (req, res) => {
    mysql.query(`SELECT * FROM FUNDRAISER WHERE FUNDRAISER_ID = ${req.params.id}`).then(data=>{
        res.status(200).send(data[0])
    }).catch(()=>res.status(500))
});
// 启动
app.listen(3000, () => {
    console.log(`http://localhost:3000/index.html`);
});
