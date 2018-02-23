import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ViewCell } from 'ng2-smart-table';
import { saveAs } from 'file-saver'

// this is common components for all buttons and their actions
@Component({
    selector: 'jhi-button-download',
    templateUrl: './file-actions.component.html',
})
export class ButtonActionsComponent implements ViewCell, OnInit {
    renderValue: string;
    blob: any;

    @Input() value: string | number;
    @Input() rowData: any;

    //here we define two events: open and download
    @Output() open: EventEmitter<any> = new EventEmitter();
    @Output() download: EventEmitter<any> = new EventEmitter();

    constructor() {

    }

    ngOnInit() {

    }

    openFile(rowData) {
        //this activate event open and forward rowData to the parent 
        this.open.emit(rowData);
    }
    downloadFile(rowData) {
        //this activate event download and forward rowData to the parent 
        this.download.emit(rowData);
    }

}
