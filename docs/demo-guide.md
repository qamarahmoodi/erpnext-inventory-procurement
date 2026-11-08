# 5-Minute ERP Demonstration Script: Inventory & Procurement

**Evaluator:** Professor / Course Examiner  
**Student Presenter:** [Your Name / Team]  
**Course:** Enterprise Business Systems (EBS)  
**System URL:** `http://localhost:8080`  
**Credentials:** Username: `Administrator` | Password: `admin`  

---

## Demonstration Outline

| Minute | Stage | ERPNext Screen / URL | Core EBS Concept Highlighted |
| :---: | :--- | :--- | :--- |
| **0:00 - 1:00** | Introduction & Master Data | `/app/item/KEY-001`<br>`/app/supplier/ABC%20Electronics%20Distributors` | Master Data Management, Data Integrity |
| **1:00 - 2:00** | Opening Stock Verification | `/app/stock-reconciliation/MAT-RECO-2026-00001`<br>`/app/query-report/Stock%20Balance` | Initial Inventory Valuation, Bin Tracking |
| **2:00 - 3:15** | Procurement Execution | `/app/purchase-order/PUR-ORD-2026-00001`<br>`/app/purchase-receipt/MAT-PRE-2026-00001` | Transaction Processing, Document Flow |
| **3:15 - 4:15** | Inventory & Ledger Verification | `/app/query-report/Stock%20Balance`<br>`/app/query-report/Stock%20Ledger` | Automated Perpetual Inventory (5 -> 25) |
| **4:15 - 5:00** | Analytical Reporting & Low Stock | `/app/query-report/Purchase%20Order%20Analysis` | Exception Handling & Automated Reorder |

---

## Detailed Step-by-Step Script

### Minute 1: Introduction & Master Data Management

**Presenter Narration:**
> *"Good morning, Professor. Today I am demonstrating an Inventory and Procurement Management System for our electronics retail company, **TechZone Electronics**, implemented on ERPNext. In enterprise systems, before transactions can occur, reliable **Master Data** must be established. Let me show you our primary masters."*

1. **Open Item Master:** Navigate to `http://localhost:8080/app/item/KEY-001`
   * **Point out:**
     * Item Code: `KEY-001` | Item Name: `Wireless Keyboard`
     * Item Group: `Computer Accessories` | Unit of Measure: `Nos`
     * `Maintain Stock` checkbox is **Enabled** (flags this as an inventory item tracked by physical quantities).
     * Standard Buying Rate: **₹650.00**.
     * Reorder Level: **30 units** (under Inventory section).

2. **Open Supplier Master:** Navigate to `http://localhost:8080/app/supplier/ABC%20Electronics%20Distributors`
   * **Point out:**
     * Supplier Name: `ABC Electronics Distributors`
     * Supplier Group: `Electronics Suppliers` | Country: `India`
     * Centralized supplier profile maintains financial and purchase history without redundant data entry.

---

### Minute 2: Initial Inventory (Opening Stock of 5 Units)

**Presenter Narration:**
> *"Now we establish our initial state. TechZone Electronics started operations with an opening stock of 5 keyboards in our Main Warehouse. In ERPNext, we record this using a formal **Stock Reconciliation** opening entry, not an informal direct database tweak."*

1. **Open Submitted Stock Reconciliation:** Navigate to `http://localhost:8080/app/stock-reconciliation/MAT-RECO-2026-00001`
   * **Point out:**
     * Document Number: `MAT-RECO-2026-00001` (Submitted / Closed).
     * Purpose: `Opening Stock`.
     * Line item: `KEY-001` into `Main Warehouse - TZE` with Quantity = `5` and Valuation Rate = `₹650.00`.
     * Total opening valuation: `₹3,250.00`.

2. **Show Initial Stock Balance:** Open `http://localhost:8080/app/query-report/Stock%20Balance`
   * **Point out:**
     * Initial balance for `KEY-001` in `Main Warehouse - TZE` shows **5.0 units** with value **₹3,250.00**.

---

### Minute 3: Purchase Order & Goods Receipt Workflow

**Presenter Narration:**
> *"Our store inventory is low, so management issues a formal Purchase Order for 20 additional units to ABC Electronics Distributors. Let's inspect the Purchase Order transaction."*

1. **Open Purchase Order:** Navigate to `http://localhost:8080/app/purchase-order/PUR-ORD-2026-00001`
   * **Point out:**
     * Document Number: `PUR-ORD-2026-00001`.
     * Supplier: `ABC Electronics Distributors`.
     * Line Item: `KEY-001` (Wireless Keyboard) | Ordered Qty: `20` | Rate: `₹650.00`.
     * Net Amount / Grand Total: **₹13,000.00**.
     * Explain that submitting the PO does not increase physical stock; it represents a commercial commitment.

2. **Open Purchase Receipt:** Navigate to `http://localhost:8080/app/purchase-receipt/MAT-PRE-2026-00001`
   * **Point out:**
     * Document Number: `MAT-PRE-2026-00001`.
     * Created directly against `PUR-ORD-2026-00001` using ERPNext's standard mapping workflow.
     * Line item receives `20` units into `Main Warehouse - TZE`.
     * Explain that upon submitting this document, ERPNext simultaneously updates the warehouse bin, generates stock ledger entries, and posts accounting accruals (`Stock In Hand` debited ₹13,000).

3. **Check PO Status Update:** Return to `http://localhost:8080/app/purchase-order/PUR-ORD-2026-00001`
   * **Point out:**
     * Status has changed to **`To Bill`**.
     * **`Per Received (%): 100%`** and **`Received Qty: 20.0`**.
     * Demonstrates real-time inter-module integration between Procurement and Warehouse.

---

### Minute 4: Stock Ledger & Inventory Verification (5 -> 25 Units)

**Presenter Narration:**
> *"Now let's examine the ultimate proof of system integrity: the Stock Balance and Stock Ledger reports. As required, the inventory must increase from 5 to 25 through the actual transaction."*

1. **Open Stock Balance Report:** Navigate to `http://localhost:8080/app/query-report/Stock%20Balance`
   * **Point out the exact numbers:**
     * Item Code: `KEY-001`
     * Warehouse: `Main Warehouse - TZE`
     * In Qty (Purchased & Received): **20.0 units**
     * Balance Qty: **25.0 units** (Initial 5 + Received 20)
     * Valuation Rate: **₹650.00**
     * Balance Value: **₹16,250.00** (25 × ₹650)

2. **Open Stock Ledger Report:** Navigate to `http://localhost:8080/app/query-report/Stock%20Ledger`
   * **Point out the immutable audit trail:**
     * **Entry 1:** Voucher `Stock Reconciliation` (`MAT-RECO-2026-00001`) -> Qty: `5.0` | Balance: `5.0 units`.
     * **Entry 2:** Voucher `Purchase Receipt` (`MAT-PRE-2026-00001`) -> Qty: `+20.0` | Balance: `25.0 units`.
     * This proves that no direct database modification occurred; every unit is traceable to an authorized business document.

---

### Minute 5: Procurement Analytics & Low Stock Monitoring

**Presenter Narration:**
> *"Finally, ERPNext supports automated operational reporting and inventory planning."*

1. **Open Purchase Order Analysis:** Navigate to `http://localhost:8080/app/query-report/Purchase%20Order%20Analysis`
   * **Point out:**
     * Tracks ordered vs. received quantities in real-time.
     * Pending Qty: `0.0` (all 20 received).
     * Billed Qty: `0.0` with Qty to Bill: `20.0` (ready for invoice processing).

2. **Explain Reorder Level:**
   * *"We configured a reorder point of 30 units on `KEY-001`. Since our total warehouse stock is now 25 units, ERPNext identifies that we are 5 units below our safety threshold and can automatically generate a Material Request for re-ordering."*

**Conclusion:**
> *"This concludes our demonstration. We have shown Master Data setup, opening stock reconciliation, purchase order issuance, goods receipt mapping, stock balance elevation from 5 to 25 units, and synchronized ledger reporting. Thank you, Professor. I am ready for questions."*
