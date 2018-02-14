/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { FileDetailComponent } from '../../../../../../main/webapp/app/entities/file/file-detail.component';
import { FileService } from '../../../../../../main/webapp/app/entities/file/file.service';
import { File } from '../../../../../../main/webapp/app/entities/file/file.model';

describe('Component Tests', () => {

    describe('File Management Detail Component', () => {
        let comp: FileDetailComponent;
        let fixture: ComponentFixture<FileDetailComponent>;
        let service: FileService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FileDetailComponent],
                providers: [
                    FileService
                ]
            })
            .overrideTemplate(FileDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FileDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FileService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new File(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.file).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
