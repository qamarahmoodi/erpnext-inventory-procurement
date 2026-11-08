# Implementation of an Inventory and Procurement Management System Using ERPNext

**Elective Course:** Enterprise Business Systems (EBS)  
**Academic Degree:** B.Tech in Computer Science and Engineering  
**Fictional Company:** TechZone Electronics (India, Currency: INR ₹)  
**ERP Platform:** ERPNext v16 on Frappe Framework  

---

## Project Overview

This repository contains the complete implementation, configuration, demonstration scripts, and academic documentation for a college mini-project evaluating **Enterprise Business Systems (EBS)** concepts using **ERPNext**.

The project simulates an electronics retail enterprise, **TechZone Electronics**, executing a full procurement lifecycle:
1. **Master Data Configuration:** Defining suppliers, items, warehouses, pricing, and reorder levels.
2. **Initial Inventory Seeding:** Opening inventory established at **5 wireless keyboards** via formal Stock Reconciliation (`MAT-RECO-2026-00001`).
3. **Procurement Execution:** Creating and submitting a Purchase Order (`PUR-ORD-2026-00001`) for **20 units** at ₹650 each (Total: ₹13,000) from ABC Electronics Distributors.
4. **Goods Receipt:** Inwarding 20 units into Main Warehouse via Purchase Receipt (`MAT-PRE-2026-00001`).
5. **Inventory & Ledger Verification:** Automated increase of physical stock from **5 to 25 units** (Total valuation: ₹16,250), with synchronized stock ledger entries and perpetual accounting accruals.
6. **Low-Stock Monitoring:** Configured an item reorder level of 30 units (reorder quantity: 20 units) to demonstrate exception-based replenishment alerts.

---

## Quickstart (Reproduce in 3 Steps)

### Prerequisites
* Docker Desktop & Docker Compose (`v2.20+`)
* Git

### Step 1: Clone and Start
```bash
git clone <your-repo-url> erpnext-inventory-procurement
cd erpnext-inventory-procurement
docker compose up -d
```

### Step 2: Access ERPNext
Once containers are healthy, open your web browser:
* **URL:** `http://localhost:8080`
* **Username:** `Administrator`
* **Password:** `admin`

### Step 3: Verify the Live Transactions
* **Stock Balance:** `http://localhost:8080/app/query-report/Stock%20Balance` (shows 25 units of `KEY-001`)
* **Stock Ledger:** `http://localhost:8080/app/query-report/Stock%20Ledger` (shows +5 and +20 entries)
* **Purchase Order:** `http://localhost:8080/app/purchase-order/PUR-ORD-2026-00001` (shows 100% received, Status: `To Bill`)

---

## Repository Structure

```
erpnext-inventory-procurement/
├── compose.yaml              # Official container stack (MariaDB 11.8, Redis, ERPNext v16, Nginx)
├── pwd.yml                   # Official standalone frappe_docker compose reference
├── capture_screens.js        # Automated script using Edge & puppeteer-core to capture UI screens
├── .gitignore                # Excludes site data, logs, credentials, and node_modules
├── README.md                 # Root project overview and quickstart guide
└── docs/
    ├── README.md             # Detailed installation and workflow documentation
    ├── demo-guide.md         # 5-Minute oral and screen demonstration script for the professor
    ├── project-report.md     # Academic EBS project report (Theory, Architecture, Results)
    ├── brochure-content.md   # Content for a 2-page academic project brochure
    └── screenshots/          # Real, verified screenshots of all ERPNext screens and reports
        ├── 01_erpnext_desk.png
        ├── 02_item_master.png
        ├── 03_supplier_master.png
        ├── 04_initial_stock_reconciliation.png
        ├── 05_purchase_order.png
        ├── 06_purchase_receipt.png
        ├── 07_stock_balance_report.png
        ├── 08_stock_ledger_report.png
        └── 09_purchase_order_analysis.png
```

---

## Verified Results Summary

| Metric | Opening Value | Transaction Event | Final State | Status |
| :--- | :---: | :---: | :---: | :---: |
| **Warehouse Stock** | 5 units | +20 units (Purchase Receipt) | **25.0 units** | **Verified** |
| **Inventory Valuation** | ₹3,250.00 | +₹13,000.00 | **₹16,250.00** | **Verified** |
| **Purchase Order Fulfillment** | 0% | 20 / 20 received | **100.0%** | **Verified** |
| **PO Commercial Status** | Draft | Approved & Received | **To Bill** | **Verified** |
| **Stock Ledger Audit Trail** | 1 Entry | +1 Entry | **2 Immutable Entries** | **Verified** |
| **Low Stock Buffer** | Reorder Level: 30 | Current Stock: 25 | **Shortage Alert (5 units below)** | **Verified** |
| **Data Persistence** | Verified across full container restart (`docker compose restart`) | **100% Persisted** | **Verified** |

---

## Documentation Links

* 📄 [Detailed Workflow & Setup Guide](docs/README.md)
* ⏱️ [5-Minute Professor Demonstration Script](docs/demo-guide.md)
* 📑 [Academic Project Report](docs/project-report.md)
* 📰 [Two-Page Academic ERP Brochure](docs/brochure-content.md)
* 🖼️ [Captured UI Screenshots Directory](docs/screenshots/)
