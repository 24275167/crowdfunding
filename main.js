import mysql from "./crowdfunding_db.js";
import express from 'express';
const app = express();
// 配置页面
app.use(express.static('public'));
// 列表
app.get("/fundraisers", async (req, res) => {
    mysql.query('SELECT * FROM FUNDRAISER').then(data=>{
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
