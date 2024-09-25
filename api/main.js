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

// 数据处理
async function dataHandler(FUNDRAISER) {
    if (FUNDRAISER.length) {
        const [CATEGORY] = await mysql.query('SELECT * FROM CATEGORY');
        return FUNDRAISER.map(item => {
            const category = CATEGORY.find(c => c.CATEGORY_ID === item.CATEGORY_ID);
            item['CATEGORY_NAME'] = category ? category.NAME : null;  // 提取并赋值类别名称
            return item;
        });
    }
    return FUNDRAISER;
}


// 列表
app.get("/fundraisers", async (req, res) => {
    try {
        const [data] = await mysql.query('SELECT * FROM FUNDRAISER');
        const processedData = await dataHandler(data);
        res.status(200).send(processedData);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// 分类
app.get("/categories", async (req, res) => {
    try {
        const [data] = await mysql.query("SELECT * FROM CATEGORY");
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
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
    try {
        const [data] = await mysql.query(`SELECT * FROM FUNDRAISER` + sql);
        const processedData = await dataHandler(data);
        res.status(200).send(processedData);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// 获取详情
app.get("/fundraiser/:id", async (req, res) => {
    try {
        const [data] = await mysql.query(`SELECT * FROM FUNDRAISER WHERE FUNDRAISER_ID = ?`, [req.params.id]);
        const processedData = await dataHandler(data);
        res.status(200).send(processedData);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// 启动
app.listen(3000, () => {
    console.log(`http://localhost:3000/index.html`);
});
