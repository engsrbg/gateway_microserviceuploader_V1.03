import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ViewCell } from 'ng2-smart-table';
import { saveAs } from 'file-saver'

// component for download button bellow
@Component({
    selector: 'jhi-button-download',
    template: `
    <div class="btn-group">
    <button
    (click)="downloadFile(rowData)"
    class="btn btn-success btn-sm">
    <span class="fa fa-download"></span>
    <span jhiTranslate="entity.action.download">Download</span>
    </button>
    <button type="submit"
    [routerLink]="['/', { outlets: { popup: 'file/'+ rowData.id + '/delete'} }]" replaceUrl="true" queryParamsHandling="merge"
    class="btn btn-danger btn-sm">
    <span class="fa fa-remove"></span>
    <span class="d-none d-md-inline">Delete</span>
    </button>
    <button
    [disabled]="(rowData.format!='PDF')"
    (click)="openFile(rowData)"
    class="btn btn-warning btn-sm">
    <span class="fa fa-eye"></span>
    <span jhiTranslate="entity.action.open">Open</span>
    </button>
    <button type="submit" [routerLink]="['/', { outlets: { popup: 'file/'+ rowData.id + '/edit'} }]" replaceUrl="true" queryParamsHandling="merge"
    class="btn btn-primary btn-sm">
    <span class="fa fa-pencil"></span>
    <span class="d-none d-md-inline" jhiTranslate="entity.action.edit">Edit</span>
    </button>
    <button type="submit" [routerLink]="['../file', rowData.id ]" class="btn btn-info btn-sm">
    <span class="fa fa-info-circle"></span>
    <span class="d-none d-md-inline" jhiTranslate="entity.action.details">Details</span>
    </button>
    </div>
 `,
})
export class ButtonActionsComponent implements ViewCell, OnInit {
    renderValue: string;
    blob: any;

    @Input() value: string | number;
    @Input() rowData: any;

    @Output() open: EventEmitter<any> = new EventEmitter();
    @Output() download: EventEmitter<any> = new EventEmitter();

    constructor(private dataUtils: JhiDataUtils) {

    }

    ngOnInit() {

    }

    openFile(rowData) {
        this.open.emit(rowData);
    }
    downloadFile(rowData) {
        this.download.emit(rowData);
    }

}
