'use client';

export function DataFlowDiagram() {
    return (
        <div className="bg-card rounded-2xl elevation-1 border border-border p-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">Data Flow & Architecture</h2>

            {/* Mermaid Diagram */}
            <div className="mermaid bg-muted rounded-xl p-6 border border-border mb-6">
                {`graph TB
    subgraph Client["🖥️ Client Layer"]
        UI["React Components"]
        Auth["Auth Provider"]
    end
    
    subgraph Services["⚙️ Service Layer"]
        PS["Products Service"]
        SS["Sales Service"]
        AS["Analytics Service"]
        AuS["Auth Service"]
        CS["Cart Service"]
    end
    
    subgraph MockDB["💾 Mock Database"]
        DB["MockDatabase Class"]
        LS["LocalStorage"]
    end
    
    subgraph Schema["📊 Schema"]
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
    
    style Client fill:#dbeafe
    style Services fill:#dcfce7
    style MockDB fill:#fef3c7
    style Schema fill:#f3e8ff`}
            </div>

            {/* Flow Description */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-sage-50 rounded-xl p-4 border border-sage-200 dark:bg-sage-900/20 dark:border-sage-900/30">
                    <h3 className="font-semibold text-sage-700 dark:text-sage-300 mb-2">1. UI Layer</h3>
                    <p className="text-sm text-sage-700 dark:text-sage-300">
                        React components call service methods for business logic
                    </p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200 dark:bg-green-900/20 dark:border-green-900/30">
                    <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">2. Services</h3>
                    <p className="text-sm text-green-800 dark:text-green-300">
                        Abstracted business logic, validations, and mock DB interaction
                    </p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900/30">
                    <h3 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">3. Persistence</h3>
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                        Mock DB saves to LocalStorage with 600ms simulated latency
                    </p>
                </div>
            </div>
        </div>
    );
}
