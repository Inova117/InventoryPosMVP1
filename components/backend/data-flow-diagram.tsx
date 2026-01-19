'use client';

export function DataFlowDiagram() {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Data Flow & Architecture</h2>

            {/* Mermaid Diagram */}
            <div className="mermaid bg-slate-50 rounded-lg p-6 border border-slate-200 mb-6">
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
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">1. UI Layer</h3>
                    <p className="text-sm text-blue-800">
                        React components call service methods for business logic
                    </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h3 className="font-semibold text-green-900 mb-2">2. Services</h3>
                    <p className="text-sm text-green-800">
                        Abstracted business logic, validations, and mock DB interaction
                    </p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h3 className="font-semibold text-yellow-900 mb-2">3. Persistence</h3>
                    <p className="text-sm text-yellow-800">
                        Mock DB saves to LocalStorage with 600ms simulated latency
                    </p>
                </div>
            </div>
        </div>
    );
}
