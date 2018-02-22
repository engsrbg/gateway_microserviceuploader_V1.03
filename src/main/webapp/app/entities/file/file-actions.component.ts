import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ViewCell } from 'ng2-smart-table';
// component for delete button bellow
@Component({
    selector: 'button-delete',
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
// component for delete button above this coment

// component for open button bellow
@Component({
    selector: 'button-open',
    template: `
   
    <button 
    [disabled]="(rowData.format!='PDF')"
    (click)="openFile(rowData.contentContentType, rowData.content)"
    class="btn btn-success btn-sm">
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
// component for open button above this coment

// component for edit button bellow
@Component({
    selector: 'button-edit',
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
// component for edit button above this coment

// component for details button bellow
@Component({
    selector: 'button-details',
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
// component for details button above this coment


