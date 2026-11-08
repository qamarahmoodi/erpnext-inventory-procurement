const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SCREENSHOT_DIR = path.join(__dirname, 'docs', 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function capture() {
  console.log('Launching Edge via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  try {
    // 1. Login
    console.log('Navigating to login page...');
    await page.goto('http://localhost:8080/login', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#login_email');
    await page.type('#login_email', 'Administrator');
    await page.type('#login_password', 'admin');
    await page.click('button[type="submit"]');
    await sleep(5000);
    console.log('Logged in successfully!');

    // 01. Desk
    console.log('Capturing Desk...');
    await page.goto('http://localhost:8080/app', { waitUntil: 'networkidle2' });
    await sleep(4000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_erpnext_desk.png') });

    // 02. Item Master
    console.log('Capturing Item Master...');
    await page.goto('http://localhost:8080/app/item/KEY-001', { waitUntil: 'networkidle2' });
    await sleep(4000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_item_master.png') });

    // 03. Supplier Master
    console.log('Capturing Supplier Master...');
    await page.goto('http://localhost:8080/app/supplier/ABC%20Electronics%20Distributors', { waitUntil: 'networkidle2' });
    await sleep(4000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_supplier_master.png') });

    // 04. Initial Stock Reconciliation
    console.log('Capturing Stock Reconciliation...');
    await page.goto('http://localhost:8080/app/stock-reconciliation/MAT-RECO-2026-00001', { waitUntil: 'networkidle2' });
    await sleep(4000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_initial_stock_reconciliation.png') });

    // 05. Purchase Order
    console.log('Capturing Purchase Order...');
    await page.goto('http://localhost:8080/app/purchase-order/PUR-ORD-2026-00001', { waitUntil: 'networkidle2' });
    await sleep(4000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_purchase_order.png') });

    // 06. Purchase Receipt
    console.log('Capturing Purchase Receipt...');
    await page.goto('http://localhost:8080/app/purchase-receipt/MAT-PRE-2026-00001', { waitUntil: 'networkidle2' });
    await sleep(4000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_purchase_receipt.png') });

    // 07. Stock Balance Report
    console.log('Capturing Stock Balance Report...');
    await page.goto('http://localhost:8080/app/query-report/Stock%20Balance', { waitUntil: 'networkidle2' });
    await sleep(5000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_stock_balance_report.png') });

    // 08. Stock Ledger Report
    console.log('Capturing Stock Ledger Report...');
    await page.goto('http://localhost:8080/app/query-report/Stock%20Ledger', { waitUntil: 'networkidle2' });
    await sleep(5000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08_stock_ledger_report.png') });

    // 09. Purchase Order Analysis
    console.log('Capturing Purchase Order Analysis Report...');
    await page.goto('http://localhost:8080/app/query-report/Purchase%20Order%20Analysis', { waitUntil: 'networkidle2' });
    await sleep(5000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09_purchase_order_analysis.png') });

    console.log('All screenshots captured successfully!');
  } catch (err) {
    console.error('Error during screenshot capture:', err);
  } finally {
    await browser.close();
  }
}

capture();
