# API Specification - MVP #1: Sistema de Inventario + POS

**Version**: 1.0  
**Base URL**: `https://your-app.vercel.app/api`

---

## Endpoints

### Products

#### GET /api/products
List all products for user's store.

**Response 200**:
```json
{
  "data": [
    {
      "id": "uuid",
      "sku": "SKU-001",
      "name": "Wireless Mouse",
      "category": "Electronics",
      "stock": 45,
      "buy_price": 25.00,
      "sell_price": 49.99,
      "supplier_id": "uuid"
    }
  ]
}
```

---

#### POST /api/products
Create new product (owner only).

**Request**:
```json
{
  "sku": "SKU-001",
  "name": "Wireless Mouse",
  "category": "Electronics",
  "stock": 50,
  "buy_price": 25.00,
  "sell_price": 49.99,
  "supplier_id": "uuid"
}
```

**Validation**:
- SKU must be unique
- stock >= 0
- sell_price > buy_price (warning only)

**Response 201**:
```json
{
  "data": {
    "id": "uuid",
    "sku": "SKU-001",
    ...
  }
}
```

---

#### PATCH /api/products/[id]
Update product.

**Request**:
```json
{
  "stock": 60,
  "sell_price": 54.99
}
```

---

#### DELETE /api/products/[id]
Delete product (only if stock = 0).

---

### Sales

#### POST /api/sales
Create new sale.

**Request**:
```json
{
  "items": [
    {
      "product_id": "uuid",
      "quantity": 2,
      "unit_price": 49.99
    }
  ],
  "total": 99.98,
  "amount_received": 100.00
}
```

**Business Logic**:
1. Validates stock for each item
2. Creates sale record
3. Creates sale_items
4. **Decrements product stock** (atomic transaction)
5. Calculates change

**Response 201**:
```json
{
  "data": {
    "id": "uuid",
    "total": 99.98,
    "change_given": 0.02,
    "receipt_url": "/receipts/uuid"
  }
}
```

---

#### GET /api/sales
List sales (with filters).

**Query Params**:
- `date`: YYYY-MM-DD (filter by date)
- `cashier_id`: Filter by cashier

---

### Dashboard

#### GET /api/dashboard/stats
Get today's stats.

**Response 200**:
```json
{
  "data": {
    "sales_today": {
      "total": 4520.00,
      "transaction_count": 56
    },
    "low_stock_count": 12,
    "top_products": [
      {"name": "Wireless Mouse", "quantity_sold": 56},
      {" name": "Laptop Stand", "quantity_sold": 32}
    ],
    "inventory_value": 125000.50
  }
}
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Validation failed |
| 401 | Unauthorized |
| 403 | Forbidden (wrong role) |
| 409 | Insufficient stock |

---

**Last Updated**: 2026-01-13
