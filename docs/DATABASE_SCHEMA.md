# Database Schema - MVP #1: Sistema de Inventario + POS

**Database**: PostgreSQL (Supabase)  
**Version**: 1.0

---

## 📊 Entity Relationship Diagram

```mermaid
erDiagram
    auth_users ||--|| profiles : "extends"
    profiles ||--o{ products : "owns"
    profiles ||--o{ sales : "cashier"
    profiles ||--o{ suppliers : "manages"
    products }o--|| suppliers : "supplied_by"
    sales ||--|{ sale_items : "contains"
    products ||--o{ sale_items : "sold_as"
    
    auth_users {
        uuid id PK
        text email
    }
    
    profiles {
        uuid id PK FK
        text email
        text full_name
        text role "owner/cashier"
        uuid store_id FK
        timestamp created_at
    }
    
    stores {
        uuid id PK
        text name
        uuid owner_id FK
        timestamp created_at
    }
    
    products {
        uuid id PK
        uuid store_id FK
        text sku UNIQUE
        text name
        text category
        integer stock
        decimal buy_price
        decimal sell_price
        uuid supplier_id FK
        timestamp created_at
    }
    
    suppliers {
        uuid id PK
        uuid store_id FK
        text name
        text contact
        timestamp created_at
    }
    
    sales {
        uuid id PK
        uuid store_id FK
        uuid cashier_id FK
        decimal total
        decimal amount_received
        decimal change_given
        timestamp created_at
    }
    
    sale_items {
        uuid id PK
        uuid sale_id FK
        uuid product_id FK
        integer quantity
        decimal unit_price
        decimal subtotal
    }
```

---

## Tables

### 1. `stores`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `name` | TEXT | NOT NULL |
| `owner_id` | UUID | REFERENCES profiles(id) |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() |

---

### 2. `profiles`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PK, REFERENCES auth.users |
| `email` | TEXT | NOT NULL |
| `full_name` | TEXT | NOT NULL |
| `role` | TEXT | CHECK (IN 'owner', 'cashier') |
| `store_id` | UUID | REFERENCES stores(id) |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() |

---

### 3. `products`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `store_id` | UUID | REFERENCES stores(id) |
| `sku` | TEXT | UNIQUE, NOT NULL |
| `name` | TEXT | NOT NULL |
| `category` | TEXT | NOT NULL |
| `stock` | INTEGER | DEFAULT 0, CHECK (>= 0) |
| `buy_price` | DECIMAL(10,2) | NOT NULL |
| `sell_price` | DECIMAL(10,2) | NOT NULL |
| `supplier_id` | UUID | REFERENCES suppliers(id) |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() |

**Indexes**:
- `idx_products_store` on `store_id`
- `idx_products_category` on `category`
- `idx_products_low_stock` on `stock` WHERE `stock < 10`

---

### 4. `suppliers`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `store_id` | UUID | REFERENCES stores(id) |
| `name` | TEXT | NOT NULL |
| `contact` | TEXT | |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() |

---

### 5. `sales`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `store_id` | UUID | REFERENCES stores(id) |
| `cashier_id` | UUID | REFERENCES profiles(id) |
| `total` | DECIMAL(10,2) | NOT NULL |
| `amount_received` | DECIMAL(10,2) | NOT NULL |
| `change_given` | DECIMAL(10,2) | NOT NULL |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() |

**Indexes**:
- `idx_sales_store_date` on `store_id, created_at`
- `idx_sales_cashier` on `cashier_id`

---

### 6. `sale_items`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `sale_id` | UUID | REFERENCES sales(id) ON DELETE CASCADE |
| `product_id` | UUID | REFERENCES products(id) |
| `quantity` | INTEGER | NOT NULL, CHECK (> 0) |
| `unit_price` | DECIMAL(10,2) | NOT NULL |
| `subtotal` | DECIMAL(10,2) | NOT NULL |

---

## RLS Policies

```sql
-- Products: Store-scoped
CREATE POLICY "Users can view their store's products"
  ON products FOR SELECT
  USING (store_id IN (SELECT store_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Owners can manage products"
  ON products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'owner' AND store_id = products.store_id
    )
  );

-- Sales: Cashiers can create, all can view their store's sales
CREATE POLICY "Users can view their store's sales"
  ON sales FOR SELECT
  USING (store_id IN (SELECT store_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Cashiers can create sales"
  ON sales FOR INSERT
  WITH CHECK (
    cashier_id = auth.uid() AND
    store_id IN (SELECT store_id FROM profiles WHERE id = auth.uid())
  );
```

---

**References**:
- Implementation: `START_HERE/ENGINEERING.md` § 4-5
- API: `docs/API_SPEC.md`
