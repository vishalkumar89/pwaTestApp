// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { PersonService } from '../../services/person.service';

// Import Models
import { Person } from '../../domain/pwa-test-app_db/person';

// START - USED SERVICES
/**
* PersonService.create
*	@description CRUD ACTION create
*
* PersonService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* PersonService.get
*	@description CRUD ACTION get
*	@returns Person
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  Person
 */
@Component({
    selector: 'app-person-edit',
    templateUrl: 'person-edit.component.html',
    styleUrls: ['person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Person>;
    isNew: Boolean = true;
    formValid: Boolean;

    


    constructor(
        private personService: PersonService,
        private route: ActivatedRoute,
        private location: Location) {
        // Init list
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.isNew = false;
                this.itemDoc = this.personService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

            }
            // Get relations
        });
    }



    /**
     * Save Person
     *
     * @param {boolean} formValid Form validity check
     * @param Person item Person to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.personService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.personService.update(this.itemDoc, this.item);
            }
            this.goBack();
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }

}
