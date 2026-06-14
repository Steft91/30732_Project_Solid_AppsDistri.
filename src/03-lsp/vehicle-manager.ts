/**
 * APLICACIÓN DEL PRINCIPIO DE SUSTITUCIÓN DE LISKOV (LSP)
 * 
 * Ahora todos los vehículos comparten una misma abstracción: Vehicle.
 * VehicleManager ya no necesita preguntar si el vehículo es Tesla, Audi,
 * Toyota, Honda o Ford.
 * 
 * Cada vehículo sabe cómo devolver sus propios detalles mediante getDetails().
 */

export interface Vehicle {
    getDetails(): string;
}

export class Tesla implements Vehicle {

    constructor(public model: string) {}

    getDetails(): string {
        return `Tesla Model: ${this.model} Carga eléctrica al 100%`;
    }

}

export class Audi implements Vehicle {

    constructor(public model: string) {}

    getDetails(): string {
        return `Audi Model: ${this.model} Tracción Quattro activada`;
    }

}

export class Toyota implements Vehicle {

    constructor(public model: string) {}

    getDetails(): string {
        return `Toyota Model: ${this.model} Motor híbrido listo`;
    }

}

export class Honda implements Vehicle {

    constructor(public model: string) {}

    getDetails(): string {
        return `Honda Model: ${this.model} VTEC activado`;
    }

}

export class Ford implements Vehicle {

    constructor(public model: string) {}

    getDetails(): string {
        return `Ford Model: ${this.model} Built Tough`;
    }

}

export class VehicleManager {

    static printVehicleDetails(vehicles: Vehicle[]): void {
        vehicles.forEach(vehicle => {
            console.log(vehicle.getDetails());
        });
    }

}