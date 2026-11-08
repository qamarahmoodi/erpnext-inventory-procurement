# Implementation of an Inventory and Procurement Management System Using ERPNext

**Course:** Enterprise Business Systems (EBS) — CSE Elective  
**Fictional Enterprise:** TechZone Electronics (India, INR ₹)  
**Platform:** ERPNext (Open Source Frappe Framework)  
**Setup Method:** Docker Compose (Official `frappe_docker`)  

---

## 1. Project Overview

This project demonstrates the core principles of **Enterprise Business Systems (EBS)** by implementing an end-to-end Inventory and Procurement Management System for a fictional electronics retailer, **TechZone Electronics**.

The implementation emphasizes:
* **Master Data Management (MDM):** Establishing centralized, single-source-of-truth records for suppliers, items, warehouses, and price lists.
* **Procurement Lifecycle:** Managing formal procurement transactions from Purchase Order creation to goods receipt.
* **Inventory Control & Perpetual Accounting:** Tracking real-time physical stock movements in the warehouse and maintaining synchronized stock valuation.
* **Operational Reporting:** Utilizing native ERP ledger and analytical reports to audit transactions and monitor stock levels.

---

## 2. About ERPNext

[ERPNext](https://github.com/frappe/erpnext) is a full-featured, open-source ERP system built on the Python/MariaDB-based [Frappe Framework](https://github.com/frappe/frappe). It provides modular enterprise management across accounting, procurement, inventory, sales, manufacturing, and HR.

In this mini-project, ERPNext was deployed without modifying core code, using containerized microservices to guarantee zero configuration drift and full reproducibility.

---

## 3. System Architecture & Modules Used

To keep the project clean, lightweight, and aligned with college project guidelines, only the required enterprise modules are active:

| Module | Purpose in Project | Key Documents / Records |
| :--- | :--- | :--- |
| **Buying / Procurement** | Managing supplier relationships and purchase transactions | Supplier, Purchase Order, Item Price |
| **Stock / Inventory** | Controlling stock balances, warehouse storage, and movements | Item Master, Warehouse, Stock Reconciliation, Purchase Receipt |
| **Accounting (Automated)** | Automated perpetual inventory ledger updates | Stock In Hand Account, Stock Received But Not Billed |
| **Operational Reports** | Real-time reporting and inventory tracking | Stock Balance, Stock Ledger, Purchase Order Analysis |

*Unnecessary modules (HR, Payroll, Manufacturing, CRM, Projects, Assets) have been disabled or hidden to present a focused operational environment.*

---

## 4. Local Installation & Deployment (Reproducible)

The implementation utilizes the official container images from `frappe_docker` configured in `compose.yaml`.

### Prerequisites
* Operating System: Windows 10/11, macOS, or Linux
* Docker & Docker Compose (`v2.20+`)
* Hardware: 8 GB+ RAM, 10 GB free disk space

### Quickstart Commands

1. **Clone or navigate to the repository:**
   ```bash
   cd erpnext-inventory-procurement
   ```

2. **Launch the container stack:**
   ```bash
   docker compose up -d
   ```
   *This initializes MariaDB 11.8, Redis Cache, Redis Queue, ERPNext Backend, Background Workers, WebSocket, and Nginx Frontend.*

3. **Verify site provisioning:**
   ```bash
   docker compose logs -f create-site
   ```
   *The container provisions the `frontend` site, installs the `erpnext` app, and configures the default Administrator account.*

4. **Access the ERPNext Desk:**
   * Open your browser: `http://localhost:8080`
   * **Username:** `Administrator`
   * **Password:** `admin`

---

## 5. Master Data Setup

The system was configured for **TechZone Electronics** (India / INR):

* **Supplier:** `ABC Electronics Distributors` (Group: `Electronics Suppliers`, Country: `India`)
* **Warehouse:** `Main Warehouse` (`Main Warehouse - TZE`, Company: `TechZone Electronics`)
* **Item Master:** `Wireless Keyboard` (`KEY-001`)
  * Item Group: `Computer Accessories`
  * Stock UOM: `Nos`
  * Maintain Stock: `Enabled`
  * Standard Buying Rate: `₹650`
  * Reorder Level: `30 units` (Reorder Qty: `20 units`)

---

## 6. Steps to Reproduce the Core ERP Business Transaction

The system demonstrates the complete business cycle: an initial stock of 5 units followed by the procurement of 20 units.

### Step 1: Establish Opening Stock (5 Units)
1. Go to **Stock > Stock Reconciliation > New**.
2. Set **Purpose** to `Opening Stock`.
3. Set **Difference Account** to `Temporary Opening - TZE`.
4. In the items table:
   * **Item Code:** `KEY-001`
   * **Warehouse:** `Main Warehouse - TZE`
   * **Quantity:** `5`
   * **Valuation Rate:** `650`
5. Save and **Submit** (`MAT-RECO-2026-00001`).
6. *Verify:* Stock Balance report displays **5.0 units** with total valuation of **₹3,250.00**.

### Step 2: Issue Purchase Order (20 Units)
1. Go to **Buying > Purchase Order > New**.
2. Select **Supplier:** `ABC Electronics Distributors`.
3. Set **Required By Date:** Today.
4. Add Item:
   * **Item Code:** `KEY-001`
   * **Accepted Warehouse:** `Main Warehouse - TZE`
   * **Quantity:** `20`
   * **Rate:** `₹650`
   * **Amount:** `₹13,000.00`
5. Save and **Submit** (`PUR-ORD-2026-00001`).
6. Status becomes `To Receive and Bill`.

### Step 3: Receive Goods via Purchase Receipt (20 Units)
1. In the submitted Purchase Order `PUR-ORD-2026-00001`, click **Create > Purchase Receipt**.
2. ERPNext automatically maps the supplier, line item, quantity (20), rate (₹650), and target warehouse.
3. Save and **Submit** (`MAT-PRE-2026-00001`).
4. Purchase Order status automatically updates to `To Bill` with **100% received**.

### Step 4: Audit & Verify Stock Update
1. Open **Stock > Stock Balance**:
   * Initial Balance: `5.0 units`
   * In Qty (Receipt): `20.0 units`
   * Final Balance: `25.0 units`
   * Final Stock Valuation: `₹16,250.00` (25 × ₹650)
2. Open **Stock > Stock Ledger**:
   * Row 1: Stock Reconciliation (`+5.0`, running balance: `5.0`)
   * Row 2: Purchase Receipt (`+20.0`, running balance: `25.0`)

---

## 7. Project Documentation Index

* [`demo-guide.md`](demo-guide.md): 5-Minute presentation script for the professor.
* [`project-report.md`](project-report.md): Formal academic project report.
* [`brochure-content.md`](brochure-content.md): Two-page academic project brochure.
* [`screenshots/`](screenshots/): High-resolution screenshots of all system transactions and reports.
