# 📋 PRODUCT SPECIFICATION - MVP #1: Sistema de Inventario + POS

**Responsabilidad**: Product Manager  
**Enfoque**: QUÉ construir, POR QUÉ, CUÁNDO

---

## 📑 Tabla de Contenidos

1. [Business Context](#-business-context)
2. [Problem Statement](#-problem-statement)
3. [Solution Overview](#-solution-overview)
4. [Target Users](#-target-users)
5. [Features (MoSCoW)](#-features-moscow)
6. [User Stories](#-user-stories)
7. [Acceptance Criteria](#-acceptance-criteria-por-feature)
8. [Success Metrics](#-success-metrics--kpis)
9. [Timeline & Sprints](#-timeline--sprints)
10. [User Testing Plan](#-user-testing-plan-post-build)
11. [Out of Scope](#-out-of-scope-v10)
12. [Risks & Assumptions](#-risks--assumptions)

---

## 🎯 Business Context

### Objetivo del MVP
Crear un **sistema de inventario con punto de venta (POS)** integrado que permita a pequeños comercios gestionar stock, procesar ventas, y generar reportes en tiempo real.

### Problema de Negocio
- **60% de pequeños comercios** usan Excel o cuadernos para inventario
- **Promedio $2,500/mes** en pérdidas por descontrol de stock (productos vencidos, faltantes)
- **25-30% error humano** al contar inventario manualmente
- **No visibilidad** de productos más vendidos o margen de ganancia

### Oportunidad
- Mercado: $8.5B globally (retail POS software)
- TAM LATAM: ~2M pequeños comercios (1-10 empleados)
- Competencia: costosa ($200-500/mes) o muy compleja
- Nuestro edge: Simple + Precio LATAM ($50-80/mes)

### Success Goal
- **20 comercios** usando activamente en 30 días
- **Promedio 100 transacciones/día** por comercio
- **<5% discrepancia** entre inventario teórico vs físico

**Referencia Técnica**: Ver `ENGINEERING.md` para arquitectura

---

## ❌ Problem Statement

### Usuario: Dueño de Tienda Pequeña

**Pains**:
1. No sabe qué productos tiene en stock (cuenta manual, inexacta)
2. Emite facturas a mano o en Word (lento, sin respaldo)
3. No sabe qué productos se venden más
4. Pierde dinero en productos vencidos/caducados
5. Inventario físico toma 2-3 días cada mes

**Current Alternatives**:
- Excel (propenso a errores, no multi-usuario)
- Cuaderno de papel (anticuado, sin reportes)
- Software enterprise (Square, Shopify POS): muy caro

### Usuario: Empleado de Caja

**Pains**:
1. Proceso de venta lento (buscar precio manualmente)
2. Errores al calcular cambio
3. No puede ver stock disponible rápidamente
4. Depende del dueño para consultas

---

## ✅ Solution Overview

Aplicación web todo-en-uno:

### Para Dueños:
- ✅ Dashboard con ventas del día, productos bajos en stock
- ✅ Inventario completo (agregar/editar/eliminar productos)
- ✅ Reportes de ventas (diario, semanal, mensual)
- ✅ Control de proveedores

### Para Empleados:
- ✅ POS rápido (buscar producto, agregar a carrito, cobrar)
- ✅ Consulta de stock en tiempo real
- ✅ Historial de transacciones

**Diferenciador**: 
- Todo-en-uno (inventory + POS)
- Precio accesible ($50-80/mes)
- Setup en <30 min

---

## 👥 Target Users

### Persona 1: María López (Dueña)
- **Rol**: Dueña de minimarket/bodega
- **Edad**: 35-55
- **Tech savviness**: Baja-Media (usa WhatsApp, Facebook)
- **# Empleados**: 2-3
- **# SKUs**: 200-500 productos
- **Pain principal**: Descontrol de inventario
- **Willingness to pay**: $50-80/mes

### Persona 2: Juan Pérez (Empleado)
- **Rol**: Cajero
- **Edad**: 20-35
- **Tech savviness**: Media
- **Uso**: 8 horas/día en POS
- **Pain principal**: Proceso de venta lento
- **Expectativa**: Interface rápida, < 30 segundos por venta

---

## 🎨 Features (MoSCoW)

### ✅ **MUST-HAVE** (Sprint 1 - Semana 1-2)

#### Feature #1: Authentication & User Roles
**Value**: Seguridad + multi-usuario  
**Effort**: 1 día  
**Implementation**: Ver `ENGINEERING.md` → § 6.1

**User Story**:
- Como dueño, quiero crear cuentas para mis empleados
- Como empleado, quiero login para acceder a POS

**Roles**:
- `owner`: Full access (inventory, reports, POS)
- `cashier`: Solo POS y consulta de stock

---

#### Feature #2: Product Management (Inventory)
**Value**: Core feature, gestión de catálogo  
**Effort**: 2 días

**User Story**:
Como dueño, quiero:
- Agregar producto (nombre, SKU, precio, stock inicial, proveedor)
- Editar producto (precio, stock actual)
- Eliminar producto
- Ver lista completa de productos (tabla con búsqueda)
- Filtrar por categoría (Alimentos, Bebidas, Limpieza, etc.)

**Implementation**: Ver `ENGINEERING.md` → § 6.2

---

#### Feature #3: POS (Point of Sale)
**Value**: Core feature, procesar ventas  
**Effort**: 3 días

**User Story**:
Como empleado, quiero:
1. Buscar producto por nombre o código de barras
2. Agregar a carrito (cantidad, ver subtotal)
3. Ver total de compra
4. Ingresar monto recibido
5. Calcular cambio automáticamente
6. Confirmar venta (actualiza inventario)
7. Imprimir/enviar recibo por email

**Implementation**: Ver `ENGINEERING.md` → § 6.3

---

#### Feature #4: Low Stock Alerts
**Value**: Prevenir quiebres de stock  
**Effort**: 1 día

**User Story**:
- Como dueño, quiero ver alertas de productos con stock < 10 unidades
- Dashboard muestra badge rojo con # de productos bajos en stock
- Lista de productos bajos (con link rápido para reordenar)

**Implementation**: Ver `ENGINEERING.md` → § 6.4

---

#### Feature #5: Sales Dashboard
**Value**: Visibilidad de negocio  
**Effort**: 2 días

**User Story**:
Como dueño, quiero ver:
- Ventas del día (total $, # transacciones)
- Productos más vendidos (top 5)
- Gráfica de ventas (últimos 7 días)
- Stock total valorizado ($)

**Implementation**: Ver `ENGINEERING.md` → § 6.5

---

### 🟡 **SHOULD-HAVE** (Sprint 2 - Post-MVP)

#### Feature #6: Reports
- Reporte de ventas por fecha range (CSV export)
- Reporte de inventario actual (PDF)
- Productos sin movimiento (últimos 30 días)

#### Feature #7: Proveedores
- CRUD de proveedores
- Asociar productos a proveedor
- Historial de compras a proveedor

#### Feature #8: Barcode Scanning
- Camera scan de código de barras (mobile)
- USB barcode scanner support

---

### 🔵 **COULD-HAVE** (V2)

- Multi-tienda (múltiples locales con inventario centralizado)
- Loyalty program (puntos por compra)
- Integraciones (WhatsApp orders, delivery apps)

---

### 🔴 **WON'T-HAVE** (V1)

- Accounting/contabilidad completa  
- Employee scheduling
- E-commerce integration
- Hardware POS terminal (solo web app)

---

## 📝 User Stories

### Epic 1: Authentication

**US-1.1**: Como dueño, quiero registrarme con email/password  
**US-1.2**: Como dueño, quiero crear cuentas para empleados (role: cashier)  
**US-1.3**: Como empleado, quiero login  
**US-1.4**: Como usuario, quiero cerrar sesión

---

### Epic 2: Inventory Management

**US-2.1**: Como dueño, quiero agregar producto (nombre, SKU, precio compra, precio venta, stock inicial, categoría)  
**US-2.2**: Como dueño, quiero editar producto (cambiar precio, ajustar stock)  
**US-2.3**: Como dueño, quiero eliminar producto  
**US-2.4**: Como dueño, quiero ver lista de todos los productos (tabla paginada)  
**US-2.5**: Como dueño, quiero buscar producto por nombre/SKU  
**US-2.6**: Como dueño, quiero filtrar por categoría

---

### Epic 3: Point of Sale

**US-3.1**: Como cashier, quiero buscar producto (nombre o SKU)  
**US-3.2**: Como cashier, quiero agregar producto a carrito (cantidad)  
**US-3.3**: Como cashier, quiero ver total de compra actualizado en tiempo real  
**US-3.4**: Como cashier, quiero ingresar monto recibido y ver cambio calculado  
**US-3.5**: Como cashier, quiero confirmar venta  
**US-3.6**: Como cashier, quiero imprimir recibo  
**US-3.7**: Como cashier, quiero cancelar venta si cliente desiste

---

### Epic 4: Dashboard & Reports

**US-4.1**: Como dueño, quiero ver ventas del día en dashboard  
**US-4.2**: Como dueño, quiero ver productos más vendidos (top 5)  
**US-4.3**: Como dueño, quiero ver alertas de stock bajo  
**US-4.4**: Como dueño, quiero ver gráfica de ventas (últimos 7 días)

---

## ✅ Acceptance Criteria (por Feature)

### Feature #1: Authentication & User Roles

**AC-1.1**: Signup (Owner)
- [ ] Form: email, password, store_name, full_name
- [ ] Password min 8 caracteres, 1 uppercase, 1 número
- [ ] Después de signup → redirect a /dashboard
- [ ] Auto-assigned role: 'owner'

**AC-1.2**: Create Employee Account
- [ ] Owner puede crear usuario desde /settings/users
- [ ] Form: email, password, full_name, role (dropdown: cashier)
- [ ] Employee recibe email de bienvenida

**AC-1.3**: Login & Permissions
- [ ] Login form: email, password
- [ ] Owner puede acceder a: dashboard, inventory, POS, reports, settings
- [ ] Cashier puede acceder solo a: POS, product search
- [ ] Redirect diferenciado: owner → /dashboard, cashier → /pos

**Implementation**: `ENGINEERING.md` → § 6.1

---

### Feature #2: Product Management

**AC-2.1**: Add Product
- [ ] Form: name, SKU, category (dropdown), buy_price, sell_price, stock, supplier (optional)
- [ ] SKU debe ser único (validation)
- [ ] Stock debe ser >= 0
- [ ] sell_price debe ser > buy_price (warning, no blocker)
- [ ] Submit → producto agregado a DB, redirect a lista

**AC-2.2**: Edit Product
- [ ] Click producto en lista → modal de edición
- [ ] Puede cambiar: name, prices, stock, category
- [ ] SKU no editable (readonly)
- [ ] Save → actualiza DB, cierra modal

**AC-2.3**: Delete Product
- [ ] Button "Delete" con confirmation modal
- [ ] Solo si stock = 0 (prevenir pérdida de data)
- [ ] Si hay stock > 0 → error "Cannot delete product with stock"

**AC-2.4**: Product List
- [ ] Tabla con columnas: SKU, Name, Category, Stock, Buy Price, Sell Price, Actions
- [ ] Paginación (20 productos por página)
- [ ] Search bar (busca en name y SKU)
- [ ] Filter dropdown (categoría: All, Alimentos, Bebidas, etc.)

**Implementation**: `ENGINEERING.md` → § 6.2

---

### Feature #3: POS (Point of Sale)

**AC-3.1**: Search & Add to Cart
- [ ] Search input (autocomplete, busca name/SKU)
- [ ] Select producto → modal con quantity input
- [ ] Add to cart → aparece en cart list (nombre, cantidad, precio unitario, subtotal)

**AC-3.2**: Cart Management
- [ ] Cart muestra: lista de items, subtotal por item, total general
- [ ] Puede cambiar cantidad (input inline)
- [ ] Puede remover item (botón X)
- [ ] Total se actualiza automáticamente

**AC-3.3**: Checkout
- [ ] Button "Checkout" → modal de pago
- [ ] Input "Monto recibido"
- [ ] Muestra: Total, Recibido, Cambio (calculado automáticamente)
- [ ] Button "Confirm Sale"
- [ ] Post-sale: stock se decrementa, sale record creado, cart se vacía

**AC-3.4**: Receipt
- [ ] Después de venta → mostrar recibo (print view)
- [ ] Recibo incluye: store name, fecha/hora, lista de productos, total, monto recibido, cambio
- [ ] Button "Print" → window.print()
- [ ] Button "New Sale" → vuelve a POS limpio

**AC-3.5**: Error Handling
- [ ] Si producto out of stock → error "Insufficient stock (available: X)"
- [ ] Si monto recibido < total → error "Insufficient payment"

**Implementation**: `ENGINEERING.md` → § 6.3

---

### Feature #4: Low Stock Alerts

**AC-4.1**: Dashboard Alert Badge
- [ ] Badge rojo en sidebar/navbar: "Low Stock (3)"
- [ ] Click badge → redirect a /inventory?filter=lowstock

**AC-4.2**: Low Stock Definition
- [ ] Producto es "low stock" si current_stock < 10

**AC-4.3**: Low Stock List
- [ ] Lista filtrada de productos low stock
- [ ] Ordenados por stock ascendente (más crítico primero)
- [ ] Quick action: "Reorder" button (placeholder para post-MVP)

**Implementation**: `ENGINEERING.md` → § 6.4

---

### Feature #5: Sales Dashboard

**AC-5.1**: Today's Sales Card
- [ ] Muestra: Total ventas del día ($), # transacciones
- [ ] Updates en tiempo real (re-fetch cada 30s o real-time subscription)

**AC-5.2**: Top Products Card
- [ ] Top 5 productos más vendidos (por cantidad)
- [ ] Muestra: Product name, quantity sold today

**AC-5.3**: Sales Chart
- [ ] Gráfica de barras: ventas últimos 7 días (X: fecha, Y: $ vendido)
- [ ] Usa Chart.js o recharts

**AC-5.4**: Stock Value Card
- [ ] Suma total de inventario valorizado: SUM(stock * buy_price)
- [ ] Label: "Total Inventory Value"

**Implementation**: `ENGINEERING.md` → § 6.5

---

## 📊 Success Metrics & KPIs

### North Star Metric
**Transacciones procesadas por día**  
Target: 2,000+ transacciones/día en primeros 30 días (100 txn/día x 20 comercios)

### Primary Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Signup Conversion** | >30% | Visits → Signups |
| **Time to First Sale** | <10 min | Signup → First POS transaction |
| **Daily Active Users (DAU)** | >70% | Users opening app daily |
| **Inventory Accuracy** | >95% | (Theoretical stock / Physical count) |
| **30-day Retention** | >60% | Users active after 30 days |

### Secondary Metrics

- **Avg transactions per store**: >80/día
- **Avg products per sale**: >3 items
- **Stock alerts response time**: <24h (time to reorder after alert)

---

## 📅 Timeline & Sprints

### Sprint 1: Foundation (Semana 1)

**Día 1-2**: Setup + Authentication
- [x] Project setup (ENGINEERING.md § 3)
- [ ] Feature #1: Auth + roles

**Día 3-5**: Inventory Management
- [ ] Feature #2: Product CRUD (complete)

**Día 6-7**: POS Foundation
- [ ] Feature #3: POS basic (search, cart, checkout)

**Sprint Goal**: Poder procesar una venta completa

---

### Sprint 2: Polish & Launch (Semana 2)

**Día 8-9**: Dashboard & Alerts
- [ ] Feature #4: Low stock alerts
- [ ] Feature #5: Sales dashboard

**Día 10-11**: QA & Bug Fixes
- [ ] Ejecutar acceptance criteria
- [ ] Fix bugs críticos
- [ ] Responsive testing
- [ ] Print receipt testing

**Día 12-13**: Performance & Security
- [ ] Lighthouse > 90
- [ ] RLS verified
- [ ] Load testing (simulate 100 concurrent users)

**Día 14**: Deploy & Onboarding
- [ ] Production deploy
- [ ] Onboarding docs para primeros 20 comercios
- [ ] Video tutorial (2 min)

**Sprint Goal**: MVP production-ready, 20 comercios onboarded

---

## 👥 User Testing Plan (Post-Build)

### Phase 1: Internal Alpha Testing

**Participants**: 3 team members + 2 contacts  
**Duration**: 3 días  
**Goal**: Find critical bugs

**Test Scenarios**:
1. Setup store → agregar 10 productos → procesar 5 ventas
2. Low stock simulation (vender hasta bajar stock < 10)
3. Multi-user: Owner agrega productos while Cashier procesa venta

**Success Criteria**:
- No data loss (inventory stays accurate)
- No critical bugs (crashes, payment errors)

---

### Phase 2: Beta Testing (Real Users)

**Participants**: 10 pequeños comercios  
**Duration**: 7 días  
**Goal**: Validate PMF

**Recruitment**:
- Local minimarkets, bodegas
- Incentive: Free for 3 months

**Test Tasks**:
- Migrate inventory from Excel (import CSV)
- Process min 50 sales
- Use dashboard daily

**Metrics**:
- Time to migrate inventory: <2 hours
- Sales processing time: <30 sec/transaction
- Inventory accuracy: >95%

**Feedback**:
- Daily check-in (WhatsApp)
- Weekly survey
- Exit interview

---

## 🚫 Out of Scope (V1.0)

1. **Accounting/Contabilidad**: No balance sheets, P&L
2. **Multi-location**: Solo 1 tienda por owner
3. **E-commerce**: No online store integration
4. **Hardware POS**: Solo web, no dedicated terminal
5. **Advanced Analytics**: Solo dashboard básico

---

## ⚠️ Risks & Assumptions

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Inventory sync issues** | Alto | Real-time DB, optimistic updates, conflict resolution |
| **Slow POS (latency)** | Alto | Optimize queries, cache products, offline-first PWA (V2) |
| **User adoption (low tech)** | Medio | Simple UI, video tutorials, onsite training |
| **Printer compatibility** | Medio | Browser print API, test with common printers |

### Assumptions

1. ✅ Users have internet (validated: 98% urban small shops have WiFi)
2. ⚠️ $50-80/mes acceptable (validate with 10 users)
3. ✅ Web app sufficient (vs native mobile)
4. ⚠️ Manual inventory count viable for migration

---

## 🔗 Cross-References

| Feature | Implementation |
|---------|---------------|
| Authentication | `ENGINEERING.md` § 6.1 |
| Product Management | `ENGINEERING.md` § 6.2 |
| POS | `ENGINEERING.md` § 6.3 |
| Low Stock Alerts | `ENGINEERING.md` § 6.4 |
| Dashboard | `ENGINEERING.md` § 6.5 |

---

**Última actualización**: 2026-01-13  
**Versión**: 1.0  
**Owner**: Product Manager  
**MVP**: #1 - Sistema de Inventario + POS
