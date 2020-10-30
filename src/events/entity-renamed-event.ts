import {Subject} from "./subjects"




export interface EntityRenamedEvent {
    subject: Subject.EntityUpdated;
    data:{
        entityId: string;
        entityURL: string;
        createdAt: string;
        updatedAt: string;
        version: number;
        uploaderId: string;
        path: string;
        newName: String;
    }
}