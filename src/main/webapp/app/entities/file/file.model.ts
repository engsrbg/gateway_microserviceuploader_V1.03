import { BaseEntity } from './../../shared';

export const enum FormatType {
    'PDF',
    'DOCX',
    'XLSX'
}

export class File implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public description?: string,
        public contentContentType?: string,
        public content?: any,
        public fileSize?: number,
        public format?: FormatType,
        public dateCreated?: any,
        public lastModified?: any,
        public login?: string,
    ) {
    }
}
