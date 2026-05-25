import { Observable } from "rxjs";
import { Person } from "../classes/person";

export interface IPeopleRepositoryInterface {
    Post(name: string, surname: string, dateOfBirth: Date): Observable<boolean>;
    Get(): Observable<Person[]>;
    GetByID(id: number): Observable<Person>;
}