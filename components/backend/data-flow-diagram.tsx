'use client';

export function DataFlowDiagram() {
    return (
        <div className="rounded-2xl border border-border bg-card p-8 elevation-1">
            <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">Flujo de datos y arquitectura</h2>

            {/* Mermaid Diagram */}
            <div className="mermaid mb-6 rounded-xl border border-border bg-muted p-6">
                {`graph TB
    subgraph Client["🖥️ Capa de cliente"]
        UI["Componentes React"]
        Auth["Auth Provider"]
    end

    subgraph Services["⚙️ Capa de servicios"]
        PS["Products Service"]
        SS["Sales Service"]
        AS["Analytics Service"]
        AuS["Auth Service"]
        CS["Cart Service"]
    end

    subgraph MockDB["💾 Base simulada"]
        DB["MockDatabase"]
        LS["LocalStorage"]
    end

    subgraph Schema["📊 Esquema"]
        Stores["stores"]
        Profiles["profiles"]
        Products["products"]
        Sales["sales"]
        Items["sale_items"]
    end

    UI --> Auth
    UI --> PS
    UI --> SS
    UI --> AS
    UI --> CS

    Auth --> AuS
    AuS --> DB
    PS --> DB
    SS --> DB
    AS --> DB

    DB --> LS
    DB --> Stores
    DB --> Profiles
    DB --> Products
    DB --> Sales
    DB --> Items

    Sales -.-> Items
    Products -.-> Items

    style Client fill:#e8ebe5,stroke:#b2bbaa
    style Services fill:#e8f0e8,stroke:#9fc8a6
    style MockDB fill:#f7ecdd,stroke:#e0b27e
    style Schema fill:#f5f1ec,stroke:#d4ccbf`}
            </div>

            {/* Flow Description */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-sage-200 bg-sage-50 p-4 dark:border-sage-900/30 dark:bg-sage-900/20">
                    <h3 className="mb-2 font-semibold text-sage-700 dark:text-sage-300">1. Interfaz</h3>
                    <p className="text-sm text-sage-700 dark:text-sage-300">
                        Los componentes React llaman a los servicios para la lógica de negocio.
                    </p>
                </div>
                <div className="rounded-xl border border-success/25 bg-success-soft p-4">
                    <h3 className="mb-2 font-semibold text-success-soft-foreground">2. Servicios</h3>
                    <p className="text-sm text-success-soft-foreground">
                        Lógica abstraída, validaciones e interacción con la base simulada.
                    </p>
                </div>
                <div className="rounded-xl border border-warning/25 bg-warning-soft p-4">
                    <h3 className="mb-2 font-semibold text-warning-soft-foreground">3. Persistencia</h3>
                    <p className="text-sm text-warning-soft-foreground">
                        La base simulada guarda en LocalStorage con latencia simulada.
                    </p>
                </div>
            </div>
        </div>
    );
}
