/**
 *
 *
  _____                      _              _ _ _     _   _     _        __ _ _
 |  __ \                    | |            | (_) |   | | | |   (_)      / _(_) |
 | |  | | ___    _ __   ___ | |_    ___  __| |_| |_  | |_| |__  _ ___  | |_ _| | ___
 | |  | |/ _ \  | '_ \ / _ \| __|  / _ \/ _` | | __| | __| '_ \| / __| |  _| | |/ _ \
 | |__| | (_) | | | | | (_) | |_  |  __/ (_| | | |_  | |_| | | | \__ \ | | | | |  __/
 |_____/ \___/  |_| |_|\___/ \__|  \___|\__,_|_|\__|  \__|_| |_|_|___/ |_| |_|_|\___|

 * DO NOT EDIT THIS FILE!!
 *
 *  FOR CUSTOMIZE personBaseService PLEASE EDIT ../person.service.ts
 *
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 *
 */
 // DEPENDENCIES
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

// CONFIG
import { environment } from '../../../environments/environment';

// MODEL
import { Person } from '../../domain/pwa-test-app_db/person';

/**
 * THIS SERVICE MAKE HTTP REQUEST TO SERVER, FOR CUSTOMIZE IT EDIT ../Person.service.ts
 */

/*
 * SCHEMA DB Person
 *
	{
		age: {
			type: 'String'
		},
		email: {
			type: 'String'
		},
		name: {
			type: 'String'
		},
		phone: {
			type: 'String'
		},
		//RELATIONS
		//EXTERNAL RELATIONS
	}
 *
 */
@Injectable()
export class PersonBaseService {

    private personCollection: AngularFirestoreCollection<Person>;
    constructor(
        private afs: AngularFirestore,
        private fns: AngularFireFunctions
    ) {
        this.personCollection = afs.collection<Person>('person');
    }


    // CRUD METHODS

    /**
    * PersonService.create
    *   @description CRUD ACTION create
    *
    */
    create(item: Person): Promise<DocumentReference> {
        return this.personCollection.add(item);
    }

    /**
    * PersonService.delete
    *   @description CRUD ACTION delete
    *   @param ObjectId id Id
    *
    */
    remove(id: string) {
        const itemDoc: AngularFirestoreDocument<any> = this.personCollection.doc(id);
        itemDoc.delete();
    }

    /**
    * PersonService.get
    *   @description CRUD ACTION get
    *   @returns Person
    *
    */
    get(id: string): AngularFirestoreDocument<Person> {
        return this.afs.doc<Person>('person/' + id);
    }

    /**
    * PersonService.list
    *   @description CRUD ACTION list
    *   @returns ARRAY OF Person
    *
    */
    list(): Observable<Person[]> {
        return this.afs.collection('person').snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Person;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    /**
    * PersonService.update
    *   @description CRUD ACTION update
    *   @param ObjectId id Id
    *
    */
    update(itemDoc: AngularFirestoreDocument<Person>, item: Person): Promise<void> {
        return itemDoc.update(item);
    }


    // Custom APIs

}
