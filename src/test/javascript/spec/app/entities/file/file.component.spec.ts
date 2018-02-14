/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { GatewayTestModule } from '../../../test.module';
import { FileComponent } from '../../../../../../main/webapp/app/entities/file/file.component';
import { FileService } from '../../../../../../main/webapp/app/entities/file/file.service';
import { File } from '../../../../../../main/webapp/app/entities/file/file.model';

describe('Component Tests', () => {

    describe('File Management Component', () => {
        let comp: FileComponent;
        let fixture: ComponentFixture<FileComponent>;
        let service: FileService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FileComponent],
                providers: [
                    FileService
                ]
            })
            .overrideTemplate(FileComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FileComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FileService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new File(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.files[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
