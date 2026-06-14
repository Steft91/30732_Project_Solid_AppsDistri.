/**
 * APLICACIÓN DEL PRINCIPIO DE SEGREGACIÓN DE INTERFAZ (ISP)
 *
 * Se reemplaza la interfaz general Bird por interfaces pequeñas
 * y específicas según las capacidades de cada ave.
 *
 * Ahora ninguna clase está obligada a implementar métodos
 * que no corresponden a su comportamiento real.
 */

export interface Eatable {
    eat(): void;
}

export interface Flyable {
    fly(): void;
}

export interface Swimmable {
    swim(): void;
}

export class Toucan implements Eatable, Flyable {

    public eat(): void {
        console.log('El Tucán está comiendo frutas.');
    }

    public fly(): void {
        console.log('El Tucán vuela sobre la selva.');
    }

}

export class Hummingbird implements Eatable, Flyable {

    public eat(): void {
        console.log('El Colibrí busca néctar.');
    }

    public fly(): void {
        console.log('El Colibrí aletea rápidamente.');
    }

}

export class Ostrich implements Eatable, Swimmable {

    public eat(): void {
        console.log('El Avestruz come hierbas.');
    }

    public swim(): void {
        console.log('El Avestruz puede nadar si es necesario.');
    }

}