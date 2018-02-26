import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { File } from './file.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FileService {

    private resourceUrl =  SERVER_API_URL + '/microserviceuploader/api/files';
    private resourceUrlview =  SERVER_API_URL + '/microserviceuploader/api/files/view';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(file: File): Observable<File> {
        const copy = this.convert(file);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(file: File): Observable<File> {
        const copy = this.convert(file);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<File> {
        return this.http.get(`${this.resourceUrlview}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to File.
     */
    private convertItemFromServer(json: any): File {
        const entity: File = Object.assign(new File(), json);
        entity.dateCreated = this.dateUtils
            .convertLocalDateFromServer(json.dateCreated);
        entity.lastModified = this.dateUtils
            .convertLocalDateFromServer(json.lastModified);
        return entity;
    }

    /**
     * Convert a File to a JSON which can be sent to the server.
     */
    private convert(file: File): File {
        const copy: File = Object.assign({}, file);
        copy.dateCreated = this.dateUtils
            .convertLocalDateToServer(file.dateCreated);
        copy.lastModified = this.dateUtils
            .convertLocalDateToServer(file.lastModified);
        return copy;
    }
}
