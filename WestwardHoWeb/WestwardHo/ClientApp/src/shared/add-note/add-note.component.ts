import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { log } from 'util';
import { DataService } from '../../services/data.service';
import { SystemService } from '../../services/system.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  formObject: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  userID: string = "";
  noteError: boolean = false;
  noteSuccess: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private dataService: DataService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.userID = localStorage.getItem("userID");

    this.formObject = this.formBuilder.group({
      iD: ['', Validators.nullValidator],
      title: ['', Validators.required],
      note: ['', Validators.required],
    });    
  }

  get formControls() {
    return this.formObject.controls;
  }

  addNote() {
    this.isLoading = true;
    this.submitted = true;

    if (this.formObject.invalid) {
      this.isLoading = false;
      return;
    }

    this.systemService.addNote(this.formControls.title.value, this.formControls.note.value, this.userID).then(response => {
      if (response == null) {
        this.isLoading = false;
        this.noteError = true;
      }
      else {
        this.isLoading = false;
        this.noteSuccess = true;
        this.formControls.title.setValue('');
        this.formControls.note.setValue('');
        this.submitted = false;
      }
    });
  }

  cancel() {
    this.submitted = false;
    this.noteError = false;
    this.formControls.title.setValue('');
    this.formControls.note.setValue('');
  }

  clearErrors() {
    this.submitted = false;
    this.noteError = false;
    this.noteSuccess = false;
  }
}
