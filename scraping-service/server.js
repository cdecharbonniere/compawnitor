const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const { sendAlertEmail } = require('./utils/alert-system');
const { getProxy } = require('./utils/proxy-system');

const app = express();
app.use(bodyParser.json());

app.post('/scraping', async (req, res) => {
    const { keywords, username } = req.body;

    try {
        const proxy = getProxy();
        
        const browser = await puppeteer.launch({
        headless: true,
        args: [`--proxy-server=${proxy}`],
        });

        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0');
        
        // Navigation sur Twitter
        if (keywords) {
        await page.goto(`https://twitter.com/search?q=${keywords}`);
        } else if (username) {
        await page.goto(`https://twitter.com/${username}`);
        }

        const scrapedData = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.tweet')).map(tweet => tweet.innerText);
        });

        await browser.close();
        
        res.status(200).json({ message: 'Scraping réussi', data: scrapedData });

    } catch (error) {
        console.error('Erreur lors du scraping:', error);
        sendAlertEmail('Erreur lors du scraping : captcha ou blocage.');
        res.status(500).json({ message: 'Erreur lors du scraping' });
    }
});

app.listen(4000, () => {
    console.log('Microservice de scraping lancé sur le port 4000');
});
