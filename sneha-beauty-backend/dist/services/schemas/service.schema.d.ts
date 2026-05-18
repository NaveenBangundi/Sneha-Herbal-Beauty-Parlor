import { Document } from 'mongoose';
export type ServiceDocument = Service & Document;
export declare class Service {
    name: string;
    description: string;
    price: number;
    durationInMinutes: number;
    imageUrl: string;
}
export declare const ServiceSchema: import("mongoose").Schema<Service, import("mongoose").Model<Service, any, any, any, any, any, Service>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Service, Document<unknown, {}, Service, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Service & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Service, Document<unknown, {}, Service, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Service & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Service, Document<unknown, {}, Service, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Service & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    price?: import("mongoose").SchemaDefinitionProperty<number, Service, Document<unknown, {}, Service, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Service & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    durationInMinutes?: import("mongoose").SchemaDefinitionProperty<number, Service, Document<unknown, {}, Service, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Service & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    imageUrl?: import("mongoose").SchemaDefinitionProperty<string, Service, Document<unknown, {}, Service, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Service & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Service>;
