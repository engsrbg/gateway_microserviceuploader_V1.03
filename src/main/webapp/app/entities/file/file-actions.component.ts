import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ViewCell } from 'ng2-smart-table';
import { saveAs } from 'file-saver'

// component for download button bellow
@Component({
    selector: 'jhi-button-download',
    template: `<button
    (click)="downloadFile(rowData.contentContentType, rowData.content, rowData.name)"
    class="btn btn-success btn-sm">
    <span class="fa fa-download"></span>
    <span jhiTranslate="entity.action.download">Download</span>
    </button>
 `,
})
export class ButtonDownloadComponent implements ViewCell, OnInit {
    renderValue: string;
    blob: any;

    @Input() value: string | number;
    @Input() rowData: any;

    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor(private dataUtils: JhiDataUtils) {

    }

    ngOnInit() {

    }

    onClick() {
        this.save.emit(this.rowData);
    }

    downloadFile(contentType, content, fileName) {
        // decode base64 string, remove whitespaces to create clean and blob format
        const binary = atob(content.replace(/\s/g, ''));
        const len = binary.length;
        const buffer = new ArrayBuffer(len);
        // The Uint8Array typed array represents an array of 8-bit unsigned integers
        const view = new Uint8Array(buffer);
        for (let i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        // create the blob object with specific content-type
        this.blob = new Blob([view], { type: contentType });
        // we need to give clean blob file to function 'saveAs()' and file name to file which is going to be downloaded
        saveAs(this.blob, fileName);
    }
}
// component for download button above this comment

// component for delete button bellow
@Component({
    selector: 'jhi-button-delete',
    template: `
<button type="submit"
[routerLink]="['/', { outlets: { popup: 'file/'+ rowData.id + '/delete'} }]" replaceUrl="true" queryParamsHandling="merge"
class="btn btn-danger btn-sm">
<span class="fa fa-remove"></span>
<span class="d-none d-md-inline">Delete</span>
</button>
 `,
})
export class ButtonDeleteComponent implements ViewCell, OnInit {
    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    @Output() save: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
    }

    onClick() {
        this.save.emit(this.rowData);
    }
}
// component for delete button above this comment

// component for open button bellow
@Component({
    selector: 'jhi-button-open',
    template: `
    <button
    [disabled]="(rowData.format!='PDF')"
    (click)="openFile(rowData.contentContentType, rowData.content)"
    class="btn btn-warning btn-sm">
    <span class="fa fa-eye"></span>
    <span jhiTranslate="entity.action.open">Open</span>
</button>
 `,
})
export class ButtonOpenComponent implements ViewCell, OnInit {
    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor(private dataUtils: JhiDataUtils) {

    }

    ngOnInit() {

    }

    onClick() {
        this.save.emit(this.rowData);
    }
    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
}
// component for open button above this comment

// component for edit button bellow
@Component({
    selector: 'jhi-button-edit',
    template: `

    <button type="submit" [routerLink]="['/', { outlets: { popup: 'file/'+ rowData.id + '/edit'} }]" replaceUrl="true" queryParamsHandling="merge"
    class="btn btn-primary btn-sm">
    <span class="fa fa-pencil"></span>
    <span class="d-none d-md-inline" jhiTranslate="entity.action.edit">Edit</span>
</button>
 `,
})
export class ButtonEditComponent implements ViewCell, OnInit {
    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor(private dataUtils: JhiDataUtils) {
    }

    ngOnInit() {
    }

    onClick() {
        this.save.emit(this.rowData);
    }
    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
}
// component for edit button above this comment

// component for details button bellow
@Component({
    selector: 'jhi-button-details',
    template: `
    <button type="submit" [routerLink]="['../file', rowData.id ]" class="btn btn-info btn-sm">
    <span class="fa fa-info-circle"></span>
    <span class="d-none d-md-inline" jhiTranslate="entity.action.details">Details</span>
</button>
 `,
})
export class ButtonDetailsComponent implements ViewCell, OnInit {
    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor(private dataUtils: JhiDataUtils) {
    }

    ngOnInit() {
    }

    onClick() {
        this.save.emit(this.rowData);
    }
    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
}
// component for details button above this comment
